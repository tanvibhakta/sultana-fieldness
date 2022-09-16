import { Link } from "react-router-dom";
import { Bubble } from "../components/Bubble";
import "./css/landingpage.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../lib/UserContext";
import { ReactComponent as CollectionJar } from "../assets/collection-jar.svg";
import { ReactComponent as EmptySeed } from "../assets/empty_seed.svg";
import { ReactComponent as FrontArrow } from "../assets/front-arrow.svg";
import { ReactComponent as BackArrow } from "../assets/back-arrow.svg";
import { getUser } from "../api";
import Modal from "react-modal";

export const LandingPage = () => {
  const user = useContext(UserContext).user;
  const [landing, setLanding] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(true);

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

  const columns = { A: [], B: [], C: [], D: [], E: [] };
  landing?.seedCreated.map((seedID, i) => {
    const modulus = i % 5;
    switch (modulus) {
      case 0:
        columns.A.push(seedID);
        break;
      case 1:
        columns.B.push(seedID);
        break;
      case 2:
        columns.C.push(seedID);
        break;
      case 3:
        columns.D.push(seedID);
        break;
      case 4:
        columns.E.push(seedID);
        break;
    }
  });

  return (
    <div className="container landing-page-container">
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => {
          setIsModalOpen(false);
        }}
        className={"regular-background"}
        overlayClassName={"overlay"}
        appElement={document.getElementById("root")}
      >
        <div className="intro-text">
          <p>Welcome to Fieldness.</p>
          <p>
            Use headphones or increase your volume to hear the seeds on this
            page.
          </p>
          <p> Tap on the seeds to hear them.</p>
          <p>
            Create a profile for best experience and to be able to collect
            sounds.{" "}
          </p>{" "}
          <p>
            {" "}
            Tap your way around, make sure to take the journey, create a seed,
            explore your own page and collect seeds you like.
          </p>{" "}
          <p> Enjoy listening!</p>
        </div>
      </Modal>
      <div className="upper-container">
        <div className="back-to-exhibition">
          <a href="https://www.particle.art/DisturbingTheBalance/?interact">
            <BackArrow className="arrow" />
          </a>
        </div>
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
            <FrontArrow className="arrow" />
          </Link>
        </div>
      </div>
      <div className="bubbles-container">
        <div className="column">
          {columns.A.map((seedID) => (
            <Bubble key={seedID} id={seedID} name="kaldi moss" />
          ))}
        </div>
        <div className="column B">
          {columns.B.map((seedID) => (
            <Bubble
              key={seedID}
              id={seedID}
              name="kaldi moss"
              className="smaller-padding"
            />
          ))}
        </div>
        <div className="column">
          {columns.C.map((seedID) => (
            <Bubble key={seedID} id={seedID} name="kaldi moss" />
          ))}
        </div>
        <div className="column D">
          {columns.D.map((seedID) => (
            <Bubble
              key={seedID}
              id={seedID}
              name="kaldi moss"
              className="smaller-padding"
            />
          ))}
        </div>
        <div className="column">
          {columns.E.map((seedID) => (
            <Bubble key={seedID} id={seedID} name="kaldi moss" />
          ))}
        </div>
      </div>
    </div>
  );
};
