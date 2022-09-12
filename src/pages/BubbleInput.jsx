import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { UserContext } from "../lib/UserContext";
import { postSeed } from "../api";
import save from "../assets/save.png";
import "./css/bubbleinput.css";
import { RecordButton } from "../components/RecordButton";
import { AudioTrack } from "../components/AudioTrack";
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
    answers: "",
  });
  const [audio, setAudio] = useState({
    url: null,
    blob: null,
    chunks: null,
    base64data: null,
    duration: {
      h: 0,
      m: 0,
      s: 0,
    },
  });

  const fileInputAudio = useRef();
  const fileInputImage = useRef();
  const navigate = useNavigate();

  const handleChange = (event) => {
    // Structure the object so that it's easy for getFormData to work around it
    if (event.target.name === "audio" || event.target.name === "image") {
      // what is the point of giving the ref here?
      const fileInput =
        event.target.name === "audio" ? fileInputAudio : fileInputImage;
      setSeed({
        ...seed,
        media: [
          ...seed.media,
          {
            // TODO: Get audio.blog and set it here
            // file: fileInput.current.files[0],
            file: audio.blob,
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
      media: [{ file: audio && audio.base64data, name: `random_blob` }],
    });
  }, [seed.description, audio]);

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
    // get base64 string from blob and save it
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64data = reader.result;
      setAudio({ ...data, base64data: base64data });
    };
    reader.readAsDataURL(data.blob);
  }

  function handleReset() {
    const reset = {
      url: null,
      blob: null,
      chunks: null,
      base64data: null,
      duration: {
        h: 0,
        m: 0,
        s: 0,
      },
    };
    setAudio(reset);
    // setSeed({ ...seed, media: [reset] });
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
          audioURL={audio.url}
          handleAudioStop={(data) => handleAudioStop(data)}
          handleReset={() => handleReset()}
          mimeTypeToUseWhenRecording={`audio/webm`}
        />
        {/* TODO: Obtain location here */}
        {/* TODO: handleAudioUpload(record.audioBlob) on button submit*/}
        <input
          className="bubble_input-submit"
          type="submit"
          value="Save>>"
          style={{ background: `url(${save})`, backgroundPosition: "center" }}
        />
      </form>
      {audio.url !== null && <AudioTrack audios={[audio.url]} />}
    </>
  );
};
