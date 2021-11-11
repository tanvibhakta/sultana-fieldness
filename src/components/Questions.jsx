import { Link } from "react-router-dom";

export const Questions = () => {
  return (
    <div>
      <form>
        <p>How far are you from a motorway?</p>
        <input type="range" />
        <Link to="/bubble-input">next>></Link>
      </form>
    </div>
  );
};
