import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react'
import { USER_EVENTS_URL } from '../constants';
import { Link } from 'react-router-dom';
const RightBar = (props) => {
    const userSession = localStorage.getItem('user');
    const user = JSON.parse(userSession);
    const isAuthenticated = user !== null;
    const [events, setEvents] = useState([]);
    useEffect(() => {
    const fetchUserEvents = async () => {
      try {
        const userId = user ? user.id : null;
        const response = await axios.get(`${USER_EVENTS_URL}${userId}/`);
        if (response.data.success === true) {
          setEvents(response.data.events);
        } else {
          console.log("Failed to connect to the database");
        }
      } catch (error) {
        console.log("An error occurred:", error);
      }
    };

    fetchUserEvents();
  }, []);
  const linkButttonStyle ={
    background:"#6cf0c2",
    padding:"10px",
    textDecoration:"none",
    margin:"25px,25px,25px,0px"

  }
  return ( 
    <>
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
            <div className="data names">
                <span className="data-title">
                <br></br>
                    <h4>Event List</h4>
                </span>
                    {events.length > 0 ? (
                    <div className="events">
                         {events.map((event) => (
                            <div key={event.pk}>
                            <p>{event.event_name}</p>
                            </div>
                        ))}
                        <Link to ="/addEvent" style={{ textDecoration: "none" }}>Add event</Link>
                    </div>
                        ):(
                            <div>
                            <p style={{marginBottom :"20px"}}>You don't have any events</p>
                            <Link to="/addEvent" style={linkButttonStyle}>Add Event </Link>
                            </div>
                        )}
                
        </div>
    </div>
    </div>
    </section>
    </>
  )
}

export default RightBar;