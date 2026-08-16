import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";

export default function SecuritySettings() {

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [saving, setSaving] = useState(false);


  const handleChangePassword = async () => {

    if (!currentPassword || !newPassword || !confirmPassword) {

      toast.error("Please fill all password fields.");

      return;
    }


    if (newPassword.length < 6) {

      toast.error(
        "New password must be at least 6 characters."
      );

      return;
    }


    if (newPassword !== confirmPassword) {

      toast.error(
        "New password and confirmation do not match."
      );

      return;
    }


    try {

      setSaving(true);

      const response =
        await api.put(
          "/auth/change-password",
          {
            currentPassword,
            newPassword,
          }
        );


      if (response.data.success) {

        toast.success(
          "Password changed successfully."
        );

        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");

      }

    } catch (error) {

      console.error(
        "Change password error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
        "Failed to change password."
      );

    } finally {

      setSaving(false);

    }

  };


  return (

    <div className="dashboard-panel">

      <h3>Security</h3>

      <div className="settings-form">

        <label>
          Current Password
        </label>

        <input
          type="password"
          value={currentPassword}
          onChange={(e) =>
            setCurrentPassword(
              e.target.value
            )
          }
          placeholder="Enter current password"
        />


        <label>
          New Password
        </label>

        <input
          type="password"
          value={newPassword}
          onChange={(e) =>
            setNewPassword(
              e.target.value
            )
          }
          placeholder="Enter new password"
        />


        <label>
          Confirm Password
        </label>

        <input
          type="password"
          value={confirmPassword}
          onChange={(e) =>
            setConfirmPassword(
              e.target.value
            )
          }
          placeholder="Confirm new password"
        />


        <button
          className="create-btn"
          onClick={handleChangePassword}
          disabled={saving}
        >
          {saving
            ? "Changing..."
            : "Change Password"}
        </button>

      </div>

    </div>

  );
}