import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = (props) => {
    const userSession = localStorage.getItem('user');
    const user = JSON.parse(userSession);
    const username = user ? user.username : null;
    const userId = user ? user.id:null

    const myLinkStyle = {
      display: "flex",
      alignItems: "center",
      height: "50px",
      textDecoration: "none",
      position: "relative",
      color: "black",
    }

  return (
    <nav>
        <div className="top">
          <div className="title">
               <span className="text">
                Welcome {username}
               </span>
          </div>
        </div>
        <div className="menu-items">
              <ul className="nav-links">
                <li>
                  <Link to ="/home" style={myLinkStyle}> <i className="uil uil-estate"> </i>
                    <span className="link-name">Home</span>
                    </Link>
                </li>
                <li>
                  <Link to ="/events" style={myLinkStyle}> <i className="uil uil-book-open"> </i>
                    <span className="link-name">Events</span>
                    </Link>
                </li>
                <li>
                  <Link to ="/notifications" style={myLinkStyle}> <i className="uil uil-bell"> </i>
                    <span className="link-name">Notifications</span>
                    </Link>
                </li>
                <li>
                  <Link to ="#" style={myLinkStyle}> <i className="uil uil-users-alt"> </i>
                    <span className="link-name">Friends</span>
                    </Link>
                </li>
                <li>
                  <Link to ="/profile" style={myLinkStyle}> <i className="uil uil-user"> </i>
                    <span className="link-name">Profile</span>
                    </Link>
                </li>
              </ul>
              <ul className="logout-mode">
                <li>
                    <i className="uil uil-signout"></i>
                    <span className="link-name" onClick={props.logout}>Logout</span>
                </li>
              </ul>
        </div>
    </nav>
        
  )
}

export default Navbar;