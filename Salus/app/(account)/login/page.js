"use client";
import Link from "next/link";
import { HomeIcon } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function WalletConnectPage() {
  const [error, setError] = useState("");
  const router = useRouter();

  const handleWalletConnect = async (userType) => {
    try {
      // Placeholder for wallet connection logic (e.g., using MetaMask)
      if (window.ethereum) {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
      
        
        sessionStorage.setItem("userType", userType);
        setError("");
        if (userType === "User") {
          router.push("/info");
          // Store the user's address in sessionStorage
          if (accounts.length > 0) {
            sessionStorage.setItem("userAddress", accounts[0]);
          }
        } else {
          router.push("/home");
          if (accounts.length > 0) {
            sessionStorage.setItem("companyAddress", accounts[0]);
          }
        }
      } else {
        setError("MetaMask is not installed.");
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-bl from-red-600 via-red-400 via-70% to-transparent">
      <button className="absolute left-5 top-5">
        <Link href="/">
          <HomeIcon className="h-10 w-10 md:h-12 md:w-12 text-red-600" />
        </Link>
      </button>
      <div className="flex flex-col items-center justify-center h-full px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Connect your wallet
          </h2>
        </div>
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-4">
            <button
              onClick={() => handleWalletConnect("User")}
              className="flex w-full justify-center rounded-md bg-red-700 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:ring-red-600"
            >
              Connect as User
            </button>
            <button
              onClick={() => handleWalletConnect("Company")}
              className="flex w-full justify-center rounded-md bg-red-700 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:ring-red-600"
            >
              Connect as Company
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