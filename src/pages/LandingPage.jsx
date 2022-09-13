import { Link } from "react-router-dom";
import { Bubble } from "../components/Bubble";
import "./css/landingpage.css";
import { useContext } from "react";
import { UserContext } from "../lib/UserContext";
import { ReactComponent as CollectionJar } from "../assets/collection-jar.svg";
import { ReactComponent as EmptySeed } from "../assets/empty_seed.svg";
import { ReactComponent as Arrow } from "../assets/arrow.svg";

export const LandingPage = () => {
  const user = useContext(UserContext).user;

  return (
    <div className="container landing-page-container">
      <div className="buttons">
        <Link to="/info" className="button">
          i
        </Link>
        <Link to="/register" className="button">
          Sign Up/Login
        </Link>
        {user?.name && (
          <Link to="/profile" className="button">
            <CollectionJar />
          </Link>
        )}
        <Link to="/question" className="button">
          <EmptySeed />
        </Link>
        <Link to="/story" className="button">
          <Arrow className="arrow right" />
        </Link>
      </div>
      <div className="bubbles-container">
        <div className="column">
          <Bubble className="bubble_a" />
          <Bubble />
          <Bubble />
        </div>
        <div className="column">
          <Bubble />
          <Bubble />
          <Bubble />
          <Bubble />
          <Bubble />
          <Bubble />
          <Bubble />
        </div>
        <div className="column">
          <Bubble />
          <Bubble />
          <Bubble />
          <Bubble />
        </div>
        <div className="column">
          <Bubble />
          <Bubble />
        </div>
      </div>
    </div>
  );
};
