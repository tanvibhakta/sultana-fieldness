import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { UserContext } from "../lib/UserContext";
import { postSeed } from "../api";
import save from "../assets/save.png";
import "./css/bubbleinput.css";
import { RecordButton } from "../components/RecordButton";

export const BubbleInput = () => {
  const user = useContext(UserContext).user;
  const [seed, setSeed] = useState({
    description: "",
    name: user.name,
    favouriteWord: user.favouriteWord,
    media: [],
    latitude: "",
    longitude: "",
    answers: window.localStorage.getItem("answers"),
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    setSeed({
      ...seed,
      [event.target.name]: event.target.value,
    });
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

  function handleAudioStop(data) {
    setSeed({
      ...seed,
      media: [...seed.media, { file: data.file, name: data.file.name }],
    });
  }

  function handleReset() {
    const reset = {
      url: null,
      blob: null,
      chunks: null,
      file: null,
      duration: {
        h: 0,
        m: 0,
        s: 0,
      },
    };
    setSeed({ ...seed, media: [reset] });
  }

  // TODO: Ask for permissions for location, audio recording, video recording APIs here
  return (
    <>
      <form
        className="bubble_input-container container"
        onSubmit={handleSubmit}
      >
        <div className="bubble_input-description">
          <label
            htmlFor="description"
            className="bubble_input-description-label"
          >
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
        <RecordButton
          record={true}
          title={"New recording"}
          handleAudioStop={(data) => handleAudioStop(data)}
          handleReset={() => handleReset()}
          mimeTypeToUseWhenRecording={`audio/webm`}
        />
        {/* TODO: Obtain location here */}
        <input
          className="bubble_input-submit"
          type="submit"
          value="Save>>"
          style={{ background: `url(${save})`, backgroundPosition: "center" }}
        />
      </form>
    </>
  );
};
