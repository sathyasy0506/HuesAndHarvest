import React from "react";
import { Sprout, Factory, Package, Truck } from "lucide-react";

const Process = () => {
  const steps = [
    {
      icon: Sprout,
      title: "Farm Fresh Sourcing",
      description:
        "We partner with certified organic farms to source the freshest vegetables and potatoes",
      image:
        "https://images.pexels.com/photos/4207892/pexels-photo-4207892.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
    },
    {
      icon: Factory,
      title: "Artisanal Crafting",
      description:
        "Small batch production using traditional methods combined with modern techniques",
      image:
        "https://images.pexels.com/photos/5331176/pexels-photo-5331176.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
    },
    {
      icon: Package,
      title: "Premium Packaging",
      description:
        "Eco-friendly packaging that preserves freshness while protecting the environment",
      image:
        "https://images.pexels.com/photos/4198170/pexels-photo-4198170.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
    },
    {
      icon: Truck,
      title: "Direct Delivery",
      description:
        "Fast, carbon-neutral shipping to bring farm-fresh taste directly to your door",
      image:
        "https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
    },
  ];

  return (
    <section
      id="process"
      className="py-20 relative"
      style={{
        fontFamily: "var(--font-outfit)",
        backgroundColor: "transparent",
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Heading */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{
              backgroundColor: "var(--cards-bg)",
              color: "var(--accent-color)",
              fontFamily: "var(--font-poppins)",
            }}
          >
            Our Process
          </div>
          <h2
            className="text-3xl lg:text-5xl font-bold mb-4"
            style={{ color: "var(--text-color)" }}
          >
            From Field to Fork
          </h2>
          <p
            className="text-xl max-w-2xl mx-auto"
            style={{ color: "var(--muted-text)" }}
          >
            Follow the journey of our premium chips through every step of our
            careful process
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-12">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className={`flex flex-col ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                } items-center gap-8 group`}
              >
                {/* Image */}
                <div className="flex-1 w-full">
                  <div className="relative overflow-hidden rounded-2xl group-hover:scale-105 transition-transform duration-500">
                    <img
                      src={step.image}
                      alt={step.title}
                      className="w-full h-auto max-h-72 object-cover"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ backgroundColor: "rgba(0,0,0,0.25)" }}
                    ></div>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-4 text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start space-x-4">
                    <div
                      className="w-16 h-16 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                      style={{ backgroundColor: "var(--accent-color)" }}
                    >
                      <IconComponent
                        className="w-8 h-8"
                        style={{ color: "var(--white)" }}
                      />
                    </div>
                    <div
                      className="text-3xl font-bold"
                      style={{ color: "var(--accent-color)" }}
                    >
                      0{index + 1}
                    </div>
                  </div>

                  <h3
                    className="text-2xl font-bold transition-colors duration-300 group-hover:text-[var(--accent-color)]"
                    style={{ color: "var(--text-color)" }}
                  >
                    {step.title}
                  </h3>

                  <p
                    className="leading-relaxed text-lg"
                    style={{ color: "var(--muted-text)" }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats */}
        <div className="text-center mt-16">
          <div
            className="flex flex-col sm:flex-row items-center justify-center sm:space-x-8 space-y-6 sm:space-y-0 backdrop-blur-sm rounded-2xl p-6"
            style={{ backgroundColor: "var(--cards-bg)" }}
          >
            {/* Item 1 */}
            <div className="text-center">
              <div
                className="text-3xl font-bold"
                style={{ color: "var(--text-color)" }}
              >
                24h
              </div>
              <div className="text-sm" style={{ color: "var(--accent-color)" }}>
                Fresh Guarantee
              </div>
            </div>

            {/* Divider */}
            <div
              className="hidden sm:block w-px h-12"
              style={{ backgroundColor: "var(--border-color)" }}
            ></div>

            {/* Item 2 */}
            <div className="text-center">
              <div
                className="text-3xl font-bold"
                style={{ color: "var(--text-color)" }}
              >
                100%
              </div>
              <div className="text-sm" style={{ color: "var(--accent-color)" }}>
                Organic
              </div>
            </div>

            {/* Divider */}
            <div
              className="hidden sm:block w-px h-12"
              style={{ backgroundColor: "var(--border-color)" }}
            ></div>

            {/* Item 3 */}
            <div className="text-center">
              <div
                className="text-3xl font-bold"
                style={{ color: "var(--text-color)" }}
              >
                0
              </div>
              <div className="text-sm" style={{ color: "var(--accent-color)" }}>
                Preservatives
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
