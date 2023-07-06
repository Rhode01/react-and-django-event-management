import { Routes,Route } from "react-router-dom";
import Signup from "./components/Signup";
import Header from "./components/Header";
import Login from "./components/Login";
import Home from "./components/Home";
import EventForm from "./components/EventForm";
import Events from "./components/Events";
import Notifications from "./components/Notifications"
import UserProfile from "./components/UserProfile"

function App() {
  return (
    <div className="App">
     <Routes>
          <Route path="/home" element ={<Home/>} />
          <Route path="/addEvent" element ={<EventForm/>} />
          <Route path="/" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/events" element={<Events/>} />
          <Route path="/notifications" element={<Notifications/>} />
          <Route path="/profile" element={<UserProfile/>} />
      </Routes>
    </div>
  );
}

export default App;
