import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { UserContext } from "../lib/UserContext";
import { postSeed } from "../api";
import save from "../assets/save.png";
import "./css/bubbleinput.css";
import MushroomNet from "../assets/gifs/mushroom_net.gif";

export const BubbleInput = () => {
  const user = useContext(UserContext).user;
  const [seed, setSeed] = useState({
    description: "",
    name: user.name,
    favouriteWord: user.favouriteWord,
    media: [],
    latitude: "",
    longitude: "",
  });

  const fileInputAudio = useRef();
  const fileInputImage = useRef();
  const navigate = useNavigate();

  const handleChange = (event) => {
    // Structure the object so that it's easy for getFormData to work around it
    if (event.target.name === "audio" || event.target.name === "image") {
      const fileInput =
        event.target.name === "audio" ? fileInputAudio : fileInputImage;
      setSeed({
        ...seed,
        media: [
          ...seed.media,
          {
            file: fileInput.current.files[0],
            name: fileInput.current.files[0].name,
          },
        ],
      });
    } else {
      setSeed({
        ...seed,
        [event.target.name]: event.target.value,
      });
    }
  };

  useEffect(() => {
    const seedId = nanoid();
    setSeed({
      ...seed,
      id: seedId,
    });
  }, [seed.description]);

  const handleSubmit = async (event) => {
    // TODO: use the below to get the timezone from client and add to 'misc' or
    //  'answers' option. make sure to update on /upload as well
    // console.log(Intl.DateTimeFormat().resolvedOptions().timeZone)

    event.preventDefault();

    await postSeed(seed).then((response) => {
      if (response.status === 201) {
        navigate("/created");
      }
    });
  };

  // TODO: Ask for permissions for location, audio recording, video recording APIs here
  return (
    <form className="bubble_input-container container" onSubmit={handleSubmit}>
      <div className="bubble_input-description">
        <label htmlFor="description" className="bubble_input-description-label">
          Input Text
        </label>
        {/*TODO: Put a WISYWIG here, perhaps TinyMCE?*/}
        <textarea
          name="description"
          id="description"
          className="bubble_input-description-input"
          value={seed?.description}
          onChange={handleChange}
          rows="5"
          cols="63"
          required
        />
      </div>
      <button className="bubble_input-record">REC</button>
      {/* TODO: Record audio here */}
      {/* TODO: Obtain location here */}
      <input
        className="bubble_input-submit"
        type="submit"
        value="Save>>"
        style={{ background: `url(${save})`, backgroundPosition: "center" }}
      />
      {/*TODO: fix the css with this page!!*/}
      <img src={MushroomNet} alt="mushroom" className="mushroom_net" />
    </form>
  );
};
