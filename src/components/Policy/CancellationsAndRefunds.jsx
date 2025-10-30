import { motion } from "framer-motion";
import {
  XCircle,
  RotateCcw,
  DollarSign,
  Clock,
  PackageX,
  CheckCircle,
  Mail,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";

const CancellationsAndRefunds = () => {
  const sections = [
    {
      title: "Overview",
      icon: RotateCcw,
      content:
        "Our Cancellations and Refunds Policy outlines the conditions under which you may cancel an order or request a refund. We aim to make this process transparent and hassle-free while ensuring fairness to both customers and our business.",
    },
    {
      title: "Order Cancellations",
      icon: XCircle,
      content:
        "You may cancel your order within a limited timeframe after placing it, as long as it hasn’t been shipped. Once the order has been processed or dispatched, cancellation requests may not be accepted.",
      bullets: [
        "To cancel your order, contact our support team immediately with your order ID.",
        "Orders cancelled before dispatch will receive a full refund.",
        "Once shipped, orders cannot be cancelled and must follow the return process.",
      ],
    },
    {
      title: "Return Eligibility",
      icon: PackageX,
      content:
        "Products are eligible for return only if they meet the following conditions:",
      bullets: [
        "The product is unused, unopened, and in its original packaging.",
        "The return request is initiated within the return window mentioned on the product page.",
        "The product is not part of a non-returnable category (such as perishable or hygiene-related items).",
      ],
    },
    {
      title: "Refund Process",
      icon: DollarSign,
      content:
        "Once your return is received and inspected, we will notify you of the approval or rejection of your refund. If approved, the refund will be processed automatically to your original payment method within 5–10 business days.",
    },
    {
      title: "Late or Missing Refunds",
      icon: Clock,
      content:
        "If you haven’t received a refund yet, first check your bank account or payment provider. It may take some time before your refund is officially reflected. If you’ve done all this and still haven’t received your refund, please contact our support team.",
    },
    {
      title: "Non-Refundable Items",
      icon: AlertTriangle,
      content:
        "Certain items cannot be returned or refunded due to their nature. These include:",
      bullets: [
        "Perishable goods (such as food items, nuts, or beverages).",
        "Personal care or hygiene products.",
        "Gift cards, downloadable products, or digital content.",
      ],
    },
    {
      title: "Exchange Policy",
      icon: CheckCircle,
      content:
        "We only replace items if they are defective, damaged, or incorrect. To request an exchange, please contact us with your order ID and photos of the received product within 48 hours of delivery.",
    },
    {
      title: "Refund Reversals",
      icon: ShieldCheck,
      content:
        "In rare cases, if we detect misuse of the cancellation or refund system, we reserve the right to reject or reverse refunds and suspend the associated account.",
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
            Cancellations & Refunds Policy
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
            For any cancellation or refund-related queries, contact us at{" "}
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

export default CancellationsAndRefunds;
