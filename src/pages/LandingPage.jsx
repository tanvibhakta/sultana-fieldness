import { Link } from "react-router-dom";
import { Bubble } from "../components/Bubble";
import "./css/landingpage.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../lib/UserContext";
import { ReactComponent as CollectionJar } from "../assets/collection-jar.svg";
import { ReactComponent as EmptySeed } from "../assets/empty_seed.svg";
import { ReactComponent as Arrow } from "../assets/arrow.svg";
import { getUser } from "../api";

export const LandingPage = () => {
  const user = useContext(UserContext).user;
  const [landing, setLanding] = useState(null);

  useEffect(() => {
    // Async here instead of outer function to prevent race conditions
    async function fetchData() {
      await getUser("kaldi moss")
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
        })
        .then((data) => {
          if (JSON.stringify(landing) != JSON.stringify(data)) {
            setLanding(data);
          }
        })
        .catch((response) => {
          console.error(response.status);
          setLanding(landing);
        });
    }
    fetchData();
  });

  const columns = { A: [], B: [], C: [], D: [] };
  landing?.seedCreated.map((seedID, i) => {
    if (i < 3) {
      columns.A.push(seedID);
    } else if (i < 9) {
      columns.B.push(seedID);
    } else if (i < 13) {
      columns.C.push(seedID);
    } else if (i < 17) {
      columns.D.push(seedID);
    } else {
      //  TODO: What if the number of seeds increases 17?
    }
  });

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
          {columns.A.map((seedID) => (
            <Bubble key={seedID} id={seedID} name="kaldi moss" />
          ))}
        </div>
        <div className="column">
          {columns.B.map((seedID) => (
            <Bubble key={seedID} id={seedID} name="kaldi moss" />
          ))}
        </div>
        <div className="column">
          {columns.C.map((seedID) => (
            <Bubble key={seedID} id={seedID} name="kaldi moss" />
          ))}
        </div>
        <div className="column">
          {columns.D.map((seedID) => (
            <Bubble key={seedID} id={seedID} name="kaldi moss" />
          ))}
        </div>
      </div>
    </div>
  );
};
