import React, { useState } from 'react';
import { Plus, Edit3, Trash2, CreditCard, Shield } from 'lucide-react';

const PaymentMethodsSection = () => {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      type: 'visa',
      last4: '4242',
      expiryMonth: '12',
      expiryYear: '2026',
      holderName: 'John Doe',
      isDefault: true
    },
    {
      id: 2,
      type: 'mastercard',
      last4: '8888',
      expiryMonth: '08',
      expiryYear: '2025',
      holderName: 'John Doe',
      isDefault: false
    }
  ]);

  const [showForm, setShowForm] = useState(false);

  const getCardIcon = (type) => {
    return <CreditCard className="w-8 h-8" />;
  };

  const getCardBrandColor = (type) => {
    switch (type) {
      case 'visa':
        return 'bg-gradient-to-r from-blue-600 to-blue-800';
      case 'mastercard':
        return 'bg-gradient-to-r from-red-600 to-orange-600';
      case 'amex':
        return 'bg-gradient-to-r from-green-600 to-teal-600';
      default:
        return 'bg-gradient-to-r from-gray-600 to-gray-800';
    }
  };

  const PaymentForm = ({ onSave, onCancel }) => {
    const [formData, setFormData] = useState({
      cardNumber: '',
      expiryMonth: '',
      expiryYear: '',
      cvv: '',
      holderName: '',
      isDefault: false
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
    };

    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Add Payment Method</h3>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
            <input
              type="text"
              value={formData.cardNumber}
              onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="1234 5678 9012 3456"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Month</label>
              <select
                value={formData.expiryMonth}
                onChange={(e) => setFormData({ ...formData, expiryMonth: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">MM</option>
                {Array.from({ length: 12 }, (_, i) => i + 1).map(month => (
                  <option key={month} value={month.toString().padStart(2, '0')}>
                    {month.toString().padStart(2, '0')}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
              <select
                value={formData.expiryYear}
                onChange={(e) => setFormData({ ...formData, expiryYear: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">YYYY</option>
                {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map(year => (
                  <option key={year} value={year.toString()}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
              <input
                type="text"
                value={formData.cvv}
                onChange={(e) => setFormData({ ...formData, cvv: e.target.value })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="123"
                maxLength={4}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
            <input
              type="text"
              value={formData.holderName}
              onChange={(e) => setFormData({ ...formData, holderName: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isDefault"
              checked={formData.isDefault}
              onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
              className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="isDefault" className="ml-3 text-sm text-gray-700">
              Set as default payment method
            </label>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start space-x-3">
            <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <p className="font-medium">Your payment information is secure</p>
              <p>We use industry-standard encryption to protect your data.</p>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-6 py-3 border border-gray-200 text-gray-600 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
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
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Payment Methods</h1>
            <p className="text-gray-500 mt-2">Manage your payment methods securely</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
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
            const type = data.cardNumber.startsWith('4') ? 'visa' : 'mastercard';

            setPaymentMethods([...paymentMethods, {
              id: Date.now(),
              type,
              last4,
              expiryMonth: data.expiryMonth,
              expiryYear: data.expiryYear,
              holderName: data.holderName,
              isDefault: data.isDefault
            }]);
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
            className={`relative rounded-2xl p-6 text-white overflow-hidden ${getCardBrandColor(method.type)}`}
          >
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>

            <div className="relative">
              <div className="flex items-center justify-between mb-8">
                <div className="text-white">
                  {getCardIcon(method.type)}
                </div>
                <div className="text-right">
                  <p className="text-sm opacity-90 uppercase tracking-wider">{method.type}</p>
                  {method.isDefault && (
                    <span className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">Default</span>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <p className="text-2xl font-mono tracking-wider">•••• •••• •••• {method.last4}</p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Cardholder</p>
                  <p className="font-semibold">{method.holderName}</p>
                </div>
                <div>
                  <p className="text-sm opacity-90">Expires</p>
                  <p className="font-semibold">{method.expiryMonth}/{method.expiryYear}</p>
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
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No payment methods</h3>
          <p className="text-gray-500 mb-6">Add a payment method to make checkout faster and easier.</p>
          <button
            onClick={() => setShowForm(true)}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            Add Your First Payment Method
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodsSection;
