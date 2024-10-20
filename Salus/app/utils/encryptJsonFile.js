
import { LitNodeClient, encryptString } from '@lit-protocol/lit-node-client';
import { LitNetwork, LIT_RPC } from '@lit-protocol/constants';
import {
  createSiweMessage,
  LitAbility,
  LitAccessControlConditionResource,
  LitActionResource,
  generateAuthSig,
} from '@lit-protocol/auth-helpers';
import { LitContracts } from '@lit-protocol/contracts-sdk';
import * as ethers from 'ethers';
import { litActionCode } from './litActionCode';

const LIT_NETWORK = LitNetwork.DatilTest;
const ETHEREUM_PRIVATE_KEY = process.env.ETHEREUM_PRIVATE_KEY;
const LIT_CAPACITY_CREDIT_TOKEN_ID = process.env.LIT_CAPACITY_CREDIT_TOKEN_ID;

export const encryptJsonFile = async (jsonData) => {
  let litNodeClient;

  try {
    const ethersWallet = new ethers.Wallet(
      ETHEREUM_PRIVATE_KEY,
      new ethers.providers.JsonRpcProvider(LIT_RPC.CHRONICLE_YELLOWSTONE)
    );

    console.log('🔄 Connecting to the Lit network...');
    litNodeClient = new LitNodeClient({
      litNetwork: LIT_NETWORK,
      debug: false,
    });
    await litNodeClient.connect();
    console.log('✅ Connected to the Lit network');

    console.log('🔄 Connecting LitContracts client to network...');
    const litContracts = new LitContracts({
      signer: ethersWallet,
      network: LIT_NETWORK,
      debug: false,
    });
    await litContracts.connect();
    console.log('✅ Connected LitContracts client to network');

    let capacityTokenId = LIT_CAPACITY_CREDIT_TOKEN_ID;
    if (!capacityTokenId) {
      console.log('🔄 No Capacity Credit provided, minting a new one...');
      capacityTokenId = (
        await litContracts.mintCapacityCreditsNFT({
          requestsPerKilosecond: 10,
          daysUntilUTCMidnightExpiration: 1,
        })
      ).capacityTokenIdStr;
      console.log(`✅ Minted new Capacity Credit with ID: ${capacityTokenId}`);
    } else {
      console.log(`ℹ️  Using provided Capacity Credit with ID: ${capacityTokenId}`);
    }

    console.log('🔄 Creating capacityDelegationAuthSig...');
    const { capacityDelegationAuthSig } = await litNodeClient.createCapacityDelegationAuthSig({
      dAppOwnerWallet: ethersWallet,
      capacityTokenId,
      delegateeAddresses: [ethersWallet.address],
      uses: '1',
    });
    console.log('✅ Capacity Delegation Auth Sig created');

    const accessControlConditions = [
      {
        contractAddress: '',
        standardContractType: '',
        chain: 'ethereum',
        method: 'eth_getBalance',
        parameters: [':userAddress', 'latest'],
        returnValueTest: {
          comparator: '>=',
          value: '0',
        },
      },
    ];

    console.log('🔐 Encrypting the JSON file...');
    const { ciphertext, dataToEncryptHash } = await encryptString(
      {
        accessControlConditions,
        dataToEncrypt: JSON.stringify(jsonData),
      },
      litNodeClient
    );
    console.log('✅ Encrypted the JSON file');

    console.log('🔄 Generating the Resource String...');
    const accsResourceString = await LitAccessControlConditionResource.generateResourceString(
      accessControlConditions,
      dataToEncryptHash
    );
    console.log('✅ Generated the Resource String');

    console.log('🔄 Getting the Session Signatures...');
    const sessionSigs = await litNodeClient.getSessionSigs({
      chain: 'ethereum',
      capabilityAuthSigs: [capacityDelegationAuthSig],
      expiration: new Date(Date.now() + 1000 * 60 * 10).toISOString(), // 10 minutes
      resourceAbilityRequests: [
        {
          resource: new LitAccessControlConditionResource(accsResourceString),
          ability: LitAbility.AccessControlConditionDecryption,
        },
        {
          resource: new LitActionResource('*'),
          ability: LitAbility.LitActionExecution,
        },
      ],
      authNeededCallback: async ({ uri, expiration, resourceAbilityRequests }) => {
        const toSign = await createSiweMessage({
          uri,
          expiration,
          resources: resourceAbilityRequests,
          walletAddress: ethersWallet.address,
          nonce: await litNodeClient.getLatestBlockhash(),
          litNodeClient,
        });

        return await generateAuthSig({
          signer: ethersWallet,
          toSign,
        });
      },
    });
    console.log('✅ Generated the Session Signatures');

    console.log('🔄 Executing the Lit Action...');
    const litActionSignatures = await litNodeClient.executeJs({
      sessionSigs,
      code: litActionCode,
      jsParams: {
        accessControlConditions,
        ciphertext,
        dataToEncryptHash,
      },
    });
    console.log('✅ Executed the Lit Action');

    return {
      ciphertext,
      dataToEncryptHash,
      litActionSignatures,
    };
  } catch (error) {
    console.error('Error in encryptJsonFile:', error);
    throw error;
  } finally {
    if (litNodeClient) {
      litNodeClient.disconnect();
    }
  }
};