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
    userName: user.userName,
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
    event.preventDefault();

    await postSeed(seed).then((response) => {
      if (response.status === 201) {
        navigate("/created");
      }
    });
  };

  function handleAudioStop(data) {
    console.log("stop", data);
  }

  function handleAudioUpload(data) {
    console.log("upload", data);
    setSeed({ ...seed, media: [data] });
  }

  function handleReset() {
    const reset = {
      url: null,
      blob: null,
      chunks: null,
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
      <RecordButton
        record={true}
        title={"New recording"}
        audioURL={(data) => {
          return data.url;
        }}
        showUIAudio
        handleAudioStop={(data) => handleAudioStop(data)}
        handleAudioUpload={(data) => handleAudioUpload(data)}
        handleReset={() => handleReset()}
        mimeTypeToUseWhenRecording={`audio/webm`}
      />
      {/* TODO: Record audio here */}
      {/* TODO: Obtain location here */}
      {/* TODO: handleAudioUpload(record.audioBlob) on button submit*/}
      <input
        className="bubble_input-submit"
        type="submit"
        value="Save>>"
        style={{ background: `url(${save})`, backgroundPosition: "center" }}
      />
    </form>
  );
};
