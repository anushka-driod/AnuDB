import { useState } from "react";
import { useDatabase } from "../../context/DatabaseContext";

export default function WizardStepThree({
  form,
  back,
}) {
  const { createDatabase } = useDatabase();

  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!form.name.trim()) {
      alert("Please enter a database name.");
      return;
    }

    try {
      setLoading(true);

      await createDatabase({
        name: form.name,
        description: form.description,
        storage: form.storage,
        region: form.region,
        engine: form.engine,
      });

      alert("Database Created Successfully!");

    } catch (error) {
      console.error("Create database error:", error);

      alert(
        error.response?.data?.message ||
        "Failed to create database."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2>Review</h2>

      <div className="review-box">

        <p>
          <strong>Name:</strong> {form.name}
        </p>

        <p>
          <strong>Description:</strong> {form.description}
        </p>

        <p>
          <strong>Region:</strong> {form.region}
        </p>

        <p>
          <strong>Storage:</strong> {form.storage}
        </p>

        <p>
          <strong>Engine:</strong> {form.engine}
        </p>

      </div>

      <div className="wizard-buttons">

        <button
          className="cancel-btn"
          onClick={back}
          disabled={loading}
        >
          Back
        </button>

        <button
          className="create-btn"
          onClick={handleCreate}
          disabled={loading}
        >
          {loading
            ? "Creating..."
            : "Create Database"}
        </button>

      </div>
    </>
  );
}