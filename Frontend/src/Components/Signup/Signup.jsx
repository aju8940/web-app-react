import React from 'react';
import { useState, useEffect } from 'react';
import { FaUser, FaSignInAlt } from 'react-icons/fa';
import './Signup.css';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { register, reset } from '../../Auth/authSlice';
import { useNavigate,Link } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
    profileImage: null, // New profile image state
  });

  const { name, email, password, password2, profileImage } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    if (e.target.name === 'profileImage') {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.files[0],
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== password2) {
      toast.error('Password doesn\'t match');
    } else {
      const userData = {
        name,
        email,
        password,
        profileImage,
      };
      dispatch(register(userData));
    }
  };

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
                <Link to='/login'>
                  <FaSignInAlt />Login
                </Link>
              </li>

              
            </>
          </ul>
        </header >
      <section className='heading'>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              name='name'
              value={name}
              placeholder='Enter your name'
              onChange={onChange}
            />
          </div>
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
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password2'
              name='password2'
              value={password2}
              placeholder='Confirm password'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='profileImage'>Profile Picture</label>
            <input
              type='file'
              className='form-control'
              id='profileImage'
              name='profileImage'
              onChange={onChange}
            />
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

export default Signup;
