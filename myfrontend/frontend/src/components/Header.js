import React from "react";
import axios from "axios";
import {useState, useEffect } from "react";
import {API_URL} from "../constants";

const formData ={
    name:"",
    email :"",
    phone:""
    }
const Header = () => {
    const [formDa, setFormData] = useState(formData);
    const [error, setFormErrors] = useState('')
    const handleFormData =(e) =>{
    const {name,value} = e.target;
    setFormData((data)=>({
        ...data,
        name:[value]
    }))
    }
    const formSubmit =(e) =>{
        e.preventDefault();
        if(!formDa.name){
             setFormErrors("name is required");
             return false
        }
        if(!formDa.email){
             setFormErrors("email is required");
             return
        }
        if(!formDa.phone){
             setFormErrors("phone is required");
            return
        }
    }
    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(API_URL);
        const data= (response.data);
        console.log(data)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
         <form onSubmit={formSubmit}>
            <span>
                <label>
                    Name: 
                </label> 
                <input type="text" value={formDa.name} placeholder="" name="name" onChange={handleFormData} />
            </span><br/><br />
            <span>
                <label>
                    Email: 
                </label> 
                <input type="text" value={formDa.email}placeholder="" name="email" onChange={handleFormData}/>
            </span><br/><br />
            <span>
                <label>
                    phone: 
                </label> 
                <input type="text" value={formDa.phone} placeholder="" name="phone" onChange={handleFormData}/>
            </span><br/>{error && ( <span className="errors" style={{ color: 'red' }}>{error}</span>)}<br />
            
            <input type="submit" value="submit" />
            
         </form>

      </div>
        
  )
}

export default Header