import "../css/profile.css";
import { Bubble } from "../components/Bubble";
import { Link } from "react-router-dom";

export const Profile = () => {
  return (
    <div className="container profile-container">
      <div className="id">
        <span>big grasshopper gif</span>
        <span>User id: Zjhgdk</span>
      </div>
      <div className="links">
        <Link to="/">Back to land</Link>
        <Link to="/question">Start creating</Link>
      </div>
      <div className="created-seeds">
        <div className="bubbles">
          <Bubble />
          <Bubble />
          <Bubble />
          <Bubble />
        </div>
        <span className="label">created seeds</span>
      </div>
      <div className="collected-seeds">
        <div className="bubbles">
          <Bubble />
          <Bubble />
          <Bubble />
          <Bubble />
          <Bubble />
          <Bubble />
        </div>
        <span className="label">collected seeds</span>
      </div>
    </div>
  );
};
