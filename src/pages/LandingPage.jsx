import { Link } from "react-router-dom";
import { Bubble } from "../components/Bubble";
import "../css/landingpage.css";

export const LandingPage = () => {
  return (
    <div className="container">
      <div className="buttons">
        <div className="start-journey big button">
          <Link to="/page1">Start Journey</Link>
        </div>
        <div className="register-user-and-map">
          <div className="register-user medium button">
            <Link to="/">Register to collect</Link>
          </div>
          <div className="map"></div>
        </div>
        <div className="info-button small button">
          <Link to="/">i</Link>
        </div>
        <div className="user-tab"></div>
      </div>
      <div className="bubbles">
        <div className="different">
          <Bubble />
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
