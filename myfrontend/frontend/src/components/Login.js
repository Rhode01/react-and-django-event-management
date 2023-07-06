import React from "react";
import axios from "axios";
import {useState, useEffect } from "react";
import {LOGIN_URL} from "../constants";
import './css/login.css'
import { Link, NavLink, useNavigate } from "react-router-dom";
const Header = (data) => {
  const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username:"",
         password:""
    });
    const [error, setFormErrors] = useState('')
    
    const handleFormData =(e) =>{
    const {name,value} = e.target;
    setFormData((data)=>({
        ...data,
        [name]:value
    }))
    }
    const login_user = async (formData) => {
    try {
      const response = await axios.post(LOGIN_URL, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 200) {
        console.log("Login successful");
        const user = response.data.user;
        localStorage.setItem('user', JSON.stringify(user));
         navigate("/home",{ state: { user } })
      } else {
        console.log("Login failed:", response.data.error);
        setFormErrors(response.data.error);
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
    }
  };
    const formSubmit =(e) =>{
        e.preventDefault();
        if(!formData.username){
             setFormErrors("username is required");
             return false
        }
        if(!formData.password){
             setFormErrors("password is required");
             return
        }
        login_user(formData)
    }
  return (
    <div className="app">
        <span className="title">Login</span>
         <form onSubmit={formSubmit} className="login-form ">
            
            <span>
                <label>
                    Username: 
                </label> 
                <input type="text" value={formData.username}  name="username" onChange={handleFormData} />
            </span><br/><br />
            <span>
                <label>
                    password: 
                </label> 
                <input type="password" value={formData.password} name="password" onChange={handleFormData}/>
            </span><br/><br />
            {/* <span>
                <label>
                    phone: 
                </label> 
                <input type="text" value={formDa.phone} placeholder="" name="phone" onChange={handleFormData}/> 
            </span>*/}
                
            {error && ( <span className="errors" style={{ color: 'red' }}>{error}</span>)}
           <span className="button-container"> <input type="submit" value="Login" /></span>
           <p >You dont have an account?{<Link to="signup" style={{textDecoration:'none'}} >Signup</Link>} Now</p>
         </form>

      </div>
        
  )
}

export default Header