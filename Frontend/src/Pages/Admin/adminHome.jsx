import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { FaSignOutAlt } from 'react-icons/fa'
import axios from 'axios'
import '../Admin/adminHome.css'

function adminHome() {
    const instance = axios.create({
        baseURL: 'http://localhost:5000/api/admin',
    })
    const API = instance
    const Navigate = useNavigate()
    const [users, setUsers] = useState([])
    const [editing, setEditing] = useState(false);
    const [editedUser, setEditedUser] = useState({});
    const [editedName, setEditedName] = useState('');
    const [editedEmail, setEditedEmail] = useState('');
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');


    useEffect(() => {
        if (!localStorage.getItem('admin')) {
            Navigate('/admin/login')
        } else {
            const fetchUser = async () => {
                await API.get('/home').then((response) => {
                    setUsers(response.data.users)
                    Navigate('/admin')
                })
            }
            fetchUser()
        }
    }, [users])

    const logout = () => {
        localStorage.removeItem('admin')
        Navigate('/admin/login')
    }

    const handleDelete = async (id) => {
        await API.delete(`/delete-user/${id}`).then(() => {
            setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));

            const loggedInUser = JSON.parse(localStorage.getItem('user'));
            if (loggedInUser && loggedInUser._id === id) {
                localStorage.removeItem('user');
            }
        });
    };

    const handleEdit = (user) => {
        setEditedUser(user);
        setEditedName(user.name);
        setEditedEmail(user.email);
        setEditing(true);
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();

        // Reset previous errors
        setNameError('');
        setEmailError('');

        // Validation checks
        let isValid = true;

        if (editedName.trim() === '') {
            setNameError('Name is required');
            isValid = false;
        }

        if (editedEmail.trim() === '') {
            setEmailError('Email is required');
            isValid = false;
        } 

        if (!isValid) {
            return;
        }

        const editedUserData = {
            name: editedName,
            email: editedEmail
        };

        await API.put(`/edit-user/${editedUser._id}`, editedUserData)
            .then(() => {
                setEditing(false);
                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user._id === editedUser._id ? { ...user, ...editedUserData } : user
                    )
                );
            })
            .catch((error) => {
                console.error('Edit User Error:', error);
                // Handle error, show error message, etc.
            });
    };

    return (
        <>
            <header className='header'>
                <div className='logo'>
                    <Link to='/admin'>ADMIN PAGE</Link>
                </div>
                <ul>
                    <li>
                        <button className='btn' onClick={logout}>
                            <FaSignOutAlt />
                            Logout
                        </button>
                    </li>
                </ul>
            </header>

            <table className='user-table'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button className='edit-btn' onClick={() => handleEdit(user)}>
                                    Edit
                                </button>

                                <button className='delete-btn' onClick={() => handleDelete(user._id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Edit User Modal */}
            {editing && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Edit User</h2>
                        <form onSubmit={handleEditSubmit}>
                            <label>Name:</label>
                            <input
                                type="text"
                                value={editedName}
                                onChange={(e) => setEditedName(e.target.value)}
                            />
                            {nameError && <span className="error" style={{color:'red'}}>{nameError}</span>}

                            <label>Email:</label>
                            <input
                                type="text"
                                value={editedEmail}
                                onChange={(e) => setEditedEmail(e.target.value)}
                            />
                            {emailError && <span className="error" style={{color:'red'}}>{emailError}</span>}

                            <button type="submit">Save</button>
                            <button onClick={() => setEditing(false)}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    )
}

export default adminHome
