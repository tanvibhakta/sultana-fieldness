import { useState } from "react";
import PropTypes from "prop-types";
import Modal from "react-modal";
import "../css/bubble.css";
import { ReactComponent as BubbleA } from "../assets/bubbles/bubble-a.svg";
import { ReactComponent as BubbleB } from "../assets/bubbles/bubble-b.svg";
import { ReactComponent as BubbleC } from "../assets/bubbles/bubble-c.svg";
import { ReactComponent as BubbleD } from "../assets/bubbles/bubble-d.svg";
import { ReactComponent as BubbleE } from "../assets/bubbles/bubble-e.svg";
import { ReactComponent as BubbleF } from "../assets/bubbles/bubble-f.svg";
import { ReactComponent as BubbleG } from "../assets/bubbles/bubble-g.svg";

// TODO: reclassify bubble types from alphabet based system to purpose based system
// TODO: switch case that renders correct svg given type

export const Bubble = ({ className }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <BubbleA
        onClick={() => {
          setShowModal(true);
        }}
        className={`${className}`}
      >
        bub
      </BubbleA>
      <div className={`bubble`}>
        <Modal
          isOpen={showModal}
          onRequestClose={() => {
            setShowModal(false);
          }}
        >
          <div>geolocation</div>
          <div>creation timestamp</div>
          <div>country/city</div>
          <div>text content if any</div>
        </Modal>
      </div>
    </div>
  );
};

Bubble.propTypes = {
  className: PropTypes.string,
};
