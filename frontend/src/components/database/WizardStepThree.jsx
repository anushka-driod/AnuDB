import { useDatabase } from "../../context/DatabaseContext";

export default function WizardStepThree({
  form,
  back,
}) {

  const { createDatabase } = useDatabase();

  const handleCreate = () => {

    createDatabase({
      name: form.name,
      tables: 0,
      storage: form.storage,
      status: "Active",
    });

    alert("Database Created Successfully ✅");

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
        >
          Back
        </button>

        <button
          className="create-btn"
          onClick={handleCreate}
        >
          Create Database
        </button>

      </div>

    </>
  );
}