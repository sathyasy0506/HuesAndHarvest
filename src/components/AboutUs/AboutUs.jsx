import React from "react";
import {
  Wheat,
  Heart,
  Users,
  Award,
  MapPin,
  Mail,
  Phone,
  Star,
  Leaf,
  Shield,
  Clock,
  Target,
  TrendingUp,
  Globe,
  Factory,
  Truck,
  CheckCircle,
} from "lucide-react";
import Gradient from "../Background/Gradient";

const AboutUs = () => {
  return (
    <Gradient>
      <div className="min-h-screen" style={{ color: "var(--text-color)" }}>
        {/* Hero Section */}
        <section className="relative py-20 px-4 sm:px-6 lg:px-8 mt-4 bg-transparent">
          <div className="absolute inset-0"></div>
          <div className="relative max-w-7xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <Wheat
                className="h-16 w-16 mr-4"
                style={{ color: "var(--dark-gold-color)" }}
              />
              <h1
                className="text-5xl md:text-7xl font-black text-black"
                style={{
                  fontFamily: "var(--font-outfit)",
                  color: "var(--text-color)",
                }}
              >
                Hues & Harvest
              </h1>
            </div>
            <p
              className="text-xl md:text-2xl font-light text-black/90 max-w-4xl mx-auto leading-relaxed"
              style={{
                fontFamily: "var(--font-poppins)",
                color: "var(--text-color)",
              }}
            >
              Pioneering the future of premium snacking through artisanal
              craftsmanship, sustainable agriculture, and an unwavering
              commitment to extraordinary flavor experiences.
            </p>
          </div>
        </section>

        {/* Company Overview */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center bg-transparent">
              <div>
                <h2
                  className="text-4xl font-bold mb-6"
                  style={{
                    fontFamily: "var(--font-outfit)",
                    color: "var(--text-color)",
                  }}
                >
                  Redefining Premium Snacking
                </h2>
                <div
                  className="space-y-6 text-lg leading-relaxed bg-transparent"
                  style={{ color: "var(--muted-text)" }}
                >
                  <p>
                    Since our founding in 2018, Hues & Harvest has emerged as
                    the premier artisanal chip manufacturer in the Pacific
                    Northwest, transforming how consumers experience gourmet
                    snacking. Our journey began with a simple yet revolutionary
                    idea: that exceptional chips should celebrate the natural
                    diversity and rich flavors of locally-sourced, organic
                    ingredients.
                  </p>
                  <p>
                    What distinguishes us in the competitive snack industry is
                    our unwavering dedication to small-batch production,
                    traditional kettle-cooking methods, and direct partnerships
                    with certified organic farms. Every chip we produce
                    represents our commitment to culinary excellence,
                    environmental stewardship, and supporting local agricultural
                    communities.
                  </p>
                  <p>
                    Today, Hues & Harvest operates state-of-the-art facilities
                    across three locations, employs over 150 dedicated team
                    members, and distributes our premium products to more than
                    2,500 retail locations throughout North America, while
                    maintaining the artisanal quality that defines our brand.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/4110404/pexels-photo-4110404.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Premium chip production facility"
                  className="rounded-3xl shadow-2xl w-full h-[450px] object-cover"
                />
                <div
                  className="absolute -bottom-6 -left-6 p-6 rounded-2xl shadow-xl"
                  style={{ backgroundColor: "var(--dark-gold-color)" }}
                >
                  <div className="text-2xl font-bold text-white">2018</div>
                  <div className="text-white/90 font-medium">Founded</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2
                className="text-4xl font-bold mb-4"
                style={{
                  fontFamily: "var(--font-outfit)",
                  color: "var(--text-color)",
                }}
              >
                Mission & Vision
              </h2>
              <p
                className="text-lg max-w-3xl mx-auto"
                style={{ color: "var(--muted-text)" }}
              >
                Driving positive change in the food industry through innovation
                and responsibility
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div
                className="p-10 rounded-3xl"
                style={{ backgroundColor: "var(--cards-bg)" }}
              >
                <div className="flex items-center mb-6">
                  <Target
                    className="h-10 w-10 mr-4"
                    style={{ color: "var(--primary-color)" }}
                  />
                  <h3
                    className="text-2xl font-bold"
                    style={{
                      fontFamily: "var(--font-outfit)",
                      color: "var(--text-color)",
                    }}
                  >
                    Our Mission
                  </h3>
                </div>
                <p
                  className="text-lg leading-relaxed"
                  style={{ color: "var(--muted-text)" }}
                >
                  To revolutionize the snack industry by creating extraordinary,
                  health-conscious chips that celebrate the authentic flavors of
                  sustainably-sourced ingredients, while fostering meaningful
                  partnerships with local farming communities and inspiring
                  consumers to make mindful food choices that benefit both their
                  health and the environment.
                </p>
              </div>

              <div
                className="p-10 rounded-3xl"
                style={{ backgroundColor: "var(--cards-bg)" }}
              >
                <div className="flex items-center mb-6">
                  <Globe
                    className="h-10 w-10 mr-4"
                    style={{ color: "var(--primary-color)" }}
                  />
                  <h3
                    className="text-2xl font-bold"
                    style={{
                      fontFamily: "var(--font-outfit)",
                      color: "var(--text-color)",
                    }}
                  >
                    Our Vision
                  </h3>
                </div>
                <p
                  className="text-lg leading-relaxed"
                  style={{ color: "var(--muted-text)" }}
                >
                  To become the global leader in premium, sustainable snacking
                  by 2030, setting new industry standards for quality,
                  environmental responsibility, and social impact while
                  expanding our reach to conscious consumers worldwide who value
                  authentic flavors and ethical food production.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2
                className="text-4xl font-bold mb-4"
                style={{
                  fontFamily: "var(--font-outfit)",
                  color: "var(--text-color)",
                }}
              >
                Our Core Values
              </h2>
              <p
                className="text-lg max-w-3xl mx-auto"
                style={{ color: "var(--muted-text)" }}
              >
                The principles that guide every decision we make and every chip
                we craft
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div
                className="group p-6 rounded-2xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4"
                style={{ backgroundColor: "var(--card-color)" }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: "var(--primary-color)" }}
                >
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3
                  className="text-xl font-bold mb-3"
                  style={{
                    fontFamily: "var(--font-outfit)",
                    color: "var(--text-color)",
                  }}
                >
                  Uncompromising Quality
                </h3>
                <p
                  className="leading-relaxed text-sm"
                  style={{ color: "var(--muted-text)" }}
                >
                  Every ingredient is meticulously selected and every batch is
                  crafted to meet our exacting standards for taste, texture, and
                  nutritional value.
                </p>
              </div>

              <div
                className="group p-6 rounded-2xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4"
                style={{ backgroundColor: "var(--card-color)" }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: "var(--primary-color)" }}
                >
                  <Leaf className="h-8 w-8 text-white" />
                </div>
                <h3
                  className="text-xl font-bold mb-3"
                  style={{
                    fontFamily: "var(--font-outfit)",
                    color: "var(--text-color)",
                  }}
                >
                  Environmental Stewardship
                </h3>
                <p
                  className="leading-relaxed text-sm"
                  style={{ color: "var(--muted-text)" }}
                >
                  We're committed to regenerative agriculture, carbon-neutral
                  operations, and packaging innovations that minimize our
                  environmental impact.
                </p>
              </div>

              <div
                className="group p-6 rounded-2xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4"
                style={{ backgroundColor: "var(--card-color)" }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: "var(--primary-color)" }}
                >
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3
                  className="text-xl font-bold mb-3"
                  style={{
                    fontFamily: "var(--font-outfit)",
                    color: "var(--text-color)",
                  }}
                >
                  Community Partnership
                </h3>
                <p
                  className="leading-relaxed text-sm"
                  style={{ color: "var(--muted-text)" }}
                >
                  Building lasting relationships with local farmers, supporting
                  agricultural education, and contributing to food security
                  initiatives in our communities.
                </p>
              </div>

              <div
                className="group p-6 rounded-2xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4"
                style={{ backgroundColor: "var(--card-color)" }}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300"
                  style={{ backgroundColor: "var(--primary-color)" }}
                >
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <h3
                  className="text-xl font-bold mb-3"
                  style={{
                    fontFamily: "var(--font-outfit)",
                    color: "var(--text-color)",
                  }}
                >
                  Authentic Innovation
                </h3>
                <p
                  className="leading-relaxed text-sm"
                  style={{ color: "var(--muted-text)" }}
                >
                  Continuously pushing culinary boundaries while honoring
                  traditional cooking methods and celebrating authentic, natural
                  flavors.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story Timeline */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2
                className="text-4xl font-bold mb-4"
                style={{
                  fontFamily: "var(--font-outfit)",
                  color: "var(--text-color)",
                }}
              >
                Our Journey
              </h2>
              <p
                className="text-lg max-w-3xl mx-auto"
                style={{ color: "var(--muted-text)" }}
              >
                From humble beginnings to industry leadership
              </p>
            </div>

            <div className="relative">
              <div
                className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full"
                style={{ backgroundColor: "var(--primary-color)" }}
              ></div>

              <div className="space-y-12">
                <div className="flex items-center">
                  <div className="flex-1 pr-8 text-right">
                    <div
                      className="p-6 rounded-2xl"
                      style={{ backgroundColor: "var(--card-color)" }}
                    >
                      <h3
                        className="text-xl font-bold mb-3"
                        style={{
                          fontFamily: "var(--font-outfit)",
                          color: "var(--text-color)",
                        }}
                      >
                        2018 - The Beginning
                      </h3>
                      <p
                        className="text-base leading-relaxed"
                        style={{ color: "var(--muted-text)" }}
                      >
                        Founded by Sarah Chen and Marcus Rodriguez in a small
                        Portland kitchen, driven by a passion for creating
                        healthier, more flavorful snacks using locally-sourced
                        organic ingredients.
                      </p>
                    </div>
                  </div>
                  <div
                    className="w-6 h-6 rounded-full border-4 border-white shadow-lg z-10"
                    style={{ backgroundColor: "var(--primary-color)" }}
                  ></div>
                  <div className="flex-1 pl-8"></div>
                </div>

                <div className="flex items-center">
                  <div className="flex-1 pr-8"></div>
                  <div
                    className="w-6 h-6 rounded-full border-4 border-white shadow-lg z-10"
                    style={{ backgroundColor: "var(--primary-color)" }}
                  ></div>
                  <div className="flex-1 pl-8">
                    <div
                      className="p-6 rounded-2xl"
                      style={{ backgroundColor: "var(--card-color)" }}
                    >
                      <h3
                        className="text-xl font-bold mb-3"
                        style={{
                          fontFamily: "var(--font-outfit)",
                          color: "var(--text-color)",
                        }}
                      >
                        2020 - First Retail Partnership
                      </h3>
                      <p
                        className="text-base leading-relaxed"
                        style={{ color: "var(--muted-text)" }}
                      >
                        Secured our first major retail partnership with Whole
                        Foods Market, launching in 50 stores across Oregon and
                        Washington with our signature Sweet Potato & Rosemary
                        flavor.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="flex-1 pr-8 text-right">
                    <div
                      className="p-6 rounded-2xl"
                      style={{ backgroundColor: "var(--card-color)" }}
                    >
                      <h3
                        className="text-xl font-bold mb-3"
                        style={{
                          fontFamily: "var(--font-outfit)",
                          color: "var(--text-color)",
                        }}
                      >
                        2022 - National Expansion
                      </h3>
                      <p
                        className="text-base leading-relaxed"
                        style={{ color: "var(--muted-text)" }}
                      >
                        Expanded distribution to over 1,200 stores nationwide,
                        launched our direct-to-consumer platform, and introduced
                        our award-winning Heritage Vegetable Collection
                        featuring heirloom varieties.
                      </p>
                    </div>
                  </div>
                  <div
                    className="w-6 h-6 rounded-full border-4 border-white shadow-lg z-10"
                    style={{ backgroundColor: "var(--primary-color)" }}
                  ></div>
                  <div className="flex-1 pl-8"></div>
                </div>

                <div className="flex items-center">
                  <div className="flex-1 pr-8"></div>
                  <div
                    className="w-6 h-6 rounded-full border-4 border-white shadow-lg z-10"
                    style={{ backgroundColor: "var(--primary-color)" }}
                  ></div>
                  <div className="flex-1 pl-8">
                    <div
                      className="p-6 rounded-2xl"
                      style={{ backgroundColor: "var(--card-color)" }}
                    >
                      <h3
                        className="text-xl font-bold mb-3"
                        style={{
                          fontFamily: "var(--font-outfit)",
                          color: "var(--text-color)",
                        }}
                      >
                        2024 - Sustainability Leadership
                      </h3>
                      <p
                        className="text-base leading-relaxed"
                        style={{ color: "var(--muted-text)" }}
                      >
                        Achieved B-Corp certification, launched our
                        carbon-neutral packaging initiative, and established the
                        Hues & Harvest Foundation to support sustainable
                        agriculture education.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2
                className="text-4xl font-bold mb-4"
                style={{
                  fontFamily: "var(--font-outfit)",
                  color: "var(--text-color)",
                }}
              >
                Leadership Team
              </h2>
              <p
                className="text-lg max-w-3xl mx-auto"
                style={{ color: "var(--muted-text)" }}
              >
                Visionary leaders driving innovation and excellence across every
                aspect of our business
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              <div className="group text-center">
                <div className="relative mb-6">
                  <img
                    src="https://zlancreations.com/static/media/sreekumar.b7884cbfefebba15edd4.png"
                    alt="Sarah Chen - CEO & Co-Founder"
                    className="w-56 h-56 mx-auto rounded-full object-cover shadow-xl group-hover:shadow-2xl transition-all duration-300"
                  />
                  <div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      backgroundColor: "var(--primary-color)",
                      opacity: "0.1",
                    }}
                  ></div>
                </div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{
                    fontFamily: "var(--font-outfit)",
                    color: "var(--text-color)",
                  }}
                >
                  Sreekumar
                </h3>
                <p
                  className="font-semibold mb-3"
                  style={{ color: "var(--primary-color)" }}
                >
                  CEO & Co-Founder
                </p>
                <p
                  className="leading-relaxed mb-3 text-sm"
                  style={{ color: "var(--muted-text)" }}
                >
                  Former food scientist at Unilever with 15 years of experience
                  in sustainable food production. Sarah holds an MS in Food
                  Science from UC Davis and is a certified B-Corp leader.
                </p>
                <div className="text-xs" style={{ color: "var(--muted-text)" }}>
                  <p>• James Beard Foundation Sustainability Award 2023</p>
                  <p>• Forbes 30 Under 30 Food & Drink 2021</p>
                </div>
              </div>

              <div className="group text-center">
                <div className="relative mb-6">
                  <img
                    src="https://zlancreations.com/static/media/Manager.950370d238a5cb85c3a2.png"
                    alt="Marcus Rodriguez - Head of Culinary Innovation"
                    className="w-56 h-56 mx-auto rounded-full object-cover shadow-xl group-hover:shadow-2xl transition-all duration-300"
                  />
                  <div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      backgroundColor: "var(--primary-color)",
                      opacity: "0.1",
                    }}
                  ></div>
                </div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{
                    fontFamily: "var(--font-outfit)",
                    color: "var(--text-color)",
                  }}
                >
                  Madhav
                </h3>
                <p
                  className="font-semibold mb-3"
                  style={{ color: "var(--primary-color)" }}
                >
                  Co-Founder & Chief Culinary Officer
                </p>
                <p
                  className="leading-relaxed mb-3 text-sm"
                  style={{ color: "var(--muted-text)" }}
                >
                  Award-winning chef with Michelin-starred restaurant
                  experience. Marcus brings innovative flavor development and
                  traditional cooking techniques to our production process.
                </p>
                <div className="text-xs" style={{ color: "var(--muted-text)" }}>
                  <p>• Culinary Institute of America Graduate</p>
                  <p>• Good Food Awards Winner 2022, 2023</p>
                </div>
              </div>

              <div className="group text-center">
                <div className="relative mb-6">
                  <img
                    src="https://zlancreations.com/static/media/athulya.ec2df3a08d0676e5b23a.png"
                    alt="Emily Thompson - Operations Director"
                    className="w-56 h-56 mx-auto rounded-full object-cover shadow-xl group-hover:shadow-2xl transition-all duration-300"
                  />
                  <div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      backgroundColor: "var(--primary-color)",
                      opacity: "0.1",
                    }}
                  ></div>
                </div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{
                    fontFamily: "var(--font-outfit)",
                    color: "var(--text-color)",
                  }}
                >
                  Athulya
                </h3>
                <p
                  className="font-semibold mb-3"
                  style={{ color: "var(--primary-color)" }}
                >
                  Chief Operations Officer
                </p>
                <p
                  className="leading-relaxed mb-3 text-sm"
                  style={{ color: "var(--muted-text)" }}
                >
                  Supply chain expert with 12 years at Amazon Fresh. Emily
                  oversees our farm partnerships, production efficiency, and
                  quality assurance programs.
                </p>
                <div className="text-xs" style={{ color: "var(--muted-text)" }}>
                  <p>• MBA from Stanford Graduate School</p>
                  <p>• Certified Supply Chain Professional</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Production Process */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2
                  className="text-4xl font-bold mb-6"
                  style={{
                    fontFamily: "var(--font-outfit)",
                    color: "var(--text-color)",
                  }}
                >
                  Artisanal Production Process
                </h2>
                <p
                  className="text-lg mb-10 leading-relaxed"
                  style={{ color: "var(--muted-text)" }}
                >
                  Our time-honored approach combines traditional kettle-cooking
                  methods with cutting-edge food safety technology to create
                  chips of unparalleled quality and flavor.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start space-x-5">
                    <div
                      className="p-3 rounded-full"
                      style={{ backgroundColor: "var(--cards-bg)" }}
                    >
                      <Wheat
                        className="h-7 w-7"
                        style={{ color: "var(--primary-color)" }}
                      />
                    </div>
                    <div>
                      <h3
                        className="text-lg font-semibold mb-2"
                        style={{
                          fontFamily: "var(--font-outfit)",
                          color: "var(--text-color)",
                        }}
                      >
                        Premium Ingredient Selection
                      </h3>
                      <p
                        className="leading-relaxed text-sm"
                        style={{ color: "var(--muted-text)" }}
                      >
                        Hand-selected organic vegetables and heritage potatoes
                        sourced exclusively from certified farms within 200
                        miles of our facilities, ensuring peak freshness and
                        supporting local agriculture.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-5">
                    <div
                      className="p-3 rounded-full"
                      style={{ backgroundColor: "var(--cards-bg)" }}
                    >
                      <Factory
                        className="h-7 w-7"
                        style={{ color: "var(--primary-color)" }}
                      />
                    </div>
                    <div>
                      <h3
                        className="text-lg font-semibold mb-2"
                        style={{
                          fontFamily: "var(--font-outfit)",
                          color: "var(--text-color)",
                        }}
                      >
                        Small-Batch Kettle Cooking
                      </h3>
                      <p
                        className="leading-relaxed text-sm"
                        style={{ color: "var(--muted-text)" }}
                      >
                        Traditional copper kettles allow for precise temperature
                        control and even cooking, creating the perfect texture
                        while preserving the natural flavors and nutritional
                        benefits of our ingredients.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-5">
                    <div
                      className="p-3 rounded-full"
                      style={{ backgroundColor: "var(--cards-bg)" }}
                    >
                      <Award
                        className="h-7 w-7"
                        style={{ color: "var(--primary-color)" }}
                      />
                    </div>
                    <div>
                      <h3
                        className="text-lg font-semibold mb-2"
                        style={{
                          fontFamily: "var(--font-outfit)",
                          color: "var(--text-color)",
                        }}
                      >
                        Rigorous Quality Control
                      </h3>
                      <p
                        className="leading-relaxed text-sm"
                        style={{ color: "var(--muted-text)" }}
                      >
                        Every batch undergoes comprehensive testing for taste,
                        texture, and safety. Our quality assurance team ensures
                        consistency across all products while maintaining our
                        artisanal standards.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="relative">
                <img
                  src="https://images.pexels.com/photos/4226806/pexels-photo-4226806.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Artisanal chip production process"
                  className="rounded-3xl shadow-2xl w-full h-[550px] object-cover"
                />
                <div
                  className="absolute -top-6 -right-6 p-5 rounded-2xl shadow-xl"
                  style={{ backgroundColor: "var(--dark-gold-color)" }}
                >
                  <Clock className="h-7 w-7 text-white mb-2" />
                  <div className="text-xl font-bold text-white">48hrs</div>
                  <div className="text-white/90 text-xs">Farm to Bag</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sustainability Initiatives */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2
                className="text-4xl font-bold mb-4"
                style={{
                  fontFamily: "var(--font-outfit)",
                  color: "var(--text-color)",
                }}
              >
                Sustainability Leadership
              </h2>
              <p
                className="text-lg max-w-3xl mx-auto"
                style={{ color: "var(--muted-text)" }}
              >
                Leading the industry in environmental responsibility and
                regenerative practices
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div
                  className="p-6 rounded-2xl hover:shadow-lg transition-shadow duration-300"
                  style={{ backgroundColor: "var(--card-color)" }}
                >
                  <div className="flex items-center mb-4">
                    <Leaf
                      className="h-8 w-8 mr-3"
                      style={{ color: "var(--success-color)" }}
                    />
                    <h3
                      className="text-xl font-bold"
                      style={{
                        fontFamily: "var(--font-outfit)",
                        color: "var(--text-color)",
                      }}
                    >
                      Carbon Neutral Operations
                    </h3>
                  </div>
                  <p
                    className="text-base leading-relaxed mb-3"
                    style={{ color: "var(--muted-text)" }}
                  >
                    Achieved carbon neutrality across all operations through
                    renewable energy adoption, efficient transportation, and
                    verified carbon offset programs.
                  </p>
                  <div
                    className="flex items-center text-xs"
                    style={{ color: "var(--success-color)" }}
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    <span>Certified Carbon Neutral since 2023</span>
                  </div>
                </div>

                <div
                  className="p-6 rounded-2xl hover:shadow-lg transition-shadow duration-300"
                  style={{ backgroundColor: "var(--card-color)" }}
                >
                  <div className="flex items-center mb-4">
                    <Globe
                      className="h-8 w-8 mr-3"
                      style={{ color: "var(--success-color)" }}
                    />
                    <h3
                      className="text-xl font-bold"
                      style={{
                        fontFamily: "var(--font-outfit)",
                        color: "var(--text-color)",
                      }}
                    >
                      Regenerative Agriculture
                    </h3>
                  </div>
                  <p
                    className="text-base leading-relaxed mb-3"
                    style={{ color: "var(--muted-text)" }}
                  >
                    Partnering with farms that use regenerative practices to
                    restore soil health, increase biodiversity, and sequester
                    carbon naturally.
                  </p>
                  <div
                    className="flex items-center text-xs"
                    style={{ color: "var(--success-color)" }}
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    <span>85% of partners use regenerative methods</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div
                  className="p-6 rounded-2xl hover:shadow-lg transition-shadow duration-300"
                  style={{ backgroundColor: "var(--card-color)" }}
                >
                  <div className="flex items-center mb-4">
                    <Truck
                      className="h-8 w-8 mr-3"
                      style={{ color: "var(--success-color)" }}
                    />
                    <h3
                      className="text-xl font-bold"
                      style={{
                        fontFamily: "var(--font-outfit)",
                        color: "var(--text-color)",
                      }}
                    >
                      Eco-Friendly Packaging
                    </h3>
                  </div>
                  <p
                    className="text-base leading-relaxed mb-3"
                    style={{ color: "var(--muted-text)" }}
                  >
                    100% compostable packaging made from plant-based materials,
                    reducing plastic waste and supporting circular economy
                    principles.
                  </p>
                  <div
                    className="flex items-center text-xs"
                    style={{ color: "var(--success-color)" }}
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    <span>Zero plastic packaging by 2025</span>
                  </div>
                </div>

                <div
                  className="p-6 rounded-2xl hover:shadow-lg transition-shadow duration-300"
                  style={{ backgroundColor: "var(--card-color)" }}
                >
                  <div className="flex items-center mb-4">
                    <Heart
                      className="h-8 w-8 mr-3"
                      style={{ color: "var(--success-color)" }}
                    />
                    <h3
                      className="text-xl font-bold"
                      style={{
                        fontFamily: "var(--font-outfit)",
                        color: "var(--text-color)",
                      }}
                    >
                      Community Impact
                    </h3>
                  </div>
                  <p
                    className="text-base leading-relaxed mb-3"
                    style={{ color: "var(--muted-text)" }}
                  >
                    Supporting local food banks, agricultural education
                    programs, and providing fair wages to all workers in our
                    supply chain.
                  </p>
                  <div
                    className="flex items-center text-xs"
                    style={{ color: "var(--success-color)" }}
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    <span>$500K+ donated to community programs</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Company Statistics */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2
                className="text-4xl font-bold mb-4"
                style={{
                  fontFamily: "var(--font-outfit)",
                  color: "var(--text-color)",
                }}
              >
                By the Numbers
              </h2>
              <p
                className="text-lg max-w-3xl mx-auto"
                style={{ color: "var(--muted-text)" }}
              >
                Measurable impact and continuous growth across all areas of our
                business
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div
                className="text-center p-6 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
                style={{ backgroundColor: "var(--cards-bg)" }}
              >
                <div
                  className="text-4xl font-black mb-3"
                  style={{
                    color: "var(--primary-color)",
                    fontFamily: "var(--font-outfit)",
                  }}
                >
                  45+
                </div>
                <div
                  className="font-semibold text-sm"
                  style={{ color: "var(--text-color)" }}
                >
                  Farm Partners
                </div>
                <div
                  className="text-xs mt-1"
                  style={{ color: "var(--muted-text)" }}
                >
                  Across 5 states
                </div>
              </div>

              <div
                className="text-center p-6 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
                style={{ backgroundColor: "var(--cards-bg)" }}
              >
                <div
                  className="text-4xl font-black mb-3"
                  style={{
                    color: "var(--primary-color)",
                    fontFamily: "var(--font-outfit)",
                  }}
                >
                  18
                </div>
                <div
                  className="font-semibold text-sm"
                  style={{ color: "var(--text-color)" }}
                >
                  Unique Flavors
                </div>
                <div
                  className="text-xs mt-1"
                  style={{ color: "var(--muted-text)" }}
                >
                  Seasonal varieties
                </div>
              </div>

              <div
                className="text-center p-6 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
                style={{ backgroundColor: "var(--cards-bg)" }}
              >
                <div
                  className="text-4xl font-black mb-3"
                  style={{
                    color: "var(--primary-color)",
                    fontFamily: "var(--font-outfit)",
                  }}
                >
                  2.5K+
                </div>
                <div
                  className="font-semibold text-sm"
                  style={{ color: "var(--text-color)" }}
                >
                  Retail Locations
                </div>
                <div
                  className="text-xs mt-1"
                  style={{ color: "var(--muted-text)" }}
                >
                  North America
                </div>
              </div>

              <div
                className="text-center p-6 rounded-2xl hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
                style={{ backgroundColor: "var(--cards-bg)" }}
              >
                <div
                  className="text-4xl font-black mb-3"
                  style={{
                    color: "var(--primary-color)",
                    fontFamily: "var(--font-outfit)",
                  }}
                >
                  100%
                </div>
                <div
                  className="font-semibold text-sm"
                  style={{ color: "var(--text-color)" }}
                >
                  Organic Certified
                </div>
                <div
                  className="text-xs mt-1"
                  style={{ color: "var(--muted-text)" }}
                >
                  USDA Verified
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Awards & Recognition */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-transparent">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2
                className="text-4xl font-bold mb-4"
                style={{
                  fontFamily: "var(--font-outfit)",
                  color: "var(--text-color)",
                }}
              >
                Awards & Recognition
              </h2>
              <p
                className="text-lg max-w-3xl mx-auto"
                style={{ color: "var(--muted-text)" }}
              >
                Industry recognition for our commitment to quality,
                sustainability, and innovation
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div
                className="p-6 rounded-2xl text-center hover:shadow-xl transition-all duration-300"
                style={{ backgroundColor: "var(--card-color)" }}
              >
                <Award
                  className="h-14 w-14 mx-auto mb-4"
                  style={{ color: "var(--dark-gold-color)" }}
                />
                <h3
                  className="text-lg font-bold mb-3"
                  style={{
                    fontFamily: "var(--font-outfit)",
                    color: "var(--text-color)",
                  }}
                >
                  Good Food Awards
                </h3>
                <p
                  className="mb-3 text-sm"
                  style={{ color: "var(--muted-text)" }}
                >
                  Winner 2022, 2023, 2024
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--muted-text)" }}
                >
                  Recognized for exceptional taste and sustainable production
                  practices in the snack food category.
                </p>
              </div>

              <div
                className="p-6 rounded-2xl text-center hover:shadow-xl transition-all duration-300"
                style={{ backgroundColor: "var(--card-color)" }}
              >
                <Star
                  className="h-14 w-14 mx-auto mb-4"
                  style={{ color: "var(--dark-gold-color)" }}
                />
                <h3
                  className="text-lg font-bold mb-3"
                  style={{
                    fontFamily: "var(--font-outfit)",
                    color: "var(--text-color)",
                  }}
                >
                  B-Corp Certification
                </h3>
                <p
                  className="mb-3 text-sm"
                  style={{ color: "var(--muted-text)" }}
                >
                  Certified 2024
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--muted-text)" }}
                >
                  Meets highest standards of social and environmental
                  performance, accountability, and transparency.
                </p>
              </div>

              <div
                className="p-6 rounded-2xl text-center hover:shadow-xl transition-all duration-300"
                style={{ backgroundColor: "var(--card-color)" }}
              >
                <TrendingUp
                  className="h-14 w-14 mx-auto mb-4"
                  style={{ color: "var(--dark-gold-color)" }}
                />
                <h3
                  className="text-lg font-bold mb-3"
                  style={{
                    fontFamily: "var(--font-outfit)",
                    color: "var(--text-color)",
                  }}
                >
                  Inc. 5000 Fastest Growing
                </h3>
                <p
                  className="mb-3 text-sm"
                  style={{ color: "var(--muted-text)" }}
                >
                  Ranked #247 in 2024
                </p>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--muted-text)" }}
                >
                  Recognized for exceptional growth and innovation in the food
                  and beverage industry.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Gradient>
  );
};

export default AboutUs;
