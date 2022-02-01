import { useEffect, useState, useRef, useContext } from "react";
import { nanoid } from "nanoid";
import "./css/form.css";
import { checkIfUserExists, postSeed, registerUser } from "../api";
import { StateMessages } from "../components/StateMessages";
import { UserContext } from "../lib/UserContext";

export const Form = () => {
  const { user, setUser } = useContext(UserContext);

  const [seed, setSeed] = useState({
    description: "",
    userName: user.userName,
    favouriteWord: user.favouriteWord,
    media: [],
    latitude: "",
    longitude: "",
  });

  // Check if a user is registered. If yes, render seed upload form.
  // If not, ask user to register and then upload seeds.
  return seed.userName ? (
    <SeedUploadForm seed={seed} setSeed={setSeed} />
  ) : (
    <>
      <UserCredentialsForm
        user={user}
        setUser={setUser}
        seed={seed}
        setSeed={setSeed}
      />
    </>
  );
};

const UserCredentialsForm = ({ user, setUser, seed, setSeed }) => {
  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await checkIfUserExists(user).then(async (response) => {
      if (response.status === 200) {
        setSeed({
          ...seed,
          userName: user.userName,
          favouriteWord: user.favouriteWord,
        });
      } else if (response.status === 401) {
        // TODO: Add the error message states and render the errors
        console.error("Please enter the correct favourite word");
      } else if (response.status === 422) {
        console.error(
          "There is a mismatch between the fields defined in the frontend and backend schema. Please " +
            "contact your administrator."
        );
        console.error(response.detail);
      } else if (response.status === 404) {
        // If user is not found, it doesn't exist so register the user
        await registerUser(user).then((response) => {
          if (response.status === 200) {
            console.log("user has been registered");
          } else {
            console.error(response.status, response.detail);
          }
        });
      } else {
        console.error(response.status, response.detail);
      }
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="userName">Enter a username (required)</label>
      <input
        type="text"
        name="userName"
        id="userName"
        onChange={handleChange}
        required
      />
      <label htmlFor="favouriteWord">
        Enter one word that you like very much! please remember it :) (required)
      </label>
      <input
        type="text"
        name="favouriteWord"
        id="favouriteWord"
        onChange={handleChange}
        required
      />
      <input className="submit" type="submit" value="Submit" />
    </form>
  );
};

const SeedUploadForm = ({ seed, setSeed }) => {
  const fileInputAudio = useRef();
  const fileInputImage = useRef();
  const [isSubmissionSuccessful, setIsSubmissionSuccessful] = useState(false);

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
  }, [seed.desc]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Get the latitude and the longitude from the URL pasted into the form
    if (seed.url && seed.url.split(".")[1] === "openstreetmap") {
      const queryString = seed.url.split("?")[1];
      setSeed({
        ...seed,
        lat: queryString.split("&")[0].split("mlat=")[1],
        long: queryString.split("&")[1].split("#")[0].split("mlon=")[1],
      });
    } else {
      // TODO: trigger error: incorrect host for location
    }

    await postSeed(seed, setIsSubmissionSuccessful).then((response) => {
      if (response.status === 201) {
        setIsSubmissionSuccessful(true);
        document.getElementById("seed-form").reset();
      }
    });
  };
  return (
    <>
      {isSubmissionSuccessful && <StateMessages status={201} />}
      <form className="form" id="seed-form" onSubmit={handleSubmit}>
        <label htmlFor="description">Description of sound (required)</label>
        <textarea
          name="description"
          id="description"
          value={seed.description}
          onChange={handleChange}
          rows="5"
          cols="63"
          required
        />
        <label htmlFor="audio">
          Upload an audio file that makes up the seed
        </label>
        <input
          type="file"
          name="audio"
          id="audio"
          ref={fileInputAudio}
          onChange={handleChange}
          accept="audio/*"
        />
        <label htmlFor="image">
          Upload an image file that makes up the seed
        </label>
        <input
          type="file"
          name="image"
          id="image"
          ref={fileInputImage}
          onChange={handleChange}
          accept="image/*"
        />
        <label htmlFor="location">
          An estimate of where this media was captured (Paste map location from{" "}
          <a
            href="https://www.openstreetmap.org"
            target="_blank"
            rel="noreferrer"
          >
            Open Street Maps
          </a>
          )
        </label>
        <input
          type="url"
          name="location"
          id="location"
          onChange={handleChange}
        />
        <input className="submit" type="submit" value="Submit" />
      </form>
    </>
  );
};
