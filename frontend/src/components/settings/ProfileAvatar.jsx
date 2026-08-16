import { useState } from "react";
import toast from "react-hot-toast";

export default function ProfileAvatar() {

  const [image, setImage] = useState(
    localStorage.getItem("profileImage") || ""
  );


  const handleImage = (e) => {

    const file = e.target.files?.[0];

    if (!file) {
      return;
    }


    // Only allow images
    if (!file.type.startsWith("image/")) {

      toast.error("Please select an image file.");

      return;
    }


    // Limit image size to 2 MB
    if (file.size > 2 * 1024 * 1024) {

      toast.error("Image must be smaller than 2 MB.");

      return;
    }


    const reader = new FileReader();


    reader.onload = () => {

      const imageData = reader.result;

      setImage(imageData);

      localStorage.setItem(
        "profileImage",
        imageData
      );

      toast.success(
        "Profile photo updated."
      );

    };


    reader.onerror = () => {

      toast.error(
        "Failed to load image."
      );

    };


    reader.readAsDataURL(file);

  };


  const removeImage = () => {

    localStorage.removeItem(
      "profileImage"
    );

    setImage("");

    toast.success(
      "Profile photo removed."
    );

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


      {image && (

        <button
          type="button"
          className="delete-btn"
          onClick={removeImage}
        >
          Remove Photo
        </button>

      )}

    </div>

  );
}