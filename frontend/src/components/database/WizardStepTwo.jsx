const regions = [
  "Mumbai",
  "Singapore",
  "Virginia",
  "Frankfurt",
];

const storage = [
  "10 GB",
  "25 GB",
  "50 GB",
  "100 GB",
];

export default function WizardStepTwo({
  form,
  setForm,
  next,
  back,
}) {
  return (
    <>

      <h2>Configuration</h2>

      <label>Region</label>

      <select
        value={form.region}
        onChange={(e)=>
          setForm({
            ...form,
            region:e.target.value,
          })
        }
      >
        {regions.map((item)=>(
          <option key={item}>
            {item}
          </option>
        ))}
      </select>

      <label>Storage</label>

      <select
        value={form.storage}
        onChange={(e)=>
          setForm({
            ...form,
            storage:e.target.value,
          })
        }
      >
        {storage.map((item)=>(
          <option key={item}>
            {item}
          </option>
        ))}
      </select>

      <div className="wizard-buttons">

        <button
          className="cancel-btn"
          onClick={back}
        >
          Back
        </button>

        <button
          className="create-btn"
          onClick={next}
        >
          Next →
        </button>

      </div>

    </>
  );
}