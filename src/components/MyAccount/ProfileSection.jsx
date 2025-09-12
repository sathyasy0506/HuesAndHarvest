import React, { useState, useEffect } from "react";
import { Camera, Edit3, Save, X } from "lucide-react";

const BASE_URL = "https://admin.huesandharvest.com/api/";

const ProfileSection = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [currentPassword, setCurrentPassword] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ Fetch profile data on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("hh_token");
        if (!token) return;

        const res = await fetch(`${BASE_URL}profile.php`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (data.success) {
          setFormData({
            firstName: data.user.first_name || "",
            lastName: data.user.last_name || "",
            email: data.user.email || "",
          });
          setProfilePhoto(data.user.avatar || null);
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ✅ Handle Save (update-profile.php)
  // ✅ Handle Save (update-profile.php)
  const handleSave = async () => {
    if (!currentPassword) {
      alert("Please enter your password to update profile.");
      return;
    }

    try {
      const token = localStorage.getItem("hh_token");
      const formDataToSend = new FormData();
      formDataToSend.append("first_name", formData.firstName);
      formDataToSend.append("last_name", formData.lastName);
      formDataToSend.append("password", currentPassword);

      if (profilePhoto instanceof File) {
        formDataToSend.append("avatar", profilePhoto);
      }

      const res = await fetch(`${BASE_URL}update-profile.php`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // ✅ secure with JWT
        },
        body: formDataToSend,
      });

      const data = await res.json();
      if (data.success) {
        alert("Profile updated successfully!");
        setIsEditing(false);
        setCurrentPassword(""); // ✅ Clear password after success
        setFormData({
          firstName: data.user.first_name,
          lastName: data.user.last_name,
          email: data.user.email,
        });
        setProfilePhoto(data.user.avatar);
      } else {
        alert(data.message || "Profile update failed");
      }
    } catch (err) {
      console.error("Update error:", err);
      alert("Error updating profile");
    }
  };

  // ✅ Handle Photo Change (store File for upload)
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePhoto(file); // keep actual File for upload
    }
  };

  if (loading) {
    return <p className="text-center">Loading profile...</p>;
  }

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
                    src={
                      profilePhoto instanceof File
                        ? URL.createObjectURL(profilePhoto)
                        : profilePhoto
                    }
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl font-bold">MS</span>
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
              <h1 className="text-3xl font-bold">
                {formData.firstName} {formData.lastName}
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
        <h2 className="text-2xl font-bold primary-text mb-6">
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
              disabled
              className="w-full input-field px-4 py-3 rounded-xl bg-gray-100 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Confirm with Password */}
        {isEditing && (
          <div className="mt-6">
            <label className="block text-sm font-medium primary-text mb-2">
              Enter Password to Confirm Changes
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full input-field px-4 py-3 rounded-xl transition-colors"
            />
          </div>
        )}

        {isEditing && (
          <div className="mt-8 flex justify-end space-x-4">
            <button
              onClick={() => {
                setIsEditing(false);
                setCurrentPassword(""); // ✅ Clear password on cancel
              }}
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
