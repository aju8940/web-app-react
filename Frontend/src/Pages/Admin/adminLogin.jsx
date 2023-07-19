import React from 'react';
import { useState, useEffect } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import '../../Components/Signup/Signup.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AdminLogin() {
  
const instance = axios.create({
  baseURL: 'http://localhost:5000'
})
const API = instance
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      email: '',
      password: '',
    };

    // Validate email
    if (!email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }

    // Validate password
    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async(e) => {
    e.preventDefault();

    if (validateForm()) {
      const adminData = {
        email,
        password,
      };
      const response = await API.post('/api/admin/login', adminData)
      if (response.data) {
        localStorage.setItem("admin",JSON.stringify(response.data))
        navigate('/admin')
      }
    }
  };

  useEffect(()=>{
    if(localStorage.getItem("admin")){
      navigate('/admin')
    }
  },[navigate])

  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login as Admin
        </h1>
        <p>Please login as admin</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
            />
            {errors.email && <span className='error' style={{color:'red'}}>{errors.email}</span>}
          </div>

          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='password'
              value={password}
              placeholder='Enter password'
              onChange={onChange}
            />
            {errors.password && <span className='error' style={{color:'red'}}>{errors.password}</span>}
          </div>

          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default AdminLogin;
