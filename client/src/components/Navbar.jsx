import { NavLink } from "react-router-dom";
import "./Navbar.css"
import { useAuth } from "../store/auth";


const Navbar  = () => {

const { isLoggedIn } = useAuth();
    return <>
    <div className="container">
        <div className="logo-brand">
            <a href="/">Database</a>
        </div>
        <nav>
            <ul>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/service">Service</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
        {
            isLoggedIn ? <li><NavLink to="/logout">Logout</NavLink></li>
            : <>
            <li><NavLink to="/register">Register</NavLink></li>
            <li><NavLink to="/login">Login</NavLink></li>
            </>
        
        }
            
            
            </ul>
        </nav>
    </div>
    </>
}

export default Navbar ; 