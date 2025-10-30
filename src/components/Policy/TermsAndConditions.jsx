import { motion } from "framer-motion";
import {
  FileText,
  ShoppingBag,
  User,
  Ban,
  Package,
  CreditCard,
  ShieldCheck,
  RefreshCcw,
  Mail,
} from "lucide-react";

const TermsAndConditions = () => {
  const sections = [
    {
      title: "Introduction",
      icon: FileText,
      content:
        "Welcome to our e-commerce platform. By accessing or purchasing from our website or app, you agree to comply with these Terms and Conditions. Please read them carefully before using our services.",
    },
    {
      title: "Use of Our Platform",
      icon: ShoppingBag,
      content:
        "Our platform is intended solely for customers seeking to browse and purchase products for personal use. You agree not to:",
      bullets: [
        "Use our platform for any fraudulent or illegal activity.",
        "Interfere with or disrupt the website’s security or operations.",
        "Copy, distribute, or modify any part of our website without permission.",
      ],
    },
    {
      title: "User Accounts",
      icon: User,
      content:
        "To make a purchase, you may be required to create an account. You are responsible for maintaining the confidentiality of your account credentials and all activities that occur under your account. Please ensure that your information is accurate and up to date.",
    },
    {
      title: "Product Information",
      icon: Package,
      content:
        "We strive to ensure that product descriptions, images, and pricing are accurate. However, errors may occasionally occur. We reserve the right to correct any errors or inaccuracies and to update information at any time without prior notice.",
    },
    {
      title: "Payments and Pricing",
      icon: CreditCard,
      content:
        "All prices are listed in the applicable currency and include taxes where required. Payment must be made in full at the time of purchase using the payment options provided. We use secure payment gateways to protect your information.",
    },
    {
      title: "Shipping and Delivery",
      icon: ShieldCheck,
      content:
        "We aim to deliver your orders promptly. Delivery times may vary depending on your location and product availability. We are not responsible for delays caused by third-party couriers or unforeseen circumstances.",
    },
    {
      title: "Returns and Refunds",
      icon: RefreshCcw,
      content:
        "If you are not satisfied with your purchase, you may request a return or refund according to our Return Policy. Products must be returned in their original condition and packaging within the specified return period.",
    },
    {
      title: "Prohibited Activities",
      icon: Ban,
      content:
        "You agree not to misuse our services or engage in any activity that could harm our platform or other users. This includes unauthorized access, spreading malware, or using automated tools to extract data.",
    },
    {
      title: "Changes to Terms",
      icon: RefreshCcw,
      content:
        "We may update these Terms and Conditions periodically. Any changes will be posted on this page with an updated revision date. Continued use of our platform after changes indicates your acceptance of the new terms.",
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
            Terms and Conditions
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
            Questions about our terms? Contact us at{" "}
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

export default TermsAndConditions;
