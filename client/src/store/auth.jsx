import { createContext, useContext, useEffect, useState } from "react";



export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState("");
  const [services , setServices] = useState("");

  const storeTokenInLS = (serverToken) => {
    localStorage.setItem("token", serverToken);
    setToken(serverToken); // Update the token state
  };

  const isLoggedIn = !!token; // true if token exists, false otherwise
  console.log("isLoggedIn", isLoggedIn);

  const LogoutUser = () => {
    alert("Logout User Successfully")
    setToken("");
    localStorage.removeItem("token");
  };
 
 
  // JWT Authentication - currently logged-in user data
  const userAuthentication = async () => {
    try {
      // Retrieve token from localStorage
      const token = localStorage.getItem("token");
  
      // if (!token) {
      //   console.error("Token is missing.");
      //   return;
      // }
  
      // console.log("Using token:", token);
  
      const response = await fetch("http://localhost:5000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data.userData)
        setUser(data.userData);
      } else {
        console.error("Error fetching user data:", response.status);
      }
    } catch (error) {
      console.error("Network or server error:", error);
    }
  };
  

  const getServiceData = async() => {
    try {
      const response = await fetch( "http://localhost:5000/api/data/service" , {
        method : "GET" ,
      }) ;
      if(response.ok){
        const services = await response.json()
        setServices(services.data)

      }
      console.log("service" , response  );
      
    } catch (error) {
      console.log(` service error from frontend ${error}`); 
    }
  }




  useEffect(() => {
    userAuthentication();
    getServiceData();
  }, []);
  return (
    <AuthContext.Provider   
      value={{ isLoggedIn, storeTokenInLS, LogoutUser, user , services }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContextValue;
};
