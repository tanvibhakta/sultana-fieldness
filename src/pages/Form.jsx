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

    const seedObject = getFormData(seed);
    const requestOptions = {
      method: "POST",
      body: seedObject,
    };

    fetch(`http://3.110.164.79:8000/seeds/${seedId}`, requestOptions)
      .then((response) => response.json())
      .then
      //    TODO: show that seed has been created, option to add another
      ();
  };
  return (
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
      {/*TODO: map location picker*/}
      <label htmlFor="media">
        Upload an audio file OR an image file that makes up the seed (required)
      </label>
      <input
        type="file"
        name="media"
        id="media"
        ref={fileInput}
        onChange={handleChange}
        accept="audio/*,image/*"
        required
      />
      <input className="submit" type="submit" value="Submit" />
    </form>
  );
};
