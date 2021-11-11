import { useState } from "react";
import Modal from "react-modal";

export const Bubble = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <button
        onClick={() => {
          setShowModal(true);
        }}
      >
        bub
      </button>
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

export const BubbleInput = () => {
  // Should probably be on a separate page
  // TODO: Ask for permissions for location, audio recording, video recording APIs here
  return (
    <div>
      <form>
        {/*TODO: Put a WISYWIG here, perhaps TinyMCE?*/}
        <input type="textarea" />
        <button>Record Audio</button>
        <button>Click picture</button>
        <button type="submit">Skip</button>
        <button type="submit">submit</button>
      </form>
    </div>
  );
};
