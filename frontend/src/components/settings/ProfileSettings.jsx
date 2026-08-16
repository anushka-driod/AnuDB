import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";

export default function ProfileSettings() {

  const [profile, setProfile] = useState({
    full_name: "",
    email: "",
    phone: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ===============================
  // Load Profile
  // ===============================
  useEffect(() => {

    const loadProfile = async () => {

      try {

        const response =
          await api.get("/auth/profile");

        if (response.data.success) {

          const user = response.data.user;

          setProfile({
            full_name: user.full_name || "",
            email: user.email || "",
            phone: user.phone || "",
          });

        }

      } catch (error) {

        console.error(error);

        toast.error(
          error.response?.data?.message ||
          "Failed to load profile."
        );

      } finally {

        setLoading(false);

      }

    };

    loadProfile();

  }, []);


  // ===============================
  // Save Profile
  // ===============================
  const handleSave = async () => {

    if (!profile.full_name.trim()) {

      toast.error("Full name is required.");

      return;
    }

    try {

      setSaving(true);

      const response =
        await api.put(
          "/auth/profile",
          {
            fullName: profile.full_name,
            phone: profile.phone,
          }
        );

      if (response.data.success) {

        const user = response.data.user;

        setProfile({
          full_name: user.full_name || "",
          email: user.email || "",
          phone: user.phone || "",
        });

        toast.success(
          "Profile updated successfully."
        );

      }

    } catch (error) {

      console.error(
        "Profile update error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
        "Failed to update profile."
      );

    } finally {

      setSaving(false);

    }

  };


  if (loading) {

    return (
      <div className="dashboard-panel">

        <h3>Profile</h3>

        <p>Loading profile...</p>

      </div>
    );

  }


  return (

    <div className="dashboard-panel">

      <h3>Profile</h3>

      <div className="settings-form">

        <label>Full Name</label>

        <input
          value={profile.full_name}
          onChange={(e) =>
            setProfile({
              ...profile,
              full_name: e.target.value,
            })
          }
        />


        <label>Email Address</label>

        <input
          value={profile.email}
          disabled
        />


        <label>Phone Number</label>

        <input
          value={profile.phone}
          onChange={(e) =>
            setProfile({
              ...profile,
              phone: e.target.value,
            })
          }
          placeholder="+91 XXXXX XXXXX"
        />


        <button
          className="create-btn"
          onClick={handleSave}
          disabled={saving}
        >
          {saving
            ? "Saving..."
            : "Save Changes"}
        </button>

      </div>

    </div>

  );

}