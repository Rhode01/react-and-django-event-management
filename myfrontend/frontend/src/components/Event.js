import React, { useEffect,useState } from 'react'
import PropTypes from 'prop-types';
import axios from 'axios';
import { ClICKED_EVENT } from '../constants';
const Event = (props) => {
    const [event, setEvent]= useState([]);
    const  eventId = props.id
    const userSession = localStorage.getItem('user');
    const user = JSON.parse(userSession);
    const userId = user ? user.id:null
    useEffect( ()=>{
        const fetchClickedEvent = async () =>{
        try{
            const response = await axios.get(`${ClICKED_EVENT}${userId}/${eventId}/`);
            if(response.data.success=true){
                setEvent(response.data.event)
            }
            else{
                console.log("Failed to retreive an event")
            }
        }
        catch (error){
            console.log("an errror occured", error)
        }
    };
    fetchClickedEvent();
    },[eventId])
    const EventCss = {
        fontFamily: "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "20px",
        height: "80vh",
        width: "70%",
        // background: "#f8f9fd",
        padding: "40px",
        color: "#333",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        margin: "-25% auto 20px",
    };

  return (
    <>
    {userId ? (
        <div className="activity-data">
            <div className="data names">
            </div>
            {event.map((event) => (
            <div key={event.pk} style={EventCss}>
                <p style={{marginBottom:"20px" }}>Event Name: {event.event_name}</p>
                <p style={{marginBottom:"20px" }}>Description: {event.description}</p>
                <p style={{marginBottom:"20px" }}>Location: {event.location}</p>
                <p style={{marginBottom:"20px" }}>Date: {event.date}</p>
                <p style={{marginBottom:"20px" }}>Time: {event.description}</p>
                </div>
            ))}
        </div>
    ):(
        <div> <h5>Please Login to access this page</h5></div>

    )}
    </>
  )
}
Event.propTypes = {
  id: PropTypes.number.isRequired,
};
export default Event;
