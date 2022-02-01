import "./css/profile.css";
import { Bubble } from "../components/Bubble";
import { Link } from "react-router-dom";
import { UserContext } from "../lib/UserContext";
import { getUser } from "../api";
import { useContext, useEffect } from "react";

export const Profile = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    // Async here instead of outer function to prevent race conditions
    async function fetchData() {
      if (user && user.userName) {
        await getUser(user.userName).then((response) => {
          if (response.status === 200) {
            setUser(response.body);
          } else {
            console.error(response.status);
          }
        });
      }
    }
  }, [user]);

  return (
    <div className="container profile-container">
      <div className="id">
        <span>big grasshopper gif</span>
        <span>User Name: {user?.userName}</span>
      </div>
      <div className="links">
        <Link to="/">Back to land</Link>
        <Link to="/question">Start creating</Link>
      </div>
      <div className="created-seeds">
        <div className="bubbles">
          <Bubble />
          <Bubble />
          <Bubble />
          <Bubble />
        </div>
        <span className="label">created seeds</span>
      </div>
      <div className="collected-seeds">
        <div className="bubbles">
          <Bubble />
          <Bubble />
          <Bubble />
          <Bubble />
          <Bubble />
          <Bubble />
        </div>
        <span className="label">collected seeds</span>
      </div>
    </div>
  );
};
