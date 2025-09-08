import React from "react";
import { Truck, ShieldCheck, Headphones, CreditCard } from "lucide-react";

function FreshnessSection() {
  return (
    <section className="max-w-7xl mx-auto flex flex-col md:flex-row rounded-2xl overflow-hidden justify-center">
      {/* Left section (Full Image, Larger Area) */}
      <div className="md:w-2/3 w-full flex items-center justify-center">
        <img
          src="https://shop.huesandharvest.com/wp-content/uploads/2025/09/Group-23664-1.png"
          alt="Kiwi Promo"
          className="w-full h-full object-contain"
        />
      </div>

      {/* Right section (Smaller Area) */}
      <div className="md:w-1/3 w-full bg-transparent p-8 flex flex-col justify-center space-y-6 mt-12">
        {/* Item 1 */}
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-full border border-black-950 bg-transparent">
            <Truck className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <h3 className="font-semibold">Free Delivery Across Town!</h3>
            <p className="text-sm text-gray-600">
              Free delivery for all orders above ₹500
            </p>
          </div>
        </div>

        {/* Item 2 */}
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-full border border-black-950 bg-transparent">
            <ShieldCheck className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <h3 className="font-semibold">100% Satisfaction Guarantee!</h3>
            <p className="text-sm text-gray-600">
              Providing help in case of dissatisfaction
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
              Chat with us if you’ve any questions
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
              We use safest payment technologies
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FreshnessSection;
