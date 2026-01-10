import { useNavigate } from "react-router-dom";
import axios from "axios";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.get("http://localhost:8000/user/logout", {
      withCredentials: true,
    });
    localStorage.removeItem("currUser"); // Remove user
    navigate("/login");
  };

  // Auto-logout when component mounts
  handleLogout();

  return null; // Nothing to display
}

export default Logout;
