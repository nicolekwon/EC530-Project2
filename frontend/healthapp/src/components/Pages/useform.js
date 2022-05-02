import { useState, useEffect } from 'react';
import axios from 'axios';

const useForm = (callback, validate) => {
  const [values, setValues] = useState({
    role: '',
    email: '',
    password: '',
    password2: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    setErrors(validate(values));
    setIsSubmitting(true);
   };

  useEffect(
    () => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        axios.post(`https://ec530-project2-nicolekwon.azurewebsites.net/signup/` + values.email + '/' + values.password + '/' + values.role)
        .then(res => {
          if (res.data == 'Cannot sign up')
          {
            alert('Cannot sign up because email is already in use.');
            setIsSubmitting(false);
          }
          else
          {
            callback();
          }
          })
      }
    },
    [errors]
  );

  return { handleChange, handleSubmit, values, errors };
};

export default useForm;