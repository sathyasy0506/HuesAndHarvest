import React from "react";
import {
  Leaf,
  Home,
  Wrench,
  FlaskRound as Flask,
  Shield,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import Silk from "./Home/Silk"; // import your Silk background
import logo from "../assets/images/H&H.png";

const Footer = () => {
  return (
    <footer className="relative text-white overflow-hidden">
      {/* Animated Silk Background */}
      <div className="absolute inset-0 z-0">
        <Silk
          color="#234541"
          speed={3}
          scale={1}
          noiseIntensity={1.2}
          rotation={0.2}
        />
      </div>

      {/* Curved top wave */}
      <div className="absolute top-0 left-0 w-full overflow-hidden z-10">
        <svg
          className="relative block w-full h-20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,
      136.33-33.31,206.8-37.5C438.64,32.43,
      512.34,53.67,583,72.05c69.27,18,
      138.3,24.88,209.4,13.08,36.15-6,
      69.85-17.84,104.45-29.34C989.49,25,
      1113-14.29,1200,52.47V0Z"
            opacity=".25"
            fill="var(--bg-color)"
          />
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,
      47.69,72.05,99.41,111.27,165,111,
      224.58,91.58c31.15-10.15,60.09-26.07,
      89.67-39.8,40.92-19,84.73-46,
      130.83-49.67,36.26-2.85,70.9,9.42,
      98.6,31.56,31.77,25.39,62.32,62,
      103.63,73,40.44,10.79,81.35-6.69,
      119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,
      113.28,22.88,168.9,38.84,30.2,8.66,
      59,6.17,87.09-7.5,22.43-10.89,
      48-26.93,60.65-49.24V0Z"
            opacity=".5"
            fill="var(--bg-color)"
          />
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,
      475.83,42.57c43-7.64,84.23-20.12,
      127.61-26.46,59-8.63,112.48,12.24,
      165.56,35.4C827.93,77.22,886,95.24,
      951.2,90c86.53-7,172.46-45.71,
      248.8-84.81V0Z"
            fill="var(--bg-color)"
          />
        </svg>
      </div>

      {/* Footer Content */}
      <div className="relative z-10 pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <h2 className="text-center text-2xl font-light tracking-wider mb-12">
            WE ALWAYS CARE FOR YOU
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full border-2 flex items-center justify-center">
                <Leaf className="w-8 h-8" />
              </div>
              <h3 className="text-sm font-medium tracking-wide">
                100% NATURAL
              </h3>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full border-2 flex items-center justify-center">
                <Home className="w-8 h-8" />
              </div>
              <h3 className="text-sm font-medium tracking-wide">HOME-MADE</h3>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full border-2 flex items-center justify-center">
                <Wrench className="w-8 h-8" />
              </div>
              <h3 className="text-sm font-medium tracking-wide">TRADITIONAL</h3>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full border-2 flex items-center justify-center">
                <Flask className="w-8 h-8" />
              </div>
              <h3 className="text-sm font-medium tracking-wide">VEGETERIAN</h3>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full border-2 flex items-center justify-center">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-sm font-medium tracking-wide">
                CHEMICAL FREE
              </h3>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-300 mb-12"></div>
        </div>

        {/* Footer links section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Company info */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-6">
                <img
                  src={logo}
                  alt="Hues & Harvest Logo"
                  className="w-14 h-14 mr-3 rounded-full shadow-lg"
                />
                <span className="text-xl font-bold tracking-wide">
                  Hues & Harvest
                </span>
              </div>
              <p className="text-gray-200 text-sm leading-relaxed">
                Hues and Harvest brings you the crunch of nature in every bite.
                Made from carefully selected, farm-fresh ingredients, our chips
                capture the vibrant hues and rich flavors of each harvest.
                Healthy, wholesome, and full of taste—straight from our fields
                to your snack bowl.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6  justify-center flex">
                QUICK LINKS
              </h4>
              <div className="space-y-3 flex justify-center items-center flex-col">
                <ul className="space-y-3 ">
                  <li>
                    <a href="#" className="hover:text-white text-sm">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white text-sm">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white text-sm">
                      Shop
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Other Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6 flex justify-center">
                OTHER LINKS
              </h4>
              <div className=" flex justify-center items-center ">
                <ul className="space-y-3">
                  <li>
                    <a href="#" className="hover:text-white text-sm">
                      Privacy Policy
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white text-sm">
                      Terms & Condition
                    </a>
                  </li>{" "}
                  <li>
                    <a href="#" className="hover:text-white text-sm">
                      Contact Us{" "}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-gray-300">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-200 text-sm mb-4 md:mb-0">
              © 2016-2024 - All Rights Reserved
            </p>
            <div className="flex items-center space-x-4">
              <span className="text-gray-200 text-sm mr-4">
                GET CONNECTED WITH US
              </span>
              <a href="#" className="hover:text-white">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
