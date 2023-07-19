import React, { useState,useEffect } from 'react';
import { FaEdit } from 'react-icons/fa';
import './Dashboard.css';
import { useNavigate, Link, json } from 'react-router-dom';
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import '../../Components/Header/Header.css';
import { useSelector, useDispatch } from 'react-redux';
import { logout, reset } from '../../Auth/authSlice';
import axios from 'axios';


function Dashboard() {
  const instance = axios.create({
    baseURL: 'http://localhost:5000'
  })
  const API = instance

  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const [editing, setEditing] = useState(false);
  const[userDetails,setUserDetails] = useState("")
  const [uploadRes,setUploadRes] = useState('')

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    Navigate('/');
  };

  let userToken = JSON.parse(localStorage.getItem('user'))
  console.log(userToken,'usertoken');
  let token = userToken?.token
  console.log(token);

  useEffect(()=>{
    async function fetchUser (){
      const {data} =  await API.get("/api/user",{

        headers:{Authorization:`Bearer ${token}`}
      })
      setUserDetails(data)
    }
  fetchUser()

  },[uploadRes])

 
  // console.log(userDetails,"userdetails");

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    try {
      const response = await API.post(`/api/user/upload-image/${user._id}`, formData);
      setUploadRes(response)
      console.log('Image upload success:', response.data);
      // Perform any additional logic after successful upload
    } catch (error) {
      console.error('Image upload error:', error);
      // Handle error, show error message, etc.
    }
  };

console.log(user);
  if (user) {
    console.log(user);
    return (
      <>
        <header className='header'>
          <div className='logo'>
            <Link to='/'>HomePage</Link>
          </div>
          <ul>
            {user ? <li>Hi {user.name}</li> : null}
            {user ? (
              <li>
                <button className='btn' onClick={onLogout}>
                  <FaSignOutAlt />Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link to='/login'>
                    <FaSignInAlt />Login
                  </Link>
                </li>
                <li>
                  <Link to='/signup'>
                    <FaUser />Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </header>
        <div className='dashboard'>
          <div className='profile'>
            <form>
              <div className='profile-image'>
                {userDetails.image ? (
                  <img src={userDetails.image} alt='Profile' />
                ) : (
                  <div className='no-profile-image'>No profile image available</div>
                )}

                <div className='edit-image-icon' >
                  <input type="file" accept="image/*" name='image' onChange={handleImageUpload}/>
                  <FaEdit />
                </div>

              </div>
            </form>
            <div className='user-details'>
              <h3>{user.name}</h3>
              <p>Email: {user.email}</p>
            </div>
          </div>
        </div>
      </>
    );
  } else {
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
              <li>
                <Link to='/signup'>
                  <FaUser />Signup
                </Link>
              </li>
            </>
          </ul>
        </header>
        <div className='dashboard' style={{ marginTop: '100px' }}>Welcome! Please Login</div>
      </>
    );
  }
}

export default Dashboard;
