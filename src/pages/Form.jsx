import "../css/form.css";

export const Form = () => {
  return (
    <form className="form">
      {/* TODO: user identification string */}
      <label for="description">Description of sound (required)</label>
      <textarea
        name="description"
        id="description"
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
