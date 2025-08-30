import React from "react";
import {
  TrendingUp,
  Users,
  Award,
  Globe,
  Shield,
  Leaf,
  Heart,
} from "lucide-react";

const Stats = () => {
  const stats = [
    {
      icon: Users,
      number: "50,000+",
      label: "Happy Customers",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: Award,
      number: "15+",
      label: "Industry Awards",
      color: "text-yellow-600",
      bgColor: "bg-yellow-100",
    },

    {
      icon: TrendingUp,
      number: "98%",
      label: "Customer Satisfaction",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
  ];

  return (
    <section className="py-20 bg-gray-900 relative overflow-hidden ">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-yellow-500/20"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join the growing community of food lovers who choose quality and
            taste
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div
                key={index}
                className="text-center group hover:scale-105 transition-transform duration-300 max-w-full"
              >
                <div
                  className={`w-16 h-16 ${stat.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <IconComponent className={`w-8 h-8 ${stat.color}`} />
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-white mb-2 break-words">
                  {stat.number}
                </div>
                <div className="text-gray-300 font-medium break-words">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Trust Elements */}
        <div className="mt-16 pt-16 border-t border-gray-800">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="group">
              <div className="w-20 h-20 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">100% Secure</h3>
              <p className="text-gray-300">
                SSL encrypted checkout and secure payment processing
              </p>
            </div>

            <div className="group">
              <div className="w-20 h-20 bg-gradient-to-br from-yellow-600 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Leaf className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Eco-Friendly
              </h3>
              <p className="text-gray-300">
                Sustainable packaging and carbon-neutral shipping
              </p>
            </div>

            <div className="group">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Made with Love
              </h3>
              <p className="text-gray-300">
                Handcrafted in small batches with attention to detail
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
