import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './style.css'

const Home = () => {

  const [user, setUser] = useState(null)
  const nav = useNavigate();

  const signout = ()=>{
    localStorage.removeItem('user')
     nav('/')
  }
  useEffect(()=>{

     setUser(JSON.parse(localStorage.getItem('user'))) // Check if user already exists
     console.log(JSON.parse(localStorage.getItem("user")).user.name);
    if (!JSON.parse(localStorage.getItem("user"))) {
      nav("/");
    }
  },[])

  return (
    <div className="container">
      <div className="home">
        <div className="nav-bar">
          <div className="logo-div">
            <img className="logo-img" src="src/assets/images/logo.png" alt="" />
          </div>
          <div className="nav">
            <NavLink>Home</NavLink>
            <NavLink to={"/Contact"}>My Contacts</NavLink>
          </div>
          <div className="user-in">
            {user && (
              <p>Welcome {JSON.parse(localStorage.getItem("user")).user.name}!</p>
            )}
            <p>
              <button onClick={signout}>Signout</button>
            </p>
          </div>
        </div>
        <div className="main-home">
          <h1>Welcome to Home Page</h1>
          <NavLink to={"/Contact"}>
            <button>Take me to My Contacts</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Home