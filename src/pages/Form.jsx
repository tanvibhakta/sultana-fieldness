import { useState, useRef } from "react";
import { nanoid } from "nanoid";
import "../css/form.css";

export const Form = () => {
  const [user, setUser] = useState({
    id: "",
    favouriteWord: "",
  });

  const [seed, setSeed] = useState({
    description: "",
    userId: user.id,
    favouriteWord: user.favouriteWord,
    media: [],
    lat: "",
    long: "",
  });

  return seed.userId ? (
    <SeedUploadForm seed={seed} setSeed={setSeed} />
  ) : (
    <UserCredentialsForm
      user={user}
      setUser={setUser}
      seed={seed}
      setSeed={setSeed}
    />
  );
};

const getFormData = (object) =>
  Object.keys(object).reduce((formData, key) => {
    if (key === "media") {
      object.media.map((item) =>
        formData.append("uploadMedia[]", item["file"], item["name"])
      );
    } else formData.append(key, object[key]);
    return formData;
  }, new FormData());

const UserCredentialsForm = ({ user, setUser, seed, setSeed }) => {
  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    };

    fetch(`http://3.110.164.79:8000/users/${user.id}`, requestOptions).then(
      (response) => response.json()
    );

    // TODO: This is bad practice! I should be able to just add css to this form for the actual flow for
    //  username generation in the app. Refactor so this doesn't suck butt.
    setSeed({
      ...seed,
      userId: user.id,
      favouriteWord: user.favouriteWord,
    });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="id">Enter a username (required)</label>
      <input type="text" name="id" id="id" onChange={handleChange} required />
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

  const handleSubmit = (event) => {
    event.preventDefault();

    // Get the latitude and the longitude from the URL pasted into the form
    if (seed.url.split(".")[1] === "openstreetmap") {
      const queryString = seed.url.split("?")[1];
      setSeed({
        ...seed,
        lat: queryString.split("&")[0].split("mlat=")[1],
        long: queryString.split("&")[1].split("#")[0].split("mlon=")[1],
      });
    } else {
      // TODO: trigger error: incorrect host for location
    }

    const seedObject = getFormData(seed);
    const requestOptions = {
      method: "POST",
      body: seedObject,
    };

    fetch(`http://3.110.164.79:8000/seeds/${seedId}`, requestOptions).then(
      () => {
        //  TODO: Validate that the server returns a 200
        setIsSubmissionSuccessful(true);
      }
    );
  };
  return (
    <>
      {isSubmissionSuccessful && (
        <div className="success-message">
          {" "}
          Your seed was successfully created! Submit another:{" "}
        </div>
      )}
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
