import { Link } from "react-router-dom";
import "./css/info.css";

export const Info = () => {
  return (
    <div className="info-container default-page-spacing">
      <div className="information">
        <p>Welcome to Fieldness</p>
        <p>
          Fieldness is a kind of audio diary. Each entry is a seed. You can create your own collection over time and space. 

        </p>
        <p>
          Our experience of the world is through our senses. By engaging with the act of listening, we can connect with the near and far, allowing us to behold the outside and inside at once. And slowly, over time, by tuning into our sonic field, we hear an invisible world. 

        </p>
        <p>
           

Fieldness started with the need to create a tool for myself to practice listening. To be able to sense the world through sound, being able to recall and revisit these sounds. Seeds became a metaphor for ‘a sonic observation’ bound by time and space. And Fieldness is the idea to interconnect our fields with others. 

        </p>
        <p>You are invited to listen to fellow non human
          beings and share these encounters as seeds on the platform.
           <br /> Conceptualized and designed by Sultana Zana. 

        </p>
      </div>
      <Link to="/anatomy-of-a-seed">Anatomy of a seed >></Link>
    </div>
    </div>
      <Link to="">More >></Link>
    </div>
    
  );
};
