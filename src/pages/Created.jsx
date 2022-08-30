import { useState } from "react";
import "./css/created.css";
import { useNavigate } from "react-router-dom";
import OldMac from "../assets/gifs/old_macintosh.gif";
import { ReactComponent as Ok } from "../assets/ok.svg";

export const Created = () => {
  const navigate = useNavigate();
  const [gifName, setGifName] = useState(OldMac);
  // TODO:
  // show gif for 2s
  // show ok for 1s
  // automatically navigate to landing
  return (
    <div className="created-container container" onClick={() => navigate("/")}>
      <img src={gifName} />
      {/*<Ok />*/}
    </div>
  );
};
