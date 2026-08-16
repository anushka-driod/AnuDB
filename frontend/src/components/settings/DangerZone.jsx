import { useState } from "react";
import toast from "react-hot-toast";
import api from "../../services/api";

export default function DangerZone() {

  const [deleting, setDeleting] = useState(false);

  const handleDeleteAccount = async () => {

    const confirmed = window.confirm(
      "Are you sure you want to permanently delete your account?\n\nAll your databases, tables, records and APIs will be deleted.\n\nThis action cannot be undone."
    );

    if (!confirmed) {
      return;
    }

    try {

      setDeleting(true);

      const response = await api.delete(
        "/auth/account"
      );

      if (response.data.success) {

        toast.success(
          "Account deleted successfully."
        );

        // Remove authentication data
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("profileImage");
        localStorage.removeItem("theme");

        // Send user back to login
        window.location.href = "/login";
      }

    } catch (error) {

      console.error(
        "Delete account error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
        "Failed to delete account."
      );

    } finally {

      setDeleting(false);

    }

  };


  return (

    <div className="dashboard-panel">

      <h3 style={{ color: "#EF4444" }}>
        Danger Zone
      </h3>

      <p>
        Deleting your account will permanently remove
        all databases, tables and records.
      </p>

      <button
        className="delete-btn"
        onClick={handleDeleteAccount}
        disabled={deleting}
      >
        {deleting
          ? "Deleting..."
          : "Delete Account"}
      </button>

    </div>

  );
}