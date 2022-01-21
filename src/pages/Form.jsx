import { useEffect, useState, useRef } from "react";
import { nanoid } from "nanoid";
import "./css/form.css";
import { postSeed, putUser } from "../api";
import { StateMessages } from "../components/StateMessages";

export const Form = () => {
  const [user, setUser] = useState({
    name: "",
    favouriteWord: "",
  });

  const [seed, setSeed] = useState({
    description: "",
    userName: user.name,
    favouriteWord: user.favouriteWord,
    media: [],
    latitude: "",
    longitude: "",
  });

  // Check if a user is active. If yes, render seed upload form. If not, ask user to register and then upload seeds.
  // TODO: This should ideally check if there is a user in local storage.
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

  const handleSubmit = (event) => {
    event.preventDefault();

    putUser(user);

    // TODO: This is bad practice! I should be able to just add css to this form
    //  for the actual flow for username generation in the app. Refactor so this
    //  doesn't suck butt.
    console.log(seed);
    setSeed({
      ...seed,
      favouriteWord: user.favouriteWord,
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="name">Enter a username (required)</label>
      <input
        type="text"
        name="name"
        id="name"
        onChange={handleChange}
        required
      />
      <label htmlFor="favouriteWork">
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
  const seedId = nanoid();
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

  const handleSubmit = (event) => {
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

    postSeed(seed, setIsSubmissionSuccessful);
  };
  return (
    <>
      {isSubmissionSuccessful && <StateMessages status={201} />}
      <form className="form" onSubmit={handleSubmit}>
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