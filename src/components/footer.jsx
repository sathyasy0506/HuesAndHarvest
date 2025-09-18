import React, { forwardRef } from "react";
import {
  Leaf,
  Wrench,
  FlaskRound as Flask,
  Shield,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import Silk from "./Background/Silk";
import logo from "../assets/images/H&H.png";

const Footer = forwardRef((props, ref) => {
  return (
    <footer ref={ref} className="relative text-white overflow-hidden">
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

      {/* Curved top inner arc */}
      <div className="absolute top-0 left-0 w-full overflow-hidden z-10">
        <svg
          className="relative block w-full h-20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,0 Q600,120 1200,0 L1200,0 L0,0 Z"
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
          {/* Flex instead of grid for the icons */}
          <div className="flex flex-wrap justify-between gap-8 mx-10">
            {[
              { icon: Leaf, label: "100% NATURAL" },
              { icon: Wrench, label: "TRADITIONAL" },
              { icon: Flask, label: "VEGETERIAN" },
              { icon: Shield, label: "CHEMICAL FREE" },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full border-2 flex items-center justify-center">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-sm font-medium tracking-wide">{item.label}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-300 mb-12"></div>
        </div>

        {/* Footer links section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Flex instead of grid */}
          <div className="flex flex-wrap justify-between gap-8">
            {/* Company info */}
            <div className="flex-1 min-w-[250px]">
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
            <div className="flex-1 min-w-[150px] flex flex-col items-center">
              <h4 className="text-lg font-semibold mb-6">QUICK LINKS</h4>
              <ul className="space-y-3 text-center">
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

            {/* Other Links */}
            <div className="flex-1 min-w-[150px] flex flex-col items-center">
              <h4 className="text-lg font-semibold mb-6">OTHER LINKS</h4>
              <ul className="space-y-3 text-center">
                <li>
                  <a href="#" className="hover:text-white text-sm">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white text-sm">
                    Terms & Condition
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white text-sm">
                    Contact Us
                  </a>
                </li>
              </ul>
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
});

export default Footer;
