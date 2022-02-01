import "./css/statemessages.css";

export const StateMessages = ({ status }) => {
  switch (status) {
    case 201:
      return (
        <div className="message success-message">
          Your seed was successfully created! Submit another:
        </div>
      );
    default:
      console.error(status, "There was an error");
  }
};
