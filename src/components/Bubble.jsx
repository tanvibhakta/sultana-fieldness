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
