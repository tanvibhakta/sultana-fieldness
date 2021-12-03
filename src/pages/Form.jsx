import "../css/form.css";
import { useState, useRef } from "react";

export const Form = () => {
  const [seed, setSeed] = useState({
    seedId: "testID1",
    description: "",
    media: "",
    userId: "testUser",
  });
  const fileInput = useRef();

  const handleChange = (event) => {
    if (event.target.name === "media") {
      setSeed({
        ...seed,
        media: fileInput.current.files[0].name,
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

    console.log("Now we will pass ", seed, "in a POST to the API");

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(seed),
    };

    fetch(`http://3.110.164.79:8000/seeds/${seed.seedId}`, requestOptions)
      .then((response) => response.json())
      .then((data) => console.log("This is a response from the server", data));
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      {/* TODO: user identification string */}
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
