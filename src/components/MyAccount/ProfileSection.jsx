import React, { useState } from "react";
import { Camera, Edit3, Save, X } from "lucide-react";

const ProfileSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    birthDate: "1990-05-15",
    bio: "Passionate about tech and minimalist design. Love discovering new products and brands.",
  });

  const handleSave = () => {
    setIsEditing(false);
    // Save logic here
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="gradient-header rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="relative flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span
                  className="text-2xl font-bold"
                  style={{ fontFamily: "var(--font-outfit)" }}
                >
                  JD
                </span>
              </div>
              <button
                className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
                style={{ color: "var(--text-color)" }}
              >
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div>
              <h1
                className="text-3xl font-bold"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                John Doe
              </h1>
              <p className="text-blue-100 text-lg">Premium Member since 2020</p>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 px-6 py-3 rounded-xl flex items-center space-x-2 transition-colors"
          >
            {isEditing ? (
              <X className="w-5 h-5" />
            ) : (
              <Edit3 className="w-5 h-5" />
            )}
            <span>{isEditing ? "Cancel" : "Edit Profile"}</span>
          </button>
        </div>
      </div>

      {/* Profile Form */}
      <div className="card-bg rounded-2xl p-8">
        <h2
          className="text-2xl font-bold primary-text mb-6"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          Personal Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium primary-text mb-2">
              First Name
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              disabled={!isEditing}
              className="w-full input-field px-4 py-3 rounded-xl transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium primary-text mb-2">
              Last Name
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              disabled={!isEditing}
              className="w-full input-field px-4 py-3 rounded-xl transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium primary-text mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              disabled={!isEditing}
              className="w-full input-field px-4 py-3 rounded-xl transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium primary-text mb-2">
              Phone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              disabled={!isEditing}
              className="w-full input-field px-4 py-3 rounded-xl transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium primary-text mb-2">
              Birth Date
            </label>
            <input
              type="date"
              value={formData.birthDate}
              onChange={(e) =>
                setFormData({ ...formData, birthDate: e.target.value })
              }
              disabled={!isEditing}
              className="w-full input-field px-4 py-3 rounded-xl transition-colors"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium primary-text mb-2">
            Bio
          </label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            disabled={!isEditing}
            rows={4}
            className="w-full input-field px-4 py-3 rounded-xl transition-colors resize-none"
            placeholder="Tell us a bit about yourself..."
          />
        </div>

        {isEditing && (
          <div className="mt-8 flex justify-end space-x-4">
            <button
              onClick={() => setIsEditing(false)}
              className="secondary-button px-6 py-3 rounded-xl"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="primary-button px-6 py-3 rounded-xl flex items-center space-x-2"
            >
              <Save className="w-5 h-5" />
              <span>Save Changes</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileSection;
