import React from 'react'
import Navbar from './Navbar';

const Notifications = () => {
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
                    <div className="data names">
                        <span className="data-title">
                        <h1>Notifications List</h1>
                        <br></br>
                        </span>
                    </div>
              </div>
            </div>
      </section>
      </>
  )
}

export default Notifications;