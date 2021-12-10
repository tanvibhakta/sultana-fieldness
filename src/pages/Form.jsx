import "../css/form.css";
import { useState, useRef } from "react";

export const Form = () => {
  // TODO: use nanoid to generate
  const seedId = "testID1";
  const fileInput = useRef();
  const [seed, setSeed] = useState({
    description: "",
    userId: "testUserID1",
    favouriteWord: "sushi",
    media: "",
  });

  const handleChange = (event) => {
    if (event.target.name === "media") {
      setSeed({
        ...seed,
        media: {
          file: fileInput.current.files[0],
          name: fileInput.current.files[0].name,
        },
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
      {/* TODO: flow to generate user identification string and favorite word comes first */}
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
      {/* TODO: Capture timestamp the submit button was clicked*/}
    </form>
  );
};

const getFormData = (object) =>
  Object.keys(object).reduce((formData, key) => {
    if (key === "media") {
      formData.append("uploadMedia", object[key]["file"], object[key]["name"]);
    } else formData.append(key, object[key]);
    return formData;
  }, new FormData());
