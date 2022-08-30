import { Link } from "react-router-dom";
import "./css/info.css";

export const Info = () => {
  return (
    <div className="info-container default-page-spacing">
      <div className="information">
        <p>Welcome to Fieldness</p>
        <p>
          Fieldness is a kind of audio diary. Each entry is a seed. You can
          create your own collection over time and space.
        </p>
        <p>
          Our experience of the world is through our senses. By engaging with
          the act of listening, we can connect with the near and far, allowing
          us to behold the outside and inside at once. And slowly, over time, by
          tuning into our sonic field, we hear an invisible world.
        </p>
        <p>
          Fieldness started with the need to create a tool for myself to
          practice listening. To be able to sense the world through sound, being
          able to recall and revisit these sounds. Seeds became a metaphor for
          ‘a sonic observation’ bound by time and space. And Fieldness is the
          idea to interconnect our fields with others.
        </p>
        <p>
          You are invited to listen to fellow non human beings and share these
          encounters as seeds on the platform.
        </p>
        <Link to="/anatomy-of-a-seed" style={{ textDecoration: "underline" }}>
          Anatomy of a seed >>
        </Link>
      </div>

      <div>
        <p>Conceptualized and Designed by Sultana Zana</p>
        <p>Developed with love by Tanvi Bhakta, Sohom and Wildfire.</p>

        <p>
          Fieldness started as an idea in 2019. The first version was awarded
          the Five Million Incidents grant by Goethe Insitut, Delhi.
          https://old.fieldness.com/
        </p>

        <p>
          The second version of the app has been supported by Anup Pai and his
          faith in the idea.
        </p>

        <p>The work has been supported and exhibited by particle.art.</p>

        <p>
          I would like to thank Raqs media collective, Marialaura Ghidini, Gaia
          Tedone, Ruth Catlow, Mai Ishikawa Sutton, Compost magazine, Simar
          Kohli, Upasana Agarwal, Vivek Chockalingam Avril Stormy Unger, Paro
          and many others who have provided critique and feedback for this
          project to grow.
        </p>

        <p>
          Gifs and Icons used across the app are under the CC BY-SA 4.0 lisence.
        </p>

        <p>Gifs by Angelica Blevins - https://one.compost.digital/stickers/</p>

        <p>Icons from NounProject.com</p>
        <p>Collection by Andy Miranda</p>
        <p>Share by Fajar Annaba</p>
        <p>Spider by Lia Ironspoon</p>
        <p>Zero by Paffi from NounProject.com</p>

        <p>
          For any queries you could write directly to sultana.zana.ah@gmail.com
        </p>
      </div>
      <Link to="">More >></Link>
    </div>
  );
};
