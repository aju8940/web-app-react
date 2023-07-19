import React from 'react'
import { useState, useEffect } from 'react'
import { FaSignInAlt, FaUser } from 'react-icons/fa'
import '../Signup/Signup.css'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { login, reset } from '../../Auth/authSlice'
import { useNavigate, Link } from 'react-router-dom'
import Spinner from '../Spinner/Spinner'


function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

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

  const onSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const userData = {
        email,
        password,
      };

      dispatch(login(userData));
    }
  };


  useEffect(() => {
    if (isError) {
      console.log(isError,"bhdbhd");
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/')
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <header className='header'>
        <div className='logo'>
          <Link to='/'>HomePage</Link>
        </div>
        <ul>
          <>


            <li>
              <Link to='/signup'>
                <FaUser />Signup
              </Link>
            </li>
          </>
        </ul>
      </header >
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please login to your Account</p>
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
  )
}

export default Login


