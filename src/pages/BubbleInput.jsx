import { Link } from "react-router-dom";
import "./css/bubbleinput.css";

export const BubbleInput = () => {
  // TODO: Ask for permissions for location, audio recording, video recording APIs here
  return (
    <div className="bubble_input-container container">
      <p>You are now creating a seed</p>
      <form>
        {/*TODO: Put a WISYWIG here, perhaps TinyMCE?*/}
        <div className="bubble_input-description">
          <label
            htmlFor="description"
            className="bubble_input-description-label"
          >
            Input Text
          </label>
          <input
            name="description"
            id="description"
            className="bubble_input-description-input"
            type="textarea"
          />
        </div>
        <button>Record Audio</button>
        <button>Click picture</button>
        {/*<button type="submit">Skip</button>*/}
        <Link to="/created">
          <button className="bubble_input-submit" type="submit">
            Save>>
          </button>
        </Link>
      </form>
    </div>
  );
};
