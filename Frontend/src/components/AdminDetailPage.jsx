import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '/src/style/UserProfile.css';


const UserProfile = () => {
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [editedUser, setEditedUser] = useState({
        firstName: '',
        lastName: '',
        email:'',
        password:'',
        address: '',
        mobileNumber: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        const userData = JSON.parse(sessionStorage.getItem('user'));
        console.log(userData);
        if (userData) {
            setUser(userData);
            setEditedUser(userData);
        }
    }, []);

    const toHome = () => {
        navigate('/adminHome');
    };

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleCancelEdit = () => {
        setEditMode(false);
    };

    const handleSaveEdit = async () => {
        try {
            console.log(editedUser);
            const token = sessionStorage.getItem('token');
            const user = JSON.parse(sessionStorage.getItem('user'));
            const response = await axios.put(`http://localhost:3000/userProfile/${user.email}`, editedUser, {
            headers: { 'Authorization': `Bearer ${token}` }});
            console.log(response);
            if (response.data.success) {
                sessionStorage.setItem('user', JSON.stringify(editedUser));
                setUser(editedUser);
                setEditMode(false);
            } else {
                console.error('Error updating user data:', response.data.error);
            }
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    return (
        <div className="user-profile-container">
            <h2>User Profile</h2>
            <button onClick={toHome} className="profile-button-home">Home</button>
            <button onClick={handleEditClick} disabled={editMode} className="profile-button-edit">Edit</button> 
            {user && (
                <ul className={editMode ? "edit-form-container" : "profile-info-container"}>
                    <li className="profile-info-item">
                        <div className="profile-picture">
                            <img src='https://gravatar.com/avatar/f09bb6f9641059e4910fc5bc1fff622d?s=200&d=mp&r=x' alt="Profile" />
                        </div>
                        <div>
                            {editMode ? (
                                <div className="edit-form">
                                    <label>First Name: </label>
                                    <input type="text" name="firstName" value={editedUser.firstName} onChange={handleInputChange} />
                                    <label>Last Name: </label>
                                    <input type="text" name="lastName" value={editedUser.lastName} onChange={handleInputChange} />
                                    <label>Password: </label>
                                    <input type="password" name="password" value={editedUser.password} onChange={handleInputChange} />
                                    <label>Email: </label>
                                    <input type="text" name="email" value={editedUser.email} onChange={handleInputChange} />
                                    <label>Address: </label>
                                    <input type="text" name="address" value={editedUser.address} onChange={handleInputChange} />
                                    <label>Mobile Number: </label>
                                    <input type="text" name="mobileNumber" value={editedUser.mobileNumber} onChange={handleInputChange} />
                                </div>
                            ) : (
                                <>
                                    <h3>{user.firstName} {user.lastName}</h3>
                                    <h3>{user.email}</h3>
                                    <h3>Address: {user.address}</h3>
                                    <h3>Mobile Number: {user.mobileNumber}</h3>
                                </>
                            )}
                        </div>
                    </li>
                </ul>
            )}
            {editMode && (
                <>
                    <button onClick={handleCancelEdit} className="profile-button-cancel">Cancel</button>
                    <button onClick={handleSaveEdit} className="profile-button-save">Save</button>
                </>
            )}
        </div>
    );
};

export default UserProfile;
``
