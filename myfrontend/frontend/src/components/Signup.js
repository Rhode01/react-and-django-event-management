import React from "react";
import axios from "axios";
import {useState, useEffect } from "react";
import { SIGNUP_URL } from "../constants";
import './css/login.css'
import { Link } from "react-router-dom";
const Header = (data) => {
    
    const [formData, setFormData] = useState({
         username:"",
         password:"",
         password2:""
    });
    const [error, setFormErrors] = useState('')
    
    const handleFormData =(e) =>{
    const {name,value} = e.target;
    setFormData((data)=>({
        ...data,
        [name]:value
    }))
    }
    const signup_user = async (formData) => {
    try {
      const response = await axios.post(SIGNUP_URL, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.data.success === true) {
       setFormErrors(response.data.info);
       
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
             return false;
        }
        if(!formData.password){
             setFormErrors("password is required");
             return false;
        }
        if(!formData.password2){
             setFormErrors("confirm password is required");
             return false;
        }
        if(formData.password!=formData.password2){
            setFormErrors("passwords doesn't match please try again!!")
            return false;
        }
        signup_user(formData)
        setFormErrors('')
    }
  return (
    <div className="app">
        <span className="title">Signup</span>
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
            <span>
                <label>
                    password 2: 
                </label> 
                <input type="password" value={formData.password2} name="password2" onChange={handleFormData}/>
            </span><br/><br />
            {/* <span>
                <label>
                    phone: 
                </label> 
                <input type="text" value={formDa.phone} placeholder="" name="phone" onChange={handleFormData}/> 
            </span>*/}
                
            {error && ( <span className="errors" style={{ color: 'red' }}>{error}</span>)}
           <span className="button-container"><input type="submit" value="Signup" /></span>
           <p >Already have an account?{<Link to="/" style={{textDecoration:'none'}}>Login</Link>} Now</p>
         </form>

      </div>
        
  )
}

export default Header