import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as CollectionJar } from "../assets/collection-jar.svg";
import { ReactComponent as ShareIcon } from "../assets/share.svg";
import "./css/register.css";
import { checkIfUserExists, getUser, registerUser } from "../api";

export const Register = () => {
  const [user, setUser] = useState({
    userName: "",
    favouriteWord: "",
  });

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    await checkIfUserExists(user).then(async (response) => {
      if (response.status === 200) {
        navigate("/post-register");
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
    <div className="register-container default-page-spacing">
      <div className="heading">Register to collect</div>
      <form
        className="form"
        onSubmit={handleSubmit}
        formAction="/post-register"
      >
        <label htmlFor="userName">Enter a username (required)</label>
        <input
          type="text"
          name="userName"
          id="userName"
          onChange={handleChange}
          required
        />
        <label htmlFor="favouriteWork">
          Type in your favoraite word (this is the magic word for your profile):
        </label>
        <div className="hint">
          You will have to remember this word to access your profile when you
          return. There is no way to retrieve this word except from your own
          mind. ;)
        </div>
        <input
          type="text"
          name="favouriteWord"
          id="favouriteWord"
          onChange={handleChange}
          required
        />
        <input className="submit" type="submit" value="submit>>" />
      </form>
    </div>
  );
};

export const PostRegister = () => {
  return (
    <div className="container post-register-container default-page-spacing">
      <CollectionJar></CollectionJar>
      <div>
        Now you can collect seeds created by others and keep track of your own
        seeds!
      </div>
      <ShareIcon></ShareIcon>
      <div>
        Every seed has a link that can be shared and accessed from anywhere on
        the internet
      </div>

      <Link className to="/">
        continue exploring>>
      </Link>
    </div>
  );
};
