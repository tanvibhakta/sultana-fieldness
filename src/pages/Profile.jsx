import "./css/profile.css";
import { Bubble } from "../components/Bubble";
import { Link } from "react-router-dom";
import { UserContext } from "../lib/UserContext";
import { getUser } from "../api";
import { useContext, useEffect } from "react";
import MantisComputer from "../assets/gifs/mantis_computer.gif";
import { ReactComponent as EmptySeed } from "../assets/empty_seed.svg";

export const Profile = () => {
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    // Async here instead of outer function to prevent race conditions
    async function fetchData() {
      if (user && user.name) {
        await getUser(user.name)
          .then((response) => {
            if (response.status === 200) {
              return response.json();
            }
          })
          .then((data) => {
            setUser(data);
          })
          .catch((response) => {
            console.error(response.status);
          });
      }
    }

    fetchData();
  }, [user]);

  return (
    <div className="container profile-container">
      <div className="id">
        <img src={MantisComputer} alt="loading..." />
        <span>User Name: {user?.name}</span>
      </div>
      <div className="links">
        <Link to="/">Back to land</Link>
        <Link to="/question" className="button">
          <EmptySeed />
        </Link>
      </div>
      <div className="created-seeds">
        {/* TODO: Populate from API */}
        <div className="bubbles">
          <Bubble />
          <Bubble />
          <Bubble />
          <Bubble />
        </div>
        <span className="label">created seeds</span>
      </div>
      <div className="collected-seeds">
        {/* TODO: Populate from API */}
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
