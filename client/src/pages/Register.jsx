import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast }  from 'react-toastify'
import "../index.css";
import "../App.css"



const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth(); // Destructure storeTokenInLS from useAuth

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorData = await response.json();
        toast.error( errorData.extraDetails)
        console.log("Error:", errorData);
        throw new Error(`Registration failed: ${response.status}`);
      } 
      

      const res_data = await response.json();
      console.log("Response from server:", res_data);

      // Store token in localStorage
      storeTokenInLS("token", res_data.token);

      // Clear form
      setUser({
        username: "",
        email: "",
        phone: "",
        password: "",
      });

      navigate("/");
      toast.success("User registered successfully");
    }  catch (error) {
      console.error("Error during registration:", error);
    }
  };

  

  return (
    <>
      <section className="section-contact">
        <div className="contact-content container">
          <h1 className="main-heading">Register</h1>
        </div>
        <div className="container grid grid-two-cols">
          <div className="contact-img">
            <img src="/images/login.png" alt="we are always ready to help" />
          </div>
          <section className="section-form">
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  value={user.username}
                  onChange={handleInput}
                  placeholder="Username"
                  required
                />
              </div>
              <div>
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleInput}
                  placeholder="Email"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={user.phone}
                  onChange={handleInput}
                  placeholder="Phone"
                  required
                />
              </div>
              <div>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleInput}
                  placeholder="Password"
                  required
                />
              </div>
              <br />
              <button type="submit" className="btn btn-submit">
                Register Now
              </button>
            </form>
          </section>
        </div>
      </section>
    </>
  );
};

export default Register;
