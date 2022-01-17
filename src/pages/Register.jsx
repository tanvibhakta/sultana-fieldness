import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as CollectionJar } from "../assets/collection-jar.svg";
import { ReactComponent as ShareIcon } from "../assets/share.svg";
import "./css/register.css";

export const Register = () => {
  const [user, setUser] = useState({
    id: "",
    name: "",
    favouriteWord: "",
  });

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  /* TODO: Warning: Maximum update depth exceeded. This can happen when a component calls setState inside useEffect,
   * but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render. */
  useEffect(() => {
    // const userId = nanoid();
    const userId = "653928";

    setUser({
      ...user,
      id: userId,
    });
  }, [user.name, user, setUser]);

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();

    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    };

    fetch(`http://3.110.164.79:8000/users/${user.id}`, requestOptions).then(
      (response) => {
        if (response.status === 201) {
          console.log("created");
        }
        // TODO: there seems to be some sort of CORS error le sigh
        // console.log("post response, post register");
        // navigate("post-register");
      }
    );
  };
  return (
    <div className="register-container default-page-spacing">
      <div className="heading">Register to collect</div>
      <form
        className="form"
        onSubmit={handleSubmit}
        formAction="/post-register"
      >
        <label htmlFor="name">Enter a username (required)</label>
        <input
          type="text"
          name="name"
          id="name"
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
