import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import { USER_EVENTS_URL } from '../constants';
import { Link } from 'react-router-dom';
import Event from './Event';
const EventList = () => {
  const userSession = localStorage.getItem('user');
  const user = JSON.parse(userSession);
  const isAuthenticated = user !== null;
  const [events, setEvents] = useState([]);
  const [eventId, setEventId] = useState('')
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
  const eventStyle = {
    width:"30%"
  }
  const handleShowEvent = (e) =>{
   setEventId(e)
  }
  return (
      <div>
        {isAuthenticated ? (
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
                        <div className="data names">
                            <span className="data-title">
                            <h1>Event List</h1>
                            <br></br>
                            </span>
                        </div>
                        {events.length > 0 ? (
                    <div className="events">
                         {events.map((event) => (
                            <div key={event.pk}>
                            <p style={{marginBottom:"20px", cursor: "pointer"}} onClick={() => handleShowEvent(event.pk)}>{event.event_name}</p>
                            </div>
                        ))}
                        {eventId && <Event id={eventId} />}
                        <Link to ="/addEvent" style={linkButttonStyle}>Add event</Link>
                    </div>
                        ):(
                            <div>
                            <p style={{marginBottom:"22px"}}>You don't have any events</p>
                            <Link to="/addEvent" style={linkButttonStyle}>Add Event </Link>
                            </div>
                        )}
                  </div>
                </div>
          </section>
          </>
          ):(
            <div className="dash-content">
              <div className="activity-data">
                <span className='data-title'>
                  <h5>Please Login to Access this page</h5>
                </span>
             </div>
            </div>
          )}
    </div>
  );
};
export default EventList;
