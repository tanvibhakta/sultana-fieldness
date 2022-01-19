import { Link } from "react-router-dom";
import { Bubble } from "../components/Bubble";
import "./css/landingpage.css";
import { ReactComponent as UserIcon } from "../assets/user.svg";
import { ReactComponent as WorldMap } from "../assets/world-map.svg";

export const LandingPage = () => {
  return (
    <div className="container landing-page-container">
      <div className="buttons">
        <div className="start-journey">
          <div className="big button">
            <Link to="/page1">Start Journey</Link>
          </div>
        </div>
        <div className="register-user-and-map">
          <div className="register-user medium button">
            {/* TODO: create user sign up form and link it here*/}
            <Link to="/register">Register to collect</Link>
          </div>
          <div className="map">
            <WorldMap></WorldMap>
          </div>
        </div>
        <div className="info-button">
          <div className="small button">
            {/* TODO: what sort of thing goes here? */}
            <Link to="/info">i</Link>
          </div>
        </div>
        <div className="user-tab tab">
          {/* Show only if cached user id exists / once user has registered*/}
          {/* TODO: create user profile page and link it here*/}
          <Link to="profile">
            <UserIcon></UserIcon>
          </Link>
        </div>
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
