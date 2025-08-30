import React, { useState } from "react";
import { Plus, Edit3, Trash2, CreditCard, Shield } from "lucide-react";

const PaymentMethodsSection = () => {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: "visa",
      last4: "4242",
      expiryMonth: "12",
      expiryYear: "2026",
      holderName: "John Doe",
      isDefault: true,
    },
    {
      id: 2,
      type: "mastercard",
      last4: "8888",
      expiryMonth: "08",
      expiryYear: "2025",
      holderName: "John Doe",
      isDefault: false,
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const getCardIcon = (type) => {
    return <CreditCard className="w-8 h-8" />;
  };

  const getCardBrandColor = (type) => {
    switch (type) {
      case "visa":
        return "bg-gradient-to-r from-blue-600 to-blue-800";
      case "mastercard":
        return "bg-gradient-to-r from-red-600 to-orange-600";
      case "amex":
        return "bg-gradient-to-r from-green-600 to-teal-600";
      default:
        return "bg-gradient-to-r from-gray-600 to-gray-800";
    }
  };

  const PaymentForm = ({ onSave, onCancel }) => {
    const [formData, setFormData] = useState({
      cardNumber: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
      holderName: "",
      isDefault: false,
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
    };

    return (
      <div className="card-bg rounded-2xl p-6">
        <h3
          className="text-xl font-semibold primary-text mb-6"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          Add Payment Method
        </h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium primary-text mb-2">
              Card Number
            </label>
            <input
              type="text"
              value={formData.cardNumber}
              onChange={(e) =>
                setFormData({ ...formData, cardNumber: e.target.value })
              }
              className="w-full input-field px-4 py-3 rounded-xl"
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium primary-text mb-2">
                Month
              </label>
              <select
                value={formData.expiryMonth}
                onChange={(e) =>
                  setFormData({ ...formData, expiryMonth: e.target.value })
                }
                className="w-full input-field px-4 py-3 rounded-xl"
                required
              >
                <option value="">MM</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                  <option key={month} value={month.toString().padStart(2, "0")}>
                    {month.toString().padStart(2, "0")}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium primary-text mb-2">
                Year
              </label>
              <select
                value={formData.expiryYear}
                onChange={(e) =>
                  setFormData({ ...formData, expiryYear: e.target.value })
                }
                className="w-full input-field px-4 py-3 rounded-xl"
                required
              >
                <option value="">YYYY</option>
                {Array.from(
                  { length: 10 },
                  (_, i) => new Date().getFullYear() + i
                ).map((year) => (
                  <option key={year} value={year.toString()}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium primary-text mb-2">
                CVV
              </label>
              <input
                type="text"
                value={formData.cvv}
                onChange={(e) =>
                  setFormData({ ...formData, cvv: e.target.value })
                }
                className="w-full input-field px-4 py-3 rounded-xl"
                placeholder="123"
                maxLength={4}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium primary-text mb-2">
              Cardholder Name
            </label>
            <input
              type="text"
              value={formData.holderName}
              onChange={(e) =>
                setFormData({ ...formData, holderName: e.target.value })
              }
              className="w-full input-field px-4 py-3 rounded-xl"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isDefault"
              checked={formData.isDefault}
              onChange={(e) =>
                setFormData({ ...formData, isDefault: e.target.checked })
              }
              className="w-5 h-5 rounded"
              style={{ color: "var(--accent-color)" }}
            />
            <label htmlFor="isDefault" className="ml-3 text-sm primary-text">
              Set as default payment method
            </label>
          </div>

          <div
            className="p-4 rounded-xl flex items-start space-x-3"
            style={{
              backgroundColor: "rgba(107, 174, 143, 0.1)",
              border: "1px solid var(--accent-color)",
            }}
          >
            <Shield
              className="w-5 h-5 mt-0.5 flex-shrink-0"
              style={{ color: "var(--accent-color)" }}
            />
            <div className="text-sm" style={{ color: "var(--accent-color)" }}>
              <p className="font-medium">Your payment information is secure</p>
              <p>We use industry-standard encryption to protect your data.</p>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="secondary-button px-6 py-3 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="primary-button px-6 py-3 rounded-xl"
            >
              Add Payment Method
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="card-bg rounded-2xl p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1
              className="text-3xl font-bold primary-text"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Payment Methods
            </h1>
            <p className="muted-text mt-2">
              Manage your payment methods securely
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2 primary-button px-6 py-3 rounded-xl"
          >
            <Plus className="w-5 h-5" />
            <span>Add Payment Method</span>
          </button>
        </div>
      </div>

      {/* Add Form */}
      {showForm && (
        <PaymentForm
          onSave={(data) => {
            const last4 = data.cardNumber.slice(-4);
            const type = data.cardNumber.startsWith("4")
              ? "visa"
              : "mastercard";

            setPaymentMethods([
              ...paymentMethods,
              {
                id: Date.now(),
                type,
                last4,
                expiryMonth: data.expiryMonth,
                expiryYear: data.expiryYear,
                holderName: data.holderName,
                isDefault: data.isDefault,
              },
            ]);
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Payment Methods Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`relative rounded-2xl p-6 text-white overflow-hidden ${getCardBrandColor(
              method.type
            )}`}
          >
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>

            <div className="relative">
              <div className="flex items-center justify-between mb-8">
                <div className="text-white">{getCardIcon(method.type)}</div>
                <div className="text-right">
                  <p className="text-sm opacity-90 uppercase tracking-wider">
                    {method.type}
                  </p>
                  {method.isDefault && (
                    <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
                      Default
                    </span>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <p className="text-2xl font-mono tracking-wider">
                  •••• •••• •••• {method.last4}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Cardholder</p>
                  <p className="font-semibold">{method.holderName}</p>
                </div>
                <div>
                  <p className="text-sm opacity-90">Expires</p>
                  <p className="font-semibold">
                    {method.expiryMonth}/{method.expiryYear}
                  </p>
                </div>
              </div>

              <div className="flex justify-end space-x-2 mt-4">
                <button className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors">
                  <Edit3 className="w-4 h-4" />
                </button>
                <button className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {paymentMethods.length === 0 && (
        <div className="card-bg rounded-2xl p-12 text-center">
          <CreditCard
            className="w-16 h-16 mx-auto mb-4"
            style={{ color: "var(--muted-text)" }}
          />
          <h3 className="text-xl font-semibold primary-text mb-2">
            No payment methods
          </h3>
          <p className="muted-text mb-6">
            Add a payment method to make checkout faster and easier.
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="primary-button px-6 py-3 rounded-xl"
          >
            Add Your First Payment Method
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodsSection;
