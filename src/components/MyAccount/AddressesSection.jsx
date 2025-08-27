import React, { useState } from "react";
import { Plus, Edit3, Trash2, Home, Briefcase, MapPin } from "lucide-react";

const AddressesSection = () => {
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "home",
      label: "Home",
      name: "John Doe",
      street: "123 Main Street",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
      isDefault: true,
    },
    {
      id: 2,
      type: "work",
      label: "Work",
      name: "John Doe",
      street: "456 Business Ave",
      city: "New York",
      state: "NY",
      zip: "10002",
      country: "United States",
      isDefault: false,
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const getAddressIcon = (type) => {
    switch (type) {
      case "home":
        return <Home className="w-5 h-5" />;
      case "work":
        return <Briefcase className="w-5 h-5" />;
      default:
        return <MapPin className="w-5 h-5" />;
    }
  };

  const AddressForm = ({ address, onSave, onCancel }) => {
    const [formData, setFormData] = useState(
      address || {
        type: "home",
        label: "",
        name: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        country: "United States",
        isDefault: false,
      }
    );

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
          {address ? "Edit Address" : "Add New Address"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium primary-text mb-2">
                Address Type
              </label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value })
                }
                className="w-full input-field px-4 py-3 rounded-xl"
              >
                <option value="home">Home</option>
                <option value="work">Work</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium primary-text mb-2">
                Label
              </label>
              <input
                type="text"
                value={formData.label}
                onChange={(e) =>
                  setFormData({ ...formData, label: e.target.value })
                }
                className="w-full input-field px-4 py-3 rounded-xl"
                placeholder="e.g., Home, Work, Mom's House"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium primary-text mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full input-field px-4 py-3 rounded-xl"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium primary-text mb-2">
              Street Address
            </label>
            <input
              type="text"
              value={formData.street}
              onChange={(e) =>
                setFormData({ ...formData, street: e.target.value })
              }
              className="w-full input-field px-4 py-3 rounded-xl"
              required
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium primary-text mb-2">
                City
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className="w-full input-field px-4 py-3 rounded-xl"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium primary-text mb-2">
                State
              </label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) =>
                  setFormData({ ...formData, state: e.target.value })
                }
                className="w-full input-field px-4 py-3 rounded-xl"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium primary-text mb-2">
                ZIP Code
              </label>
              <input
                type="text"
                value={formData.zip}
                onChange={(e) =>
                  setFormData({ ...formData, zip: e.target.value })
                }
                className="w-full input-field px-4 py-3 rounded-xl"
                required
              />
            </div>
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
              Set as default address
            </label>
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
              {address ? "Update Address" : "Add Address"}
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
              Addresses
            </h1>
            <p className="muted-text mt-2">Manage your delivery addresses</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center space-x-2 primary-button px-6 py-3 rounded-xl"
          >
            <Plus className="w-5 h-5" />
            <span>Add Address</span>
          </button>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <AddressForm
          address={editingId ? addresses.find((a) => a.id === editingId) : null}
          onSave={(data) => {
            if (editingId) {
              setAddresses(
                addresses.map((a) =>
                  a.id === editingId ? { ...a, ...data } : a
                )
              );
            } else {
              setAddresses([...addresses, { ...data, id: Date.now() }]);
            }
            setShowForm(false);
            setEditingId(null);
          }}
          onCancel={() => {
            setShowForm(false);
            setEditingId(null);
          }}
        />
      )}

      {/* Addresses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((address) => (
          <div
            key={address.id}
            className={`card-bg rounded-2xl p-6 transition-all hover:shadow-md ${
              address.isDefault ? "ring-1 ring-opacity-20" : ""
            }`}
            style={{
              borderColor: address.isDefault
                ? "var(--accent-color)"
                : "var(--border-color)",
              backgroundColor: address.isDefault
                ? "rgba(107, 174, 143, 0.05)"
                : "var(--card-color)",
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div
                  className={`p-2 rounded-lg ${
                    address.isDefault ? "text-white" : "muted-text"
                  }`}
                  style={{
                    backgroundColor: address.isDefault
                      ? "var(--accent-color)"
                      : "var(--secondary-bg)",
                  }}
                >
                  {getAddressIcon(address.type)}
                </div>
                <div>
                  <h3 className="font-semibold primary-text">
                    {address.label}
                  </h3>
                  {address.isDefault && (
                    <span
                      className="text-xs px-2 py-1 rounded-full"
                      style={{
                        backgroundColor: "rgba(107, 174, 143, 0.1)",
                        color: "var(--accent-color)",
                      }}
                    >
                      Default
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    setEditingId(address.id);
                    setShowForm(true);
                  }}
                  className="p-2 rounded-lg transition-colors"
                  style={{ color: "var(--muted-text)" }}
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  className="p-2 rounded-lg transition-colors"
                  style={{ color: "var(--error-color)" }}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="primary-text space-y-1">
              <p className="font-medium">{address.name}</p>
              <p>{address.street}</p>
              <p>
                {address.city}, {address.state} {address.zip}
              </p>
              <p>{address.country}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddressesSection;
