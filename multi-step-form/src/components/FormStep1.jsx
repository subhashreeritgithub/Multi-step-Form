import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Valid email is required').required('Email is required'),
  phone: yup.string().matches(/^\d{10}$/, 'Valid phone number is required').required('Phone number is required')
}).required();

const FormStep1 = ({ formData, onNext }) => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: formData
  });

  const onSubmit = (data) => {
    onNext(data);
  };

  return (
    <div>
      <h2>Step 1: Personal Details</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register('name')}
          placeholder="Name"
          className="form-input"
        />
        {errors.name && <p className="error">{errors.name.message}</p>}
        <input
          {...register('email')}
          placeholder="Email"
          className="form-input"
        />
        {errors.email && <p className="error">{errors.email.message}</p>}
        <input
          {...register('phone')}
          placeholder="Phone"
          className="form-input"
        />
        {errors.phone && <p className="error">{errors.phone.message}</p>}
        <button type="submit">Next</button>
      </form>
    </div>
  );
};

export default FormStep1;
