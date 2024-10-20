"use client";
import Link from "next/link";
import { HomeIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PrivyProvider, usePrivy } from '@privy-io/react-auth';

function WalletConnectPage() {
  const [error, setError] = useState("");
  const [userType, setUserType] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();
  const { login, logout, authenticated, ready, user } = usePrivy();

  useEffect(() => {
    if (authenticated && userType && user && isLoggingIn) {
      handleRedirect();
    }
  }, [authenticated, userType, user, isLoggingIn]);

  const handleWalletConnect = async (type) => {
    setError("");
    setUserType(type);
    setIsLoggingIn(true);
    try {
      await logout();
      await login();
    } catch (error) {
      setError("Failed to initiate login process. Please try again.");
      setIsLoggingIn(false);
    }
  };

  const handleRedirect = () => {
    if (user && user.wallet) {
      const walletAddress = user.wallet.address;
      sessionStorage.setItem("userType", userType);
      sessionStorage.setItem("walletAddress", walletAddress);
      
      if (userType === "User") {
        sessionStorage.setItem("userAddress", walletAddress);
        router.push("/info");
      } else {
        sessionStorage.setItem("companyAddress", walletAddress);
        router.push("/home");
      }
    } else {
      setError("Failed to retrieve wallet address. Please try connecting again.");
    }
    setIsLoggingIn(false);
  };

  if (!ready) {
    return <div>Loading...</div>;
  }

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
              disabled={isLoggingIn}
              className="flex w-full justify-center rounded-md bg-red-700 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:ring-red-600 disabled:opacity-50"
            >
              {isLoggingIn ? "Connecting..." : "Connect as User"}
            </button>
            <button
              onClick={() => handleWalletConnect("Company")}
              disabled={isLoggingIn}
              className="flex w-full justify-center rounded-md bg-red-700 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:ring-red-600 disabled:opacity-50"
            >
              {isLoggingIn ? "Connecting..." : "Connect as Company"}
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

export default function PrivyWrapper() {
  return (
    <PrivyProvider
      appId="cm2h6nthq00nt1n0qs20hduz3"
      config={{
        appearance: {
          theme: 'light',
          accentColor: '#DC2626', // Matching the red theme
          logo: 'https://your-logo-url', // Replace with your actual logo URL
        },
        embeddedWallets: {
          createOnLogin: 'users-without-wallets',
        },
      }}
    >
      <WalletConnectPage />
    </PrivyProvider>
  );
}