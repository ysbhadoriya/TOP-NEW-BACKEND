import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast }  from 'react-toastify'
import "../index.css";
import "../App.css"

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { storeTokenInLS } = useAuth();
  const URL = "http://localhost:5000/api/auth/login";
  const navigate = useNavigate();

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
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorData = await response.json();
         toast.error( errorData.msg)
        console.log("Error:", errorData);
        throw new Error(`Login failed: ${response.status}`);
      } 

      if (response.ok) {
        const res_data = await response.json();
        storeTokenInLS(res_data.token);
        console.log("res from server " , res_data )
        toast.success("User Login Successfully");
        setUser({ email: "", password: "" });
        navigate("/");
       }
       //else {
      //   const errorData = await response.json();
      //   alert(`Invalid Details: ${errorData.extraDetails}`);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="section-contact">
      <div className="contact-content container">
        <h1 className="main-heading">Login</h1>
      </div>
      <div className="container grid grid-two-cols">
        <div className="contact-img">
          <img src="/images/login.png" alt="we are always ready to help" />
        </div>
        <section className="section-form">
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="off"
                placeholder="Enter your email"
                value={user.email}
                onChange={handleInput}
                required
              />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                value={user.password}
                onChange={handleInput}
                placeholder="Enter your Password"
                required
              />
            </div>
              <div>
                
              </div>
            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
        </section>
      </div>
    </section>
  );
};

export default Login;
