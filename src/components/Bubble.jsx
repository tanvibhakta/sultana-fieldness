import { useState, useEffect } from "react";
import Modal from "react-modal";
import "./css/bubble.css";
import { ReactComponent as Bubble1 } from "../assets/bubbles/bubble-1.svg";
import { ReactComponent as Bubble2 } from "../assets/bubbles/bubble-2.svg";
import { ReactComponent as Bubble3 } from "../assets/bubbles/bubble-3.svg";
import { ReactComponent as Bubble4 } from "../assets/bubbles/bubble-4.svg";
import { ReactComponent as Bubble5 } from "../assets/bubbles/bubble-5.svg";
import { ReactComponent as AudioIcon } from "../assets/audio.svg";
import { ReactComponent as CollectionJar } from "../assets/collection-jar.svg";
import { ReactComponent as ShareIcon } from "../assets/share.svg";
import { getSeed } from "../api";

const S3_URL = "https://fieldness.s3.ap-south-1.amazonaws.com";

export const Bubble = ({ className, id, name }) => {
  const [showModal, setShowModal] = useState(false);
  // TODO: bubble number should be initialized with seed.answers.bubbleNumber
  const [seed, setSeed] = useState(null);

  // TODO: use seed.misc.timeZone while calculating locale string
  const d = new Date(seed?.createdAt).toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    year: "2-digit",
  });

  let ans;
  try {
    ans = JSON.parse(seed?.answers);
  } catch {
    ans = { bubbleNumber: 2 };
  }

  const getBubble = (onClick) => {
    switch (ans?.bubbleNumber) {
      case 1:
        return <Bubble1 onClick={onClick} />;
      case 2:
        return <Bubble2 onClick={onClick} />;
      case 3:
        return <Bubble3 onClick={onClick} />;
      case 4:
        return <Bubble4 onClick={onClick} />;
      case 5:
        return <Bubble5 onClick={onClick} />;
      default:
        return <Bubble3 onClick={onClick} />;
    }
  };

  useEffect(() => {
    // Async here instead of outer function to prevent race conditions
    async function fetchData() {
      await getSeed(id)
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
        })
        .then((data) => {
          if (JSON.stringify(seed) != JSON.stringify(data)) {
            setSeed(data);
          }
        })
        .catch((response) => {
          console.error(response.status);
        });
    }
    fetchData();
  });

  return (
    <div
      // TODO: The bubble should only bounce once a seed has been created, and is added to the homescreen.
      className="bubble"
    >
      {getBubble(() => {
        setShowModal(true);
      })}
      {seed && (
        <div>
          {/* TODO: set size by determining width as percentage of it's parent?*/}
          <Modal
            isOpen={showModal}
            onRequestClose={() => {
              setShowModal(false);
            }}
            className={"modal purple-background"}
            overlayClassName={"overlay"}
            appElement={document.getElementById("root")}
          >
            <div className="bubble-container">
              <div className="user-id-and-audio">
                <div>{name}</div>
                {showModal && seed.media[0] && (
                  <audio
                    src={`${S3_URL}/${seed.userName}/${seed.id}/${seed.media[0]}`}
                    autoPlay
                  />
                )}
                <AudioIcon></AudioIcon>
              </div>
              <div className="description">{seed.description}</div>
              <div className="meta">
                {/* tODO: format
                   12.234
                   43.243*/}
                <span>{seed.geolocation.latitude}</span>
                <span>{d}</span>
                <span>{`${seed.country}/${seed.city}`}</span>
              </div>
              <div className="collect-and-share">
                {/* TODO: Add toasts for collecting and copying link*/}
                <CollectionJar></CollectionJar>
                <ShareIcon></ShareIcon>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
};
