"use client";
import Link from "next/link";
import { HomeIcon } from "@heroicons/react/16/solid";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WalletConnectPage() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleWalletConnect = async () => {
    try {
      // Placeholder for wallet connection logic (e.g., using MetaMask)
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        let userType = "User";
        sessionStorage.setItem("userType", userType);
        setError("");
        if (userType === "User") {
          router.push("/info");
        } else {
          router.push("/home");
        }
      } else {
        setError("MetaMask is not installed.");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <button className="absolute ml-5 mt-5">
        <Link href="/">
          <HomeIcon className="md:size-12 size-10 fill-red-600"></HomeIcon>
        </Link>
      </button>
      <div className="font-poppins flex h-screen flex-col px-6 justify-center lg:px-8 bg-gradient-to-bl from-red-600 via-red-400 via-70% to-transparent">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Connect your wallet
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-3">
            <button
              onClick={handleWalletConnect}
              className="flex w-full justify-center rounded-md bg-red-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:ring-red-600"
            >
              Connect Wallet
            </button>
            {error && (
              <p className="text-red-200 font-medium text-sm text-center">
                {error}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}