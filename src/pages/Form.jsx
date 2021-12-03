import "../css/form.css";
import { useState } from "react";

export const Form = () => {
  const [seed, setSeed] = useState({ description: "", media: "" });
  let tempSeed;

  const handleChange = (event) => {

    switch (event.target.name) {
      case "description":
        tempSeed = { ...seed, description: `${event.target.value}` };
        setSeed(tempSeed);
        break;
      case "media":
        tempSeed = { ...seed, media: `${event.target.value}` };
        setSeed(tempSeed);
        break;
      default:
        console.error(
          "Unknown form type. Check if ",
          event.target.name,
          " matches any known form field"
        );
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
      <label for="audio-file">
        Upload an audio file OR an image file that makes up the seed (required)
      </label>
      <input
        type="file"
        name="audio-file"
        id="audio-file"
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
