import Link from "next/link";
import {
  CurrencyDollarIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  LockClosedIcon,
} from "@heroicons/react/16/solid";
import { FaInstagram, FaQuoteLeft } from "react-icons/fa";

export default function LandingPage() {
  return (
    <div className="font-poppins h-full flex flex-col">
      <div className="bg-gradient-to-tl from-logo-purple/95 via-mid-purple/50 via-45% to-transparent">
        <div className="flex justify-between p-5 mx-8 mt-5">
          <div className="text-logo-purple flex-shrink-0">
            <img
              className="w-full max-w-24 sm:max-w-28 md:max-w-32 lg:max-w-36 h-auto"
              src="/name.png"
              alt="DeFi Insurance Logo"
            />
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0 text-logo-purple sm:text-lg text-sm">
            <Link
              href="#"
              className="font-normal bg-logo-purple/70 text-off-white px-6 py-2 rounded-2xl hover:bg-logo-purple/90 transition duration-300 h-fit sm:order-1"
            >
              Learn More
            </Link>
            <div className="flex flex-row space-x-4 sm:space-x-10 font-semibold sm:order-2 sm:ml-10">
              <Link
                href="#"
                className="group transition-all duration-1000"
              >
                Connect Wallet
                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-1 rounded-xl bg-logo-purple"></span>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-start pt-20">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="md:text-6xl text-3xl font-bold text-logo-purple">
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
        <div className="flex flex-col items-center mt-24 mb-44">
          <Link
            href="#"
            className="bg-logo-purple/70 text-off-white px-6 py-2 rounded-2xl hover:bg-logo-purple/90 transition duration-300"
          >
            Join Waitlist
          </Link>
          <small className="text-off-white mt-4">
            *Get early access to our DeFi insurance platform
          </small>
        </div>
      </div>
      <div className="flex flex-col w-full pb-16 pt-14 bg-off-white">
        <div className="flex text-logo-purple font-medium sm:text-3xl text-2xl justify-center mb-2">
          How It Works
        </div>
        <div className="flex text-gray-500 font-normal sm:text-lg text-md justify-center mb-2 text-center">
          Secure, Share, and Save
        </div>
        <div className="flex justify-center">
          <div className="h-1 w-6 md:w-9 rounded-xl bg-logo-purple mt-6 mb-6"></div>
        </div>
        <div className="flex flex-row flex-wrap justify-around w-full mt-14">
          <div className="flex flex-col items-center m-4">
            <div className="text-center font-medium text-logo-purple mb-2">
              Connect Wallet
            </div>
            <div className="flex flex-col w-52 p-5 rounded-xl bg-white h-44 justify-center items-center">
              <LockClosedIcon className="w-16 h-16 text-logo-purple" />
            </div>
            <div className="text-center font-light text-logo-purple mt-2 w-52 text-sm">
              Securely link your crypto wallet to our platform
            </div>
          </div>
          <div className="flex flex-col items-center m-4">
            <div className="text-center font-medium text-logo-purple mb-2">
              Share Health Data
            </div>
            <div className="flex flex-col w-52 p-5 rounded-xl bg-white h-44 justify-center items-center">
              <ChartBarIcon className="w-16 h-16 text-logo-purple" />
            </div>
            <div className="text-center font-light text-logo-purple mt-2 w-52 text-sm">
              Opt-in to share anonymized health metrics
            </div>
          </div>
          <div className="flex flex-col items-center m-4">
            <div className="text-center font-medium text-logo-purple mb-2">
              Get Insured
            </div>
            <div className="flex flex-col w-52 p-5 rounded-xl bg-white h-44 justify-center items-center">
              <ShieldCheckIcon className="w-16 h-16 text-logo-purple" />
            </div>
            <div className="text-center font-light text-logo-purple mt-2 w-52 text-sm">
              Receive tailored insurance coverage
            </div>
          </div>
          <div className="flex flex-col items-center m-4">
            <div className="text-center font-medium text-logo-purple mb-2">
              Earn Rewards
            </div>
            <div className="flex flex-col w-52 p-5 rounded-xl bg-white h-44 justify-center items-center">
              <CurrencyDollarIcon className="w-16 h-16 text-logo-purple" />
            </div>
            <div className="text-center font-light text-logo-purple mt-2 w-52 text-sm">
              Get token rewards for maintaining good health
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full pb-16 pt-14 bg-white">
        <div className="flex text-logo-purple font-medium sm:text-3xl text-2xl justify-center mb-2">
          Why Choose Us
        </div>
        <div className="flex text-gray-500 font-normal sm:text-lg text-md justify-center mb-2 text-center">
          Revolutionizing Health Insurance with DeFi
        </div>
        <div className="flex justify-center">
          <div className="h-1 w-6 md:w-9 rounded-xl bg-logo-purple mt-6 mb-20"></div>
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-center space-y-16 lg:space-y-0 lg:space-x-8 p-4 lg:p-8">
          <div className="flex flex-col justify-between p-6 lg:p-8 w-full max-w-lg lg:max-w-[36rem] bg-off-white rounded-xl shadow-md h-auto">
            <div className="flex items-center mb-4">
              <FaQuoteLeft className="text-logo-purple/30 text-4xl" />
            </div>
            <div className="text-center text-gray-700 italic">
              This DeFi insurance protocol has completely changed how I view health insurance. The rewards for maintaining good health are a great incentive, and the coverage is comprehensive.
            </div>
            <div className="text-center mt-4">
              <div className="font-semibold text-logo-purple">Alex Johnson</div>
            </div>
          </div>
          <div className="flex flex-col justify-between p-6 lg:p-8 w-full max-w-lg lg:max-w-[36rem] bg-off-white rounded-xl shadow-md h-auto">
            <div className="flex items-center mb-4">
              <FaQuoteLeft className="text-logo-purple/30 text-4xl" />
            </div>
            <div className="text-center text-gray-700 italic">
              I love how this platform combines the security of blockchain with health insurance. It's innovative, user-friendly, and the token rewards are a great bonus for staying healthy.
            </div>
            <div className="text-center mt-4">
              <div className="font-semibold text-logo-purple">
                Sarah Lee
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 text-xs sm:text-sm px-5 py-5 text-off-white bg-logo-purple/85 h-24">
        <div className="flex flex-col items-start justify-center">
          <div className="pb-1">@2024 DeFi Health Insurance</div>
          <div>All Rights Reserved.</div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="pb-2">Follow us on</div>
          <div className="flex">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="size-4 sm:size-6 text-off-white mx-2 hover:text-gray-300" />
            </a>
          </div>
        </div>
        <div className="flex flex-col items-end justify-center">
          <div className="pb-1">Contact us at</div>
          <div>info@defihealth.com</div>
        </div>
      </div>
    </div>
  );
}