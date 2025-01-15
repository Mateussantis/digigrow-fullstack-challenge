import { useState } from 'react';

interface FormValues {
  [key: string]: string | number | boolean | Date; // Define the type of your form values
}

function useForm<T>(initialValues: T): {
  values: T;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  resetForm: () => void;
  setFormValues: (values: T) => void;
} {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here (e.g., API call)
    console.log('Form submitted:', values);
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  const setFormValues = (values: T) => {
    setValues(values);
  }

  return {
    values,
    handleChange,
    handleSubmit,
    resetForm,
    setFormValues
  };
}

export default useForm;