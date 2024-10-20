import metaMaskLogo from "../logos/metamask.svg";
import coinbaseLogo from "../logos/coinbase.svg";
import walletConnectLogo from "../logos/walletconnect.svg";

const rawListOfWalletsArray = [
  {
    htmlId: "lcm-metaMask",
    id: "metamask",
    logo: metaMaskLogo,
    name: "MetaMask",
    provider: globalThis.ethereum,
    synopsis: "Connect your MetaMask Wallet",
    checkIfPresent: () => {
      if (typeof globalThis.ethereum !== "undefined") {
        return true;
      } else {
        return false;
      }
    },
  },
  {
    htmlId: "lcm-coinbase",
    id: "coinbase",
    logo: coinbaseLogo,
    name: "Coinbase",
    provider: globalThis.ethereum?.providers?.find(p => p.isCoinbaseWallet),
    synopsis: "Connect your Coinbase Wallet",
    checkIfPresent: () => {
      if (!!globalThis.ethereum?.providers?.find(p => p.isCoinbaseWallet)) {
        return true;
      } else {
        return false;
      }
    },
  },
  {
    htmlId: "lcm-walletConnect",
    id: "walletconnect",
    logo: walletConnectLogo,
    name: "Wallet Connect",
    provider: null,
    synopsis: "Scan with WalletConnect to connect",
  },
];

export default rawListOfWalletsArray;
