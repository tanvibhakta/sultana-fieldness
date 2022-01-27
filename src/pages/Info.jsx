import { Link } from "react-router-dom";
import "./css/info.css";

export const Info = () => {
  return (
    <div className="info-container default-page-spacing">
      <div className="information">
        <p>What is Fieldness?</p>
        <p>
          Fieldness is platform on one side and a tool to investigate the
          meaning of ‘value’ on the other. <br /> It is media art project
          conceptulaized and designed by Sultana Zana.
        </p>
        <p>
          Why Fieldness?
          <br /> We live in many physical and metaphysical force fields that
          inform our perception and sensation of what we consider 'our world'.
        </p>
        <p>
          As our lived ‘world’ becomes more hybrid - with information fields
          weaved into our sensorial fields in intricate ways, Fieldness invites
          us to observe ‘the world’ in a new way - by shifting our lenses,
          becoming aware of what we cannot know directly, what is outside the
          realm of direct human perception and what we are learnign to
          systematically ignore.
        </p>
        <p>
          Fieldness invites you to see the world as seen by fellow non human
          beings and share these encounters as seeds on the platform.
        </p>
      </div>
      <Link to="/anatomy-of-a-seed">Anatomy of a seed >></Link>
    </div>
  );
};
