export const StateMessages = ({ status }) => {
  switch (status) {
    case 201:
      return (
        <div className="success-message">
          {" "}
          Your seed was successfully created! Submit another:{" "}
        </div>
      );
      break;
  }
};
