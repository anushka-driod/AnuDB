import { useState } from "react";

import WizardStepOne from "./WizardStepOne";
import WizardStepTwo from "./WizardStepTwo";
import WizardStepThree from "./WizardStepThree";

export default function Wizard() {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    name: "",
    description: "",
    color: "#2563EB",
    region: "Mumbai",
    storage: "10 GB",
    engine: "PostgreSQL 16",
  });

  return (
    <>
      {step === 1 && (
        <WizardStepOne
          form={form}
          setForm={setForm}
          next={() => setStep(2)}
        />
      )}

      {step === 2 && (
        <WizardStepTwo
          form={form}
          setForm={setForm}
          next={() => setStep(3)}
          back={() => setStep(1)}
        />
      )}

      {step === 3 && (
        <WizardStepThree
          form={form}
          back={() => setStep(2)}
        />
      )}
    </>
  );
}