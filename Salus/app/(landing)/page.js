import Link from "next/link";
import {
  CurrencyDollarIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  LockClosedIcon,
} from "@heroicons/react/16/solid";

export default function LandingPage() {
  return (
    <div className="font-poppins h-full flex flex-col">
      <div className="bg-gradient-to-tl from-red-600/95 via-red-500/50 via-45% to-transparent">
        <div className="flex justify-between p-5 mx-8 mt-5">
          <div className="text-red-600 flex-shrink-0">
            <img
              className="w-full max-w-24 sm:max-w-28 md:max-w-32 lg:max-w-36 h-auto"
              src="/name.png"
              alt="DeFi Insurance Logo"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 text-red-600 sm:text-lg text-sm">
            <Link
              href="/login"
              className="font-normal bg-red-600/70 text-off-white px-6 py-2 rounded-2xl hover:bg-red-600/90 transition duration-300 h-fit sm:order-1"
            >
              Learn More
            </Link>
            <div className="flex flex-row space-x-4 sm:space-x-10 font-semibold sm:order-2 sm:ml-10">
              <Link href="/login" className="group transition-all duration-1000">
                Join
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-1 rounded-xl bg-red-600"></span>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-start pt-20">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="md:text-6xl text-3xl font-bold text-red-600">
              <div className="flex flex-row">
                <div className="md:text-6xl text-3xl font-bold text-off-white">
                  <span>Secure Your Health, Earn Rewards</span>
                </div>
              </div>
            </div>
            <div className="flex space-x-2 md:text-2xl text-md font-semibold text-off-white/70">
              <div>DeFi Insurance Protocol with Health Data Incentives</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center mt-24 mb-16"> {/* Adjusted mb-44 to mb-16 */}
          <Link
            href="/login"
            className="bg-red-600/70 text-off-white px-6 py-2 rounded-2xl hover:bg-red-600/90 transition duration-300"
          >
            Join Us
          </Link>
          <small className="text-off-white mt-2"> {/* Adjusted mt-4 to mt-2 */}
            *Get early access to our DeFi insurance platform
          </small>
        </div>
      </div>
      <div className="flex flex-col w-full pb-16 pt-14 bg-off-white">
        <div className="flex text-red-600 font-medium sm:text-3xl text-2xl justify-center mb-2">
          How It Works
        </div>
        <div className="flex text-gray-500 font-normal sm:text-lg text-md justify-center mb-4 text-center"> {/* Adjusted mb-2 to mb-4 */}
          Secure, Share, and Save
        </div>
        <div className="flex justify-center">
          <div className="h-1 w-6 md:w-9 rounded-xl bg-red-600 mt-6 mb-6"></div>
        </div>
        <div className="flex flex-row flex-wrap justify-around w-full mt-14">
          <div className="flex flex-col items-center m-4">
            <div className="text-center font-medium text-red-600 mb-2">
              Join
            </div>
            <div className="flex flex-col w-52 p-5 rounded-xl bg-white h-44 justify-center items-center">
              <LockClosedIcon className="w-16 h-16 text-red-600" />
            </div>
            <div className="text-center font-light text-red-600 mt-2 w-52 text-sm">
              Securely link your crypto wallet to our platform
            </div>
          </div>
          <div className="flex flex-col items-center m-4">
            <div className="text-center font-medium text-red-600 mb-2">
              Share Health Data
            </div>
            <div className="flex flex-col w-52 p-5 rounded-xl bg-white h-44 justify-center items-center">
              <ChartBarIcon className="w-16 h-16 text-red-600" />
            </div>
            <div className="text-center font-light text-red-600 mt-2 w-52 text-sm">
              Opt-in to share anonymized health metrics
            </div>
          </div>
          <div className="flex flex-col items-center m-4">
            <div className="text-center font-medium text-red-600 mb-2">
              Get Insured
            </div>
            <div className="flex flex-col w-52 p-5 rounded-xl bg-white h-44 justify-center items-center">
              <ShieldCheckIcon className="w-16 h-16 text-red-600" />
            </div>
            <div className="text-center font-light text-red-600 mt-2 w-52 text-sm">
              Receive tailored insurance coverage
            </div>
          </div>
          <div className="flex flex-col items-center m-4">
            <div className="text-center font-medium text-red-600 mb-2">
              Earn Rewards
            </div>
            <div className="flex flex-col w-52 p-5 rounded-xl bg-white h-44 justify-center items-center">
              <CurrencyDollarIcon className="w-16 h-16 text-red-600" />
            </div>
            <div className="text-center font-light text-red-600 mt-2 w-52 text-sm">
              Get token rewards for maintaining good health
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 text-xs sm:text-sm px-5 py-5 text-off-white bg-red-600/85 h-24">
        <div className="flex flex-col items-start justify-center">
          <div className="pb-1">@2024 DeFi Health Insurance</div>
          <div>All Rights Reserved.</div>
        </div>
        <div className="flex flex-col items-end justify-right">
          <div className="pb-1">Contact us at</div>
          <div>info@defihealth.com</div>
        </div>
      </div>
    </div>
  );
}
