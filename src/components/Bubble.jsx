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

// TODO: reclassify bubble types from alphabet based system to purpose based system
// TODO: switch case that renders correct svg given type

export const Bubble = ({ className }) => {
  const [showModal, setShowModal] = useState(false);
  // TODO: set size by determining width as percentage of it's parent?
  return (
    <div>
      <Bubble1
        onClick={() => {
          setShowModal(true);
        }}
        style={{ height: "3.75rem" }}
        className={`${className}`}
      >
        bub
      </Bubble1>
      <div className={`bubble`}>
        <Modal
          isOpen={showModal}
          onRequestClose={() => {
            setShowModal(false);
          }}
          className={"modal green-background"}
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
