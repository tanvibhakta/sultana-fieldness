import "../css/form.css";
import { useState } from "react";

export const Form = () => {
  const [seed, setSeed] = useState({ description: "", media: "" });

  const handleChange = (event) => {
    if (event.target.name !== "media")
      setSeed({
        [event.target.name]: event.target.value,
      });
    else {
      //    Update the state using a ref
    }
  };

  const handleClick = () => {};

  return (
    <form className="form">
      {/* TODO: user identification string */}
      <label for="description">Description of sound (required)</label>
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
      <label for="media">
        Upload an audio file OR an image file that makes up the seed (required)
      </label>
      <input
        type="file"
        name="media"
        id="media"
        value={seed.media}
        accept="audio/*,image/*"
        required
      />
      <input
        className="submit"
        type="submit"
        value="Submit"
        onClick={handleClick}
      />
      {/* TODO: Capture timestamp the submit button was clicked*/}
    </form>
  );
};
