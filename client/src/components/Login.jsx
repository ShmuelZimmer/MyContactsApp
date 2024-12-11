import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import "./style.css";

const Login = () => {

  
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const nav = useNavigate()
  const [error, setError] = useState("")

  const handleSubmit= async (e)=>{
    e.preventDefault()
    setError("")
    try {
      const res = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });
      nav("/home");
      localStorage.setItem("user", JSON.stringify(res.data));
    } catch (err) {
      if (err.response) {
        // Server returned an error response
        setError(err.response.data.error);
      } else {
        // Network or other error
        setError("An unexpected error occurred. Please try again.");
      }
    }
  }

  return (
    <div className="container">
      <div className="login-page">
        <div className="title">
          <h1>Welcome</h1>
          <h2>Sign in here</h2>
        </div>
        <div className="login-div">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <button>Login</button>
          </form>
          {error && <div className="error-message">{error}</div>}

          <h2>
            Dont have an account? <a href="/register">Create account</a>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Login