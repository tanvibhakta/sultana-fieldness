import { useState } from "react";
import PropTypes from "prop-types";
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

export const Bubble = ({ className }, props) => {
  const [showModal, setShowModal] = useState(false);
  // TODO: bubble number should be initialized with seed.answers.bubbleNumber
  const [bubbleNumber, setBubbleNumber] = useState(null);

  const getBubble = (props) => {
    if (bubbleNumber === null) {
      const max = 5;
      const min = 1;
      setBubbleNumber(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    switch (bubbleNumber) {
      case 1:
        return <Bubble1 {...props} />;
      case 2:
        return <Bubble2 {...props} />;
      case 3:
        return <Bubble3 {...props} />;
      case 4:
        return <Bubble4 {...props} />;
      case 5:
        return <Bubble5 {...props} />;
    }
  };
  // TODO: set size by determining width as percentage of it's parent?
  return (
    <div>
      {getBubble({
        onClick: () => {
          setShowModal(true);
        },
        style: { height: "3.75rem" },
        // TODO: The bubble should only bounce once a seed has been created, and is added to the homescreen.
        // className: `bubble ${className}`,
        className: `${className}`,
        ...props,
      })}
      <div>
        <Modal
          isOpen={showModal}
          onRequestClose={() => {
            setShowModal(false);
          }}
          className={"modal purple-background"}
          overlayClassName={"overlay"}
        >
          <div className="bubble-container">
            <div className="user-id-and-audio">
              <div>{"<user id>"}</div>
              <AudioIcon></AudioIcon>
            </div>
            <div className="description">
              this is the description of the sounds curated from different
              places and times. This is the most important part. This is what
              will be transformative.
            </div>
            <div className="meta">
              <span>geoloc</span>
              <span>time</span>
              <span>country/city</span>
            </div>
            <div className="collect-and-share">
              {/* TODO: Add toasts for collecting and copying link*/}
              <CollectionJar></CollectionJar>
              <ShareIcon></ShareIcon>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

Bubble.propTypes = {
  className: PropTypes.string,
};
