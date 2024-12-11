import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import "./style.css";

const Register = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const nav = useNavigate()
  
  const handleSubmit= async (e)=>{
    e.preventDefault()

    try{
      const res = await axios.post('http://localhost:3000/auth/register', {name, email, password})
      nav('/')
    
    }catch(err){
      console.log(err.response);
      alert("Registration Error")
    }


  }

  return (
    <div className="container">
      <div className="register-page">
        <div className="title">
          <h1>Create Account</h1>
        </div>
        <div className="register-div">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
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

            <button>Register</button>
          </form>
          <h2>
            Have an account already? <a href="/">Login here</a>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Register