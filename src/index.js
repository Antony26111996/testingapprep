import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { Login } from "./component/Login";
// import { encode } from "base-64";
import axios from "axios";

const Root = () => {
  const [isAuthenticated, setIsAuthenticated] =  useState(
    !!localStorage.getItem('isloggedin'));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [ getEmail] = useState("");
  // const [ getPassword] = useState("");

  

  const handleLogin = async () => {
    if (email !== "" && password !== "") {
      const convert = `ad.missan.group\\${email}:${password}`;

      try {
        const response = await axios.get(
          "https://dms.missancomputer.com:8081/windream.web.api/authentication/GetAuthenticationToken",
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Basic ${btoa(convert)}`,
            },
          }
        );

        if (response.status === 200) {
          setIsAuthenticated(true);
          localStorage.setItem("email", email);
          window.localStorage.setItem("logintoken",response.data.Token)
          window.localStorage.setItem("isloggedin", true)
        } else {
          throw new Error("Authentication failed");
        }
      } catch (error) {
        console.error("Error:", error.response);
        window.alert('Wrong Password Or Email')

      }
    }
  };
  const handleLogout = () => {
    setIsAuthenticated(false);
 
   

   localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    window.localStorage.removeItem("isloggedin");

    

   
   
  };
 
  const getEmail = () => {
    const email = localStorage.getItem("email") || "";
    localStorage.removeItem("email"); 
    return email;
};
const getPassword = () => {
  const password = localStorage.getItem("password") || "";
  localStorage.removeItem("password");
  return password;
};
  useEffect(() => {
    setEmail(getEmail());
    setPassword(getPassword());
  }, [])
  // const handleout = () =>{
  //   setIsAuthenticated(false);
  //   sessionStorage.getItem("email");
  //   sessionStorage.getItem("password")

  // }
  return (
    <React.StrictMode>
      <BrowserRouter>
        {isAuthenticated ? (
          <App handleLogout={handleLogout} 
          // handleout={handleout} 
          />
        ) : (
          <Login
            handleLogin={handleLogin}
            email={email}
            setEmail={setEmail}
            getPassword={getPassword}
            password={password}
            setPassword={setPassword}
          />
        )}
        
      </BrowserRouter>
    </React.StrictMode>
  );
};


ReactDOM.render(<Root />, document.getElementById("root"));



