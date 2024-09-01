import React, { useState, useEffect } from 'react';
import FormStep1 from './components/FormStep1';
import FormStep2 from './components/FormStep2';
import FormStep3 from './components/FormStep3';
import ReviewStep from './components/ReviewStep';
import ProgressIndicator from './components/ProgressIndicator';

const App = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(() => {
    // Load saved form data from local storage
    const savedData = localStorage.getItem('formData');
    return savedData ? JSON.parse(savedData) : {};
  });

  useEffect(() => {
    // Save form data to local storage
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  const handleNext = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Handle form submission (e.g., send data to server)
    localStorage.removeItem('formData'); // Clear saved data
    alert('Form submitted successfully!');
  };

  return (
    <div className="App">
      <ProgressIndicator currentStep={step} />
      {step === 1 && <FormStep1 formData={formData} onNext={handleNext} />}
      {step === 2 && <FormStep2 formData={formData} onNext={handleNext} onPrevious={handlePrevious} />}
      {step === 3 && <FormStep3 formData={formData} onNext={handleNext} onPrevious={handlePrevious} />}
      {step === 4 && <ReviewStep formData={formData} onSubmit={handleSubmit} onPrevious={handlePrevious} />}
    </div>
  );
};

export default App;
