import { Link } from "react-router-dom";

export const BubbleInput = () => {
  // TODO: Ask for permissions for location, audio recording, video recording APIs here
  return (
    <div>
      <form>
        {/*TODO: Put a WISYWIG here, perhaps TinyMCE?*/}
        <input type="textarea" />
        <button>Record Audio</button>
        <button>Click picture</button>
        <button type="submit">Skip</button>
        <Link to="/created">
          <button type="submit">submit</button>
        </Link>
      </form>
    </div>
  );
};
