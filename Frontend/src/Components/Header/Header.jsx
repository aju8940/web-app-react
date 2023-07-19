import React from 'react'
import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import '../Header/header.css'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../../Auth/authSlice'


function Header() {

    const dispatch = useDispatch()
    const Navigate = useNavigate()
    const { user } = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        Navigate('/')
    }


    return (
        <header className='header'>
            <div className='logo'>
                <Link to='/'>HomePage</Link>
            </div>
            <ul>
                {user ?  <li>Hi {user.name}</li> : null}
                {user ? (
                    <li>
                        <button className='btn'
                            onClick={onLogout}
                        >
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
        </header >
    )
}

export default Header