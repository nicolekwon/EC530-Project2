import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BrowserRouter, Route, Routes, useNavigate,
} from 'react-router-dom';

const FormSignin = () => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const goToHomePage = () => navigate('/home');

  useEffect(
    () => {
      if (isSubmitting) {
        axios.get(`https://ec530-project2-nicolekwon.azurewebsites.net/signin/` + email + '/' + password)
        .then(res => {
            if (res.data == 'Cannot sign in')
            {
              alert('Your sign-in credentials are incorrect - try again.');
              setIsSubmitting(false);
            }
            else
            {
              window.name = email;
              goToHomePage();
            }
          })
      }
    }
  );

  const handleSubmit = e => {
    e.preventDefault();
    setIsSubmitting(true);
  }

  const handleSignout = e => {
    e.preventDefault();
    window.name = null;
    setIsSubmitting(false);
    goToHomePage();
  }

  if (window.name.includes('@'))
  {
    return(
      <div className='form-content-right'>
        <h1 className='form-success'>You are signed in! Would you like to sign out?</h1>
        <form onSubmit={handleSignout} className='form' noValidate>
          <div>
            <button type="submit">Sign Out</button>
          </div>
        </form>
      </div>
      );
  }
  else
  {
  return (
    <div className="login-wrapper">
      <h1>Log in to access your account! </h1>
      <form onSubmit={handleSubmit} className='form' noValidate>
        <label>
          <p>Email</p>
          <input type="email" onChange={e => setEmail(e.target.value)} />
        </label>
        <label>
          <p>Password</p>
          <input type="password" onChange={e => setPassword(e.target.value)} />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
  }
};

export default FormSignin;