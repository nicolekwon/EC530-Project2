import React, { useState } from 'react';
import './form.css';
import FormSignup from './formsignup';
import FormSuccess from './formsuccess';
import './form.css';

const Form = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);

  function submitForm() {
    setIsSubmitted(true);
  }
  return (
    <div className='form-container'>
      {!isSubmitted ? (
        <FormSignup submitForm={submitForm} />
      ) : (
        <FormSuccess />
      )}
    </div>
  );
};

export default Form;