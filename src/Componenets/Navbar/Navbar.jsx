import React, { useState, useEffect } from 'react';
import './Navbar.css';
import Garage_icon from '../Assets/Garage_icon.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [menu, setMenu] = useState('home');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('username');
    setUsername(''); // Clear the username
    window.location.replace('/');
  };

  const fetchUserData = async () => {
    try {
      const authToken = localStorage.getItem('auth-token');
      if (!authToken) {
        return;
      }

      const response = await fetch('http://localhost:4000/user', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const userData = await response.json();
      setUsername(userData.name);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []); // Fetch user data when component mounts

  return (
    <div className='navbar'>
      <div className='nav-logo'>
        <img src={Garage_icon} alt="Garage_icon" height={45} width={45} />
        <p>Auto Garage Services</p>
      </div>
      <ul className='nav-menu'>
        <li onClick={() => { setMenu("home") }}>
          <Link style={{ textDecoration: 'none' }} to='/'>Home</Link>
          {menu === "home" ? <hr /> : <></>}
        </li>
        <li onClick={() => { setMenu("booking") }}>
          <Link style={{ textDecoration: 'none' }} to='/booking'>Appointment Booking</Link>
          {menu === "booking" ? <hr /> : <></>}
        </li>
      </ul>
      <div className="nav-login">
        {localStorage.getItem('auth-token') ? (
          <>
            <p>Welcome, {username}</p>
            <button onClick={handleLogout}>LogOut</button>
          </>
        ) : (
          <Link style={{ textDecoration: "none" }} to="/login">
            <button>Login</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
