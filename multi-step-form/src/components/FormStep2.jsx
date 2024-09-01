import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object({
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  zip: yup.string()
    .matches(/^\d{5}(-\d{4})?$/, 'Valid ZIP code is required (e.g., 12345 or 12345-6789)')
    .required('ZIP code is required')
}).required();

const FormStep2 = ({ formData, onNext, onPrevious }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: formData
  });

  const onSubmit = (data) => {
    onNext(data);
  };

  return (
    <div>
      <h2>Step 2: Address</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('address')}
          placeholder="Address"
          className="form-input"
        />
        {errors.address && <p className="error">{errors.address.message}</p>}
        <input
          {...register('city')}
          placeholder="City"
          className="form-input"
        />
        {errors.city && <p className="error">{errors.city.message}</p>}
        <input
          {...register('zip')}
          placeholder="ZIP Code"
          className="form-input"
        />
        {errors.zip && <p className="error">{errors.zip.message}</p>}
        <button type="button" onClick={onPrevious}>Previous</button>
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default FormStep2;
