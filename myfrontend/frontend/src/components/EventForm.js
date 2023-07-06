import axios from "axios";
import React,{useState,useEffect} from 'react'
import { ADD_EVENT_URL } from "../constants";
import {Link } from "react-router-dom";
import Navbar from "./Navbar";

const EventForm = () => {  
    const userSession = localStorage.getItem('user');
    const user = JSON.parse(userSession);
    const username = user ? user.username : null;
    const userId = user ? user.id:null
    const [error, setFormErrors] = useState('')
    const [formData,setFormData]=useState({
        event_name:"",
        description:"",
        date:"",
        time:"",
        location:"",
        user:userId
    })
const handleFormData =(e) =>{
    e.preventDefault();
    add_event(formData)
    }
const handleFormInput =(e)=>{
    const {name, value}= e.target;
    setFormData((data)=>({
        ...data,
        [name]:value
    }))
}
const add_event= async ()=>{
    try {
        console.log(formData.user)
        const response = await axios.post(ADD_EVENT_URL, formData, {
        headers: {
        "Content-Type": "application/json",
            },
        });
        
    if (response.data.success === true) {
         setFormErrors(response.data.info);
        }
    else if(response.data.success=== false) {
        setFormErrors(response.data.error);
        }
    }
    catch (error) {
    console.error("An error occurred:", error);
        }
};
return (
    <>
     <Navbar />
     <section className="dashboard">
      <div className="top">
        <i className="uil uil-bars sidebar-toggle"></i>
        <div className="search-box">
          <i className="uil uil-search"></i>
          <input type="text" placeholder="Search here..." />
        </div>
      </div>
      <div className="dash-content">
          <div className="activity-data">
                {/* <div className="data names">
                    <span className="data-title">
                    <br></br>
                    </span>
                </div> */}
            {username ? (
            <form className='event-form' onSubmit={ handleFormData }>
            <br></br>
                <span className="data-title"><h2>Add Event</h2></span>
                <span>
                    <label>
                        Even Name:
                    </label>
                    <input type="text" name="event_name" value={formData.event_name} required onChange={handleFormInput}/>
                    <input type="hidden" name="user" value={formData.user} required onChange={handleFormInput}/>
                </span><br /><br />
                <span>
                    <label>
                        Description:
                    </label>
                    <input type="text" name="description" value={formData.description} required onChange={handleFormInput}/>
                </span><br /><br />
                <span>
                    <label>
                        location :
                    </label>
                    <input type="text" name="location" value={formData.location}  required onChange={handleFormInput}/>
                </span><br /><br />
                <span>
                    <label>
                        Date:

                    </label>
                    <input type="date" name="date" value={formData.date} required onChange={handleFormInput}/>
                </span><br /><br />
                <span>
                    <label>
                        Time:
                    </label>
                    <input type="time" name="time" value={formData.time} required onChange={handleFormInput} />
                </span><br /><br />
                
                {/* <span>
                    <label>
                        Image:
                    </label>
                    <input type="file" name="image" required onChange={handleFormInput}/>
                </span><br /><br /> */}
                {Error && <span>{error}</span>} <br></br>
                <input type="submit" value="Add Event" />
            </form>
            ):(
                <div>
                    <p>Login to access this page <Link to="/">Login</Link></p>
                </div>
            )}
            </div>
    </div>
    </section>
</>
);
}
export default EventForm;
