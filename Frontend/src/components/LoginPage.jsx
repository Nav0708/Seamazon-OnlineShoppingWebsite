import { useNavigate } from 'react-router-dom';
import React, {useState} from "react";
import axios from 'axios';
import '/src/style/login.css'
import logo from '/src/logo.png';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const login = async (e) => {
      e.preventDefault();
  
      try {
          const response = await axios.post('http://localhost:3000/login', { email, password });
          const { token, user } = response.data;
          sessionStorage.setItem('token', token);
          sessionStorage.setItem('email', response.data.user.email);
          sessionStorage.setItem('user', JSON.stringify(user));
          if (user.role === 'admin') {
              navigate('/adminHome');
          } else {
              navigate('/home');
          }
      } catch (error) {
          alert('Invalid email or password');
      }
    }
    return (
      <div className="sign-in-container">
        <img src={logo} alt="Logo" style={{ marginLeft: '10px', marginTop: '10px', width: '250px', height: '100px' }} />
        <br/>
        <form className="sign-in-form" onSubmit={login}>
            <h1 className="loginLabel">Log In</h1>
            <label className="signInLabel">Email: </label>
            <input type="email" className="signInInput" placeholder="Enter your email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
            ></input>
            <br />
            <label className="signInLabel">Password: </label>
            <input type="password" className="signInInput" placeholder="Enter your password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)}
            ></input>
            <button className="signInButton" type="submit">Log In</button>

            <button className="signInButton" onClick={() => navigate('/signup')}>Sign Up</button>
        </form>
      </div>
    );
    }
  export default LoginPage;