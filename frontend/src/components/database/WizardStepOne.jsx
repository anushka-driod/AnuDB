export default function WizardStepOne({
  form,
  setForm,
  next,
}) {
 return (
  <div>

    <h2>Create Database</h2>

    <div className="input-group">
      <label>Database Name</label>

      <input
        value={form.name}
        onChange={(e)=>
          setForm({
            ...form,
            name:e.target.value
          })
        }
      />
    </div>

    <div className="input-group">
      <label>Description</label>

      <textarea
        rows="5"
        value={form.description}
        onChange={(e)=>
          setForm({
            ...form,
            description:e.target.value
          })
        }
      />
    </div>

    <button
      className="wizard-next"
      onClick={next}
    >
      Next →
    </button>

  </div>
);
}