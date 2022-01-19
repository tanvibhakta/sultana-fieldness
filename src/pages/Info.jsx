import { Link } from "react-router-dom";
import "./css/info.css";

export const Info = () => {
  return (
    <div className="info-container default-page-spacing">
      <div className="information">
        <p>What is Fieldness?</p>
        <p>
          We live in many physical and metaphysical force fields that inform our
          perception and sensation of what we consider 'our world'.
        </p>
        <br />
        <br />
        <br />
        <p>
          As our lived world becomes more hybrid - with information fields
          weaved into our sensorial fields in intricate ways, Fieldness invites
          us to observe our world by shifting our lenses, becoming aware of what
          we cannot know.
        </p>
        <p>What is a seed?</p>
      </div>
      <Link to="/anatomy-of-a-seed">Anatomy of a seed >></Link>
    </div>
  );
};
