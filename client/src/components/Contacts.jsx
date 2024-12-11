import React, { useEffect, useState } from "react";
import "./style.css";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Contacts = () => {
  const [user, setUser] = useState(null);
  const nav = useNavigate();
  const [contacts, setContacts] = useState([]); // Initialize contacts state
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [search, setSearch] = useState("");
  
  const filteredContacts = contacts.filter(
    (contact) => contact.name.toLowerCase().includes(search.toLowerCase())
    || contact.number.includes(search)
  )

  const signout = () => {
    localStorage.removeItem("user");
    nav("/");
  };

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")).user); // Check if user already exists
    if (!JSON.parse(localStorage.getItem("user"))) {
      nav("/");
    }
  }, []);

  useEffect(() => {
    console.log("error of"+user);
    
    if (user) {
      axios
        .post(`http://localhost:3000/contact/${user.email}`)
        .then((res) => {
          setContacts(res.data); // Update contacts state with fetched data
        })
        .catch((err) => {
          console.log("Error fetching contacts", err);
        });
    }
  }, [user]);

  const addContact = async (e) => {
    e.preventDefault();
    if (!name || !number) {
      alert("Please fill all fields");
      return;
    }
    try {
    

      const response = await axios.post(
        `http://localhost:3000/contact/add/${user.email}`,
        {
          name: name,
          number: number,
        }
      );
      console.log("response.data", response.data);
      // [{name, number},{name, number},{name, number}]
      // add {name,number}
      // [{name, number},{name, number},{name, number},
      //  [{name, number},{name, number},{name, number}, {name, number}]]
      setContacts((prevContacts) => [...prevContacts, response.data]);
      setName("");
      setNumber("");
    } catch (err) {
      console.log(err);
    }
  };

  const deleteContact = async (contactId) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/contact/delete/${user.email}`,
        { id: contactId } // Send the contact's ID in the body
      );
      setContacts(response.data); // Update contacts with the returned array
    } catch (err) {
      console.error("Error deleting contact", err);
      alert("Failed to delete contact");
    }
  };



  return (
    <div className="container">
      <div className="contact-page">
        <div className="nav-bar">
          <div className="logo-div">
            <img className="logo-img" src="src/assets/images/logo.png" alt="" />
          </div>
          <div className="nav">
            <NavLink to={"/Home"}>Home</NavLink>
            <NavLink>My Contacts</NavLink>
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

        <div className="contact-list">
          <h1>Contact List</h1>
          <div className="create-contact">
            <h3>Add contact</h3>
            <form action="">
              <input
                type="text"
                className="contact-input"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="phone"
                className="contact-input"
                placeholder="Number"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
              />
              <button className="add-btn" type="submit" onClick={addContact}>
                <img
                  src="src/assets/images/plus.png"
                  alt="Add"
                  className="add-img"
                />
              </button>
            </form>
          </div>
          <div className="search-div">
            <h3>Search contacts</h3>
            <div className="search-bar">
              <input
              className="search-input"
                type="text"
                placeholder="Search contacts.."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="show-contacts scroll-container">
            {filteredContacts.length === 0 ? (
              <p>No contacts found</p> // Message when no contacts are found
            ) : (
              <ul>
                {filteredContacts.map((contact, index) => (
                  <li key={index}>
                    <div className="details-div">
                      <p className="nm">
                        {" "}
                        <img
                          className="pers"
                          src="src/assets/images/pers.png"
                          alt=""
                        />{" "}
                        {contact.name}
                      </p>
                      <p className="numb">
                        {" "}
                        <img
                          src="src/assets/images/ph.png"
                          alt=""
                          className="num"
                        />{" "}
                        {contact.number}
                      </p>
                    </div>
                    <button
                      onClick={() => deleteContact(contact._id)}
                      className="del-btn"
                    >
                      <img
                        src="src/assets/images/bin.png"
                        alt="del"
                        className="del-img"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
