import { Link } from "react-router-dom";
import { Bubble } from "../components/Bubble";
import "./css/landingpage.css";
import { ReactComponent as UserIcon } from "../assets/user.svg";
import { ReactComponent as WorldMap } from "../assets/world-map.svg";
import { useContext } from "react";
import { UserContext } from "../lib/UserContext";

export const LandingPage = () => {
  const user = useContext(UserContext).user;

  return (
    <div className="container landing-page-container">
      <div className="buttons">
        <div className="start-journey">
          <Link to="/Story">
            <div className="big button">Start Journey</div>
          </Link>
        </div>
        <div className="register-user-and-map">
          <div className="register-user">
            <Link to="/register">
              <div className="medium button">Register to collect</div>
            </Link>
          </div>
          <div className="map">
            <WorldMap></WorldMap>
          </div>
        </div>
        <div className="info-button">
          <Link to="/info">
            <div className="small button">i</div>
          </Link>
        </div>
        {user.userName && (
          <div className="user-tab">
            <Link to="profile">
              <div className="tab">
                <UserIcon></UserIcon>
              </div>
            </Link>
          </div>
        )}
      </div>
      <div className="bubbles-container">
        <div className="different">
          <Bubble className="bubble_a" />
          <Bubble />
          <Bubble />
        </div>
        <div className="types">
          <Bubble />
          <Bubble />
          <Bubble />
          <Bubble />
          <Bubble />
          <Bubble />
          <Bubble />
        </div>
        <div className="of">
          <Bubble />
          <Bubble />
          <Bubble />
          <Bubble />
        </div>
        <div className="columns">
          <Bubble />
          <Bubble />
        </div>
      </div>
    </div>
  );
};
