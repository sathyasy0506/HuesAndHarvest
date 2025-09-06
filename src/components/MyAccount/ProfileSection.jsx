import React, { useState } from "react";
import { Camera, Edit3, Save, X } from "lucide-react";

const ProfileSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "Madhav",
    lastName: "Sreekumar",
    email: "madhav.sreekumar@example.com",
    phone: "+1 (555) 123-4567",
    birthDate: "1990-05-15",
    bio: "Passionate about tech and minimalist design. Love discovering new products and brands.",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSave = () => {
    if (
      passwordData.newPassword &&
      passwordData.newPassword !== passwordData.confirmPassword
    ) {
      alert("New password and confirm password do not match!");
      return;
    }
    setIsEditing(false);
    // TODO: Save logic here, e.g., API call
    console.log("Profile Data:", formData);
    console.log("Password Data:", passwordData);
    console.log("Profile Photo:", profilePhoto);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(URL.createObjectURL(file));
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="gradient-header rounded-2xl p-8 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="relative flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center overflow-hidden">
                {profilePhoto ? (
                  <img
                    src={profilePhoto}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span
                    className="text-2xl font-bold"
                    style={{ fontFamily: "var(--font-outfit)" }}
                  >
                    MS
                  </span>
                )}
              </div>
              {isEditing && (
                <label className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-gray-50 cursor-pointer transition-colors">
                  <Camera className="w-4 h-4" />
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handlePhotoChange}
                  />
                </label>
              )}
            </div>
            <div>
              <h1
                className="text-3xl font-bold"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                {formData.firstName}
              </h1>
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
      <div className="card-bg rounded-2xl p-8 space-y-6">
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
        </div>

        {/* Change Password Section */}
        {isEditing && (
          <div className="mt-6">
            <h2
              className="text-2xl font-bold primary-text mb-4"
              style={{ fontFamily: "var(--font-outfit)" }}
            >
              Change Password
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium primary-text mb-2">
                  Old Password
                </label>
                <input
                  type="password"
                  value={passwordData.oldPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      oldPassword: e.target.value,
                    })
                  }
                  className="w-full input-field px-4 py-3 rounded-xl transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium primary-text mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                  className="w-full input-field px-4 py-3 rounded-xl transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium primary-text mb-2">
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full input-field px-4 py-3 rounded-xl transition-colors"
                />
              </div>
            </div>
          </div>
        )}

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
