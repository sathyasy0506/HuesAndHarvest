import React, { useState, useEffect } from "react";
import { Plus, Edit3, Trash2, Home, Briefcase, MapPin } from "lucide-react";
import { showToast } from "../Common/Toaster"; // ✅ import this
import { ENDPOINTS } from "../../api/api";

const AddressesSection = () => {
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch addresses on component mount
  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const token = localStorage.getItem("hh_token");
      if (!token) return;

      const res = await fetch(ENDPOINTS.ADDRESSES(), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (data.success) {
        const normalized = (data.addresses || []).map((a) => ({
          ...a,
          is_default: a.is_default == 1, // convert "1"/1 to true, "0"/0 to false
        }));
        setAddresses(normalized);
      }
    } catch (err) {
      console.error("Error fetching addresses:", err);
    } finally {
      setLoading(false);
    }
  };

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

  const handleSaveAddress = async (formData) => {
    try {
      const token = localStorage.getItem("hh_token");
      if (!token) {
        showToast("Please log in to save address", "error");
        return;
      }

      const url = ENDPOINTS.ADDRESSES();

      // Use POST for both create and update with action parameter
      const payload = editingId
        ? { action: "update", id: editingId, ...formData }
        : { action: "create", ...formData };

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        await fetchAddresses(); // Refresh the list
        setShowForm(false);
        setEditingId(null);
        showToast(
          editingId
            ? "Address updated successfully!"
            : "Address added successfully!",
          "success"
        );
      } else {
        showToast(data.message || "Failed to save address", "error");
      }
    } catch (err) {
      console.error("Error saving address:", err);
      showToast("Error saving address", "error");
    }
  };

  const handleDeleteAddress = async (addressId) => {
    if (!confirm("Are you sure you want to delete this address?")) {
      return;
    }

    try {
      const token = localStorage.getItem("hh_token");
      // Use POST with delete action
      const res = await fetch(ENDPOINTS.ADDRESSES(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ action: "delete", id: addressId }),
      });

      const data = await res.json();
      if (data.success) {
        await fetchAddresses(); // Refresh the list
        showToast("Address deleted successfully!", "success");
      } else {
        showToast(data.message || "Failed to delete address", "error");
      }
    } catch (err) {
      console.error("Error deleting address:", err);
      showToast("Error deleting address", "error");
    }
  };

  const AddressForm = ({ address, onSave, onCancel }) => {
    // FIXED: Properly convert database is_default (0/1) to React isDefault (true/false)
    const [formData, setFormData] = useState(
      address
        ? {
            type: address.type || "home",
            label: address.label || "",
            first_name: address.first_name || "",
            last_name: address.last_name || "",
            address: address.address || "",
            city: address.city || "",
            state: address.state || "",
            pin_code: address.pin_code || "",
            country: address.country || "India",
            phone: address.phone || "",
            isDefault: !!address.is_default, // double-bang to ensure boolean
          }
        : {
            type: "home",
            label: "",
            first_name: "",
            last_name: "",
            address: "",
            city: "",
            state: "",
            pin_code: "",
            country: "India",
            phone: "",
            isDefault: false,
          }
    );

    const [pincodeLoading, setPincodeLoading] = useState(false);

    // Fetch city/state from pincode
    const fetchPincodeDetails = async (pincode) => {
      if (pincode.length !== 6) return;

      setPincodeLoading(true);
      try {
        const res = await fetch(ENDPOINTS.PINCODE(), {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pincode }),
        });

        const data = await res.json();
        if (data.status === "success") {
          setFormData((prev) => ({
            ...prev,
            city: data.city || "",
            state: data.state || "",
          }));
        }
      } catch (error) {
        console.error("Error fetching pincode details:", error);
      } finally {
        setPincodeLoading(false);
      }
    };

    const handleInputChange = (e) => {
      const { name, value, type, checked } = e.target;

      if (name === "pin_code") {
        const numericValue = value.replace(/\D/g, "").slice(0, 6);
        setFormData((prev) => ({ ...prev, pin_code: numericValue }));

        if (numericValue.length === 6) {
          fetchPincodeDetails(numericValue);
        }
        return;
      }

      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    };

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
                name="type"
                value={formData.type}
                onChange={handleInputChange}
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
                name="label"
                value={formData.label}
                onChange={handleInputChange}
                className="w-full input-field px-4 py-3 rounded-xl"
                placeholder="e.g., Home, Work, Mom's House"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium primary-text mb-2">
                First Name *
              </label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                className="w-full input-field px-4 py-3 rounded-xl"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium primary-text mb-2">
                Last Name *
              </label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                className="w-full input-field px-4 py-3 rounded-xl"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium primary-text mb-2">
              Street Address *
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full input-field px-4 py-3 rounded-xl"
              required
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium primary-text mb-2">
                PIN Code *
              </label>
              <input
                type="text"
                name="pin_code"
                value={formData.pin_code}
                onChange={handleInputChange}
                className="w-full input-field px-4 py-3 rounded-xl"
                maxLength={6}
                required
              />
              {pincodeLoading && (
                <p className="text-xs text-gray-500 mt-1">
                  Fetching details...
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium primary-text mb-2">
                City *
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full input-field px-4 py-3 rounded-xl"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium primary-text mb-2">
                State *
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full input-field px-4 py-3 rounded-xl"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium primary-text mb-2">
                Phone *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full input-field px-4 py-3 rounded-xl"
                required
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isDefault"
              name="isDefault"
              checked={formData.isDefault}
              onChange={handleInputChange}
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

  if (loading) {
    return <div className="text-center py-8">Loading addresses...</div>;
  }

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
          onSave={handleSaveAddress}
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
              address.is_default ? "ring-1 ring-opacity-20" : ""
            }`}
            style={{
              borderColor: address.is_default
                ? "var(--accent-color)"
                : "var(--border-color)",
              backgroundColor: address.is_default
                ? "rgba(107, 174, 143, 0.05)"
                : "var(--card-color)",
            }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div
                  className={`p-2 rounded-lg ${
                    address.is_default ? "text-white" : "muted-text"
                  }`}
                  style={{
                    backgroundColor: address.is_default
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
                  {address.is_default && (
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
                  className="p-2 rounded-lg transition-colors hover:bg-gray-100"
                  style={{ color: "var(--muted-text)" }}
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteAddress(address.id)}
                  className="p-2 rounded-lg transition-colors hover:bg-red-50"
                  style={{ color: "var(--error-color)" }}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="primary-text space-y-1">
              <p className="font-medium">
                {address.first_name} {address.last_name}
              </p>
              <p>{address.address}</p>
              <p>
                {address.city}, {address.state} {address.pin_code}
              </p>
              <p>{address.country}</p>
              <p className="text-sm muted-text">Phone: {address.phone}</p>
            </div>
          </div>
        ))}
      </div>

      {addresses.length === 0 && !showForm && (
        <div className="text-center py-12">
          <MapPin className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium primary-text mb-2">
            No addresses yet
          </h3>
          <p className="muted-text mb-6">
            Add your first address to get started
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="primary-button px-6 py-3 rounded-xl"
          >
            Add Your First Address
          </button>
        </div>
      )}
    </div>
  );
};

export default AddressesSection;
