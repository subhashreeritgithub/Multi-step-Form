import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Function to check if a card number is valid using Luhn's Algorithm
const isValidCardNumber = (number) => {
  let sum = 0;
  let shouldDouble = false;

  // Loop through the card number from right to left
  for (let i = number.length - 1; i >= 0; i--) {
    let digit = parseInt(number.charAt(i), 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return (sum % 10 === 0);
};

// Function to check if an expiration date is valid
const isValidExpirationDate = (date) => {
  const [month, year] = date.split('/').map(num => parseInt(num, 10));
  if (isNaN(month) || isNaN(year)) return false;
  const currentYear = new Date().getFullYear() % 100; // Last two digits of the current year
  const currentMonth = new Date().getMonth() + 1; // Months are 0-based in JavaScript

  return (
    month >= 1 && month <= 12 &&
    (year > currentYear || (year === currentYear && month >= currentMonth))
  );
};

// Schema for form validation
const schema = yup.object({
  cardNumber: yup.string()
    .matches(/^\d{13,19}$/, 'Valid card number is required')
    .test('luhn', 'Invalid card number', value => isValidCardNumber(value))
    .required('Card number is required'),
  expirationDate: yup.string()
    .matches(/^\d{2}\/\d{2}$/, 'Valid expiration date is required (MM/YY)')
    .test('valid-date', 'Expiration date must be in the future', value => isValidExpirationDate(value))
    .required('Expiration date is required'),
  cvv: yup.string()
    .matches(/^\d{3,4}$/, 'Valid CVV is required (3 or 4 digits)')
    .required('CVV is required')
}).required();

const FormStep3 = ({ formData, onNext, onPrevious }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: formData
  });

  const onSubmit = (data) => {
    onNext(data);
  };

  return (
    <div>
      <h2>Step 3: Payment Info</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('cardNumber')}
          placeholder="Card Number"
          className="form-input"
        />
        {errors.cardNumber && <p className="error">{errors.cardNumber.message}</p>}
        <input
          {...register('expirationDate')}
          placeholder="Expiration Date (MM/YY)"
          className="form-input"
        />
        {errors.expirationDate && <p className="error">{errors.expirationDate.message}</p>}
        <input
          {...register('cvv')}
          placeholder="CVV"
          className="form-input"
        />
        {errors.cvv && <p className="error">{errors.cvv.message}</p>}
        <button type="button" onClick={onPrevious}>Previous</button>
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default FormStep3;
