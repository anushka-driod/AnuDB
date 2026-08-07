import { useState, useEffect } from "react";

export default function ProfileAvatar() {

  const [image, setImage] = useState(
    localStorage.getItem("profileImage") || ""
  );

  useEffect(() => {
    if (image) {
      localStorage.setItem("profileImage", image);
    }
  }, [image]);

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="dashboard-panel">

      <h3>Profile Photo</h3>

      <div className="profile-avatar">

        {image ? (
          <img
            src={image}
            alt="Profile"
          />
        ) : (
          <div className="avatar-placeholder">
            A
          </div>
        )}

      </div>

      <input
        type="file"
        accept="image/*"
        onChange={handleImage}
      />

    </div>
  );
}