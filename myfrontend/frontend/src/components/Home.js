import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { LOGOUT_URL } from "../constants";
import './css/dashboard.css';
import Navbar from "./Navbar";
import RightBar from "./RightBar";
const Home = () => {
  const navigate = useNavigate();
  const userSession = localStorage.getItem('user');
  const user = JSON.parse(userSession);
  const isAuthenticated = user !== null;
  const id = user ?user.id :null
  console.log(id)
  const logout = async () => {
    try {
      const response = await axios.get(LOGOUT_URL);
      if (response.data.success === true) {
        localStorage.removeItem('user');
        navigate("/");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  return (
    <div>
      {isAuthenticated ? (
        <>
        <Navbar logout={logout} />
        <RightBar />
        </>
      ) : (
        <p>Please login to access this page <Link to="/">Login</Link></p>
      )}
    </div>
  );
};
export default Home;
