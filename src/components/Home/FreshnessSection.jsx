import React from "react";
import { Truck, ShieldCheck, Headphones, CreditCard } from "lucide-react";

function FreshnessSection() {
  return (
    <section className="max-w-7xl mx-auto flex flex-col md:flex-row rounded-2xl overflow-hidden justify-center bg-transparent">
      {/* Left section (Full Image, Larger Area) */}
      <div className="md:w-2/3 w-full flex items-center justify-center bg-transparent">
        <img
          src="https://huesandharvest.com/assets/fresh.png"
          alt="Kiwi Promo"
          className="w-full h-full object-contain rounded-2xl"
        />
      </div>

      {/* Right section (Smaller Area) */}
      <div className="md:w-1/3 w-full bg-transparent p-8 flex flex-col justify-center space-y-6 ">
        {/* Item 1 */}
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-full border border-black-950 bg-transparent">
            <Truck className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <h3 className="font-semibold">Free Delivery Across India</h3>
            <p className="text-sm text-gray-600">
              Complimentary delivery on all orders over ₹500
            </p>
          </div>
        </div>

        {/* Item 2 */}
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-full border border-black-950 bg-transparent">
            <ShieldCheck className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <h3 className="font-semibold">
              Your satisfaction is our priority.
            </h3>
            <p className="text-sm text-gray-600">
              We are always here to assist you.
            </p>
          </div>
        </div>

        {/* Item 3 */}
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-full border border-black-950 bg-transparent">
            <Headphones className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <h3 className="font-semibold">Top-Notch Support</h3>
            <p className="text-sm text-gray-600">
              Reach out to us anytime for any queries
            </p>
          </div>
        </div>

        {/* Item 4 */}
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-full border border-black-950 bg-transparent">
            <CreditCard className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <h3 className="font-semibold">Secure Payments</h3>
            <p className="text-sm text-gray-600">
              We use the most reliable and safe payment methods
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FreshnessSection;
