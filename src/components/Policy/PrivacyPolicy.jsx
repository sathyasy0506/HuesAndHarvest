import { motion } from "framer-motion";
import {
  Shield,
  User,
  Database,
  Globe,
  Lock,
  Bell,
  FileText,
  Mail,
  Trash2,
  Share2,
  AlertCircle,
} from "lucide-react";

const PrivacyPolicy = () => {
  const sections = [
    {
      title: "Overview",
      icon: Shield,
      content:
        "Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website or make a purchase. By using our services, you agree to the terms of this policy.",
    },
    {
      title: "Information We Collect",
      icon: Database,
      content:
        "We collect information that helps us serve you better, including:",
      bullets: [
        "Personal details such as your name, email address, phone number, and delivery address.",
        "Payment details (processed securely through our payment partners).",
        "Technical data like IP address, browser type, and device information.",
        "Behavioral data such as pages visited, items viewed, and time spent on our site.",
      ],
    },
    {
      title: "How We Use Your Information",
      icon: FileText,
      content:
        "We use your information responsibly and only for purposes such as:",
      bullets: [
        "Processing and fulfilling your orders.",
        "Providing customer support and resolving issues.",
        "Improving our website, products, and services.",
        "Sending updates, offers, and promotional messages (you can opt out anytime).",
      ],
    },
    {
      title: "Data Security",
      icon: Lock,
      content:
        "We take your privacy seriously and implement appropriate security measures to protect your personal data from unauthorized access, alteration, or destruction.",
    },
    {
      title: "Cookies and Tracking",
      icon: Globe,
      content:
        "Our website uses cookies and similar technologies to enhance user experience, analyze traffic, and provide personalized recommendations. You can manage cookie preferences in your browser settings.",
    },
    {
      title: "Sharing of Information",
      icon: Share2,
      content:
        "We do not sell or rent your personal data. We may share limited information only with trusted third-party service providers (like payment processors or logistics partners) who assist us in operating our business, under strict confidentiality agreements.",
    },
    {
      title: "Data Retention",
      icon: Trash2,
      content:
        "We retain your personal data only for as long as necessary to fulfill the purposes outlined in this policy or as required by law. Once no longer needed, it will be securely deleted or anonymized.",
    },
    {
      title: "Your Rights",
      icon: User,
      content:
        "You have full control over your personal data. You can request to:",
      bullets: [
        "Access the information we hold about you.",
        "Correct any inaccurate or outdated data.",
        "Withdraw consent or request deletion of your data.",
        "Opt out of promotional communications at any time.",
      ],
    },
    {
      title: "Policy Updates",
      icon: Bell,
      content:
        "We may update this Privacy Policy periodically to reflect changes in our practices or for legal and regulatory reasons. Updated versions will be posted on this page with the revised date.",
    },
    {
      title: "Contact Us",
      icon: Mail,
      content:
        "If you have any questions, concerns, or requests related to your personal data, please contact us at:",
      bullets: ["support@example.com"],
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
            Privacy Policy
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
            We are committed to keeping your information secure and transparent.
            For any privacy-related queries, contact us at{" "}
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

export default PrivacyPolicy;
