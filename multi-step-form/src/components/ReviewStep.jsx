import React from 'react';

const ReviewStep = ({ formData, onSubmit, onPrevious }) => {
  return (
    <div>
      <h2>Review Your Information</h2>
      <div>
        <p><strong>Name:</strong> {formData.name}</p>
        <p><strong>Email:</strong> {formData.email}</p>
        <p><strong>Phone:</strong> {formData.phone}</p>
        <p><strong>Address:</strong> {formData.address}</p>
        <p><strong>City:</strong> {formData.city}</p>
        <p><strong>ZIP Code:</strong> {formData.zip}</p>
        <p><strong>Card Number:</strong> {formData.cardNumber}</p>
        <p><strong>Expiration Date:</strong> {formData.expirationDate}</p>
        <p><strong>CVV:</strong> {formData.cvv}</p>
      </div>
      <button type="button" onClick={onPrevious}>Previous</button>
      <button type="button" onClick={onSubmit}>Submit</button>
    </div>
  );
};

export default ReviewStep;
