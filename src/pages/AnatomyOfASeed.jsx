import "./css/info.css";
import anatomy from "../assets/anatomy-of-a-seed.png";
import anatomy2x from "../assets/anatomy-of-a-seed@2x.png";
import anatomy3x from "../assets/anatomy-of-a-seed@3x.png";

export const AnatomyOfASeed = () => (
  <div className="anatomy-container">
    <div>
      <img
        srcSet={`${anatomy}, ${anatomy2x} 2x, ${anatomy3x} 3x`}
        src={anatomy}
        alt="A venn diagram displaying the properties of a seed"
      />
      <figcaption>Anatomy of a Seed</figcaption>
    </div>
    <div>
      <p>
        Seeds are events or encounters with more than human fellow beings-
        either as sonic impressions of their presence or absense.
      </p>
      <p>
        A seed is an observation : a snapshot of ones entanglement with other
        beings.
      </p>
    </div>
  </div>
);
