import { motion } from "framer-motion";
import {
  Truck,
  Package,
  Clock,
  MapPin,
  ShieldCheck,
  RefreshCcw,
  Mail,
  Globe,
  AlertCircle,
} from "lucide-react";

const ShippingPolicy = () => {
  const sections = [
    {
      title: "Overview",
      icon: Package,
      content:
        "Our Shipping Policy outlines how we process, ship, and deliver your orders. By placing an order on our platform, you agree to the terms described below. We aim to make your shopping experience smooth, transparent, and reliable.",
    },
    {
      title: "Processing Time",
      icon: Clock,
      content:
        "Orders are typically processed within 1–3 business days after payment confirmation. During high-demand periods, holidays, or sales, processing may take slightly longer. You will receive an email notification once your order has been shipped.",
    },
    {
      title: "Shipping Methods & Delivery Time",
      icon: Truck,
      content:
        "We partner with trusted courier services to ensure safe and timely delivery of your orders. Estimated delivery times depend on your location:",
      bullets: [
        "Local (within the same city): 1–3 business days.",
        "Domestic (within the country): 3–7 business days.",
        "International orders: 7–21 business days, depending on customs clearance.",
      ],
    },
    {
      title: "Shipping Charges",
      icon: Globe,
      content:
        "Shipping costs are calculated at checkout based on the delivery location and order weight. Free shipping may be available for orders above a specified amount, which will be mentioned during checkout or promotional offers.",
    },
    {
      title: "Tracking Your Order",
      icon: MapPin,
      content:
        "Once your order is shipped, a tracking link will be sent to your registered email or available in your account dashboard. You can use this link to track your package’s delivery status in real time.",
    },
    {
      title: "Delayed or Missing Deliveries",
      icon: AlertCircle,
      content:
        "If your order hasn’t arrived within the expected timeframe, please check your tracking details first. If there’s still an issue, contact our support team with your order ID. We’ll investigate and assist you promptly.",
    },
    {
      title: "Damaged or Lost Packages",
      icon: ShieldCheck,
      content:
        "We take utmost care in packaging and shipping your orders. However, if your package arrives damaged or is lost in transit, please reach out to us within 48 hours of delivery attempt or notification. We’ll work with our shipping partners to resolve the issue.",
    },
    {
      title: "Returns Related to Shipping",
      icon: RefreshCcw,
      content:
        "For issues related to shipping errors, such as receiving the wrong product or incomplete order, please contact us immediately. Returns or exchanges are handled in accordance with our Return & Refund Policy.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="text-4xl font-semibold text-gray-900 mb-2">
            Shipping Policy
          </h1>
          <p className="text-gray-500">Last updated: October 30, 2025</p>
        </motion.div>

        {/* Sections */}
        <div className="space-y-12">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-full bg-gray-100">
                    <Icon className="w-5 h-5 text-gray-800" />
                  </div>
                  <h2 className="text-xl font-medium text-gray-900">
                    {section.title}
                  </h2>
                </div>

                <p className="text-gray-600 leading-relaxed mb-3">
                  {section.content}
                </p>

                {section.bullets && (
                  <ul className="list-disc list-inside space-y-1 text-gray-600">
                    {section.bullets.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 pt-8 border-t border-gray-200 text-center"
        >
          <p className="text-sm text-gray-500">
            Questions about our shipping process? Contact us at{" "}
            <a
              href="mailto:support@example.com"
              className="inline-flex items-center text-gray-700 hover:text-black transition-colors"
            >
              <Mail className="w-4 h-4 mr-1" />
              support@example.com
            </a>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
