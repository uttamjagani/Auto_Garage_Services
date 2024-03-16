import React, { useState } from 'react'
import './LoginSignUp.css'

const LoginSignUp = () => {

  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  });

  const [, setErrors] = useState({});

  const validateForm_login = () => {
    let errors = {};
    let formIsValid = true;

    if (!formData.email.trim()) {
      alert("Email is required");
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert("Email address is invalid");
      formIsValid = false;
    }

    if (!formData.password.trim()) {
      alert("Password is required");
      formIsValid = false;
    }

    setErrors(errors);
    return formIsValid;
  };

  const validateForm_signup = () => {
    let errors = {};
    let formIsValid = true;

    if (!formData.username.trim()) {
      alert("Username is required");
      formIsValid = false;
    }

    if (!formData.email.trim()) {
      alert("Email is required");
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert("Email address is invalid");
      formIsValid = false;
    }

    if (!formData.password.trim()) {
      alert("Password is required");
      formIsValid = false;
    }

    setErrors(errors);
    return formIsValid;
  };


  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const login = async () => {
    if (validateForm_login()) {
      console.log("Login Function Exicuted", formData);

      let responceData;
      await fetch('http://localhost:4000/login', {
        method: "POST",
        headers: {
          Accept: 'application/form-data',
          'content-type': 'application/json'
        },
        body: JSON.stringify(formData),
      }).then((responce) => responce.json()).then((data) => responceData = data)

      if (responceData.success) {
        localStorage.setItem('auth-token', responceData.token);
        localStorage.setItem('username', formData.username);
        window.location.replace('/');
      } else {
        alert(responceData.errors);
      }
    }
  }

  const signup = async () => {
    if (validateForm_signup()) {
      console.log("SignUp Function Exicuted", formData);

      let responceData;
      await fetch('http://localhost:4000/signup', {
        method: "POST",
        headers: {
          Accept: 'application/form-data',
          'content-type': 'application/json'
        },
        body: JSON.stringify(formData),
      }).then((responce) => responce.json()).then((data) => responceData = data)

      if (responceData.success) {
        localStorage.setItem('auth-token', responceData.token);
        localStorage.setItem('username', formData.username);
        window.location.replace('/');
      } else {
        alert(responceData.errors);
      }
    }
  }

  return (
    <div className="loginsignup">
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Sign Up" ? <input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name' /> : <></>}
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' />
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password' />
        </div>
        {state === "Sign Up"
          ? <p className="loginsignup-login">Already have an Account? <span onClick={() => { setState("Login") }}>Login Here</span></p>
          : <p className="loginsignup-login">Create an Account? <span onClick={() => { setState("Sign Up") }}>Click Here</span></p>
        }

        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>I agree to the terms and condition of use and privacy policy.</p>
        </div>
        <button onClick={() => { state === "Login" ? login() : signup() }}>Continue</button>

      </div>
    </div>
  )
}

export default LoginSignUp