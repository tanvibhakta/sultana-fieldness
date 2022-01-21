import { Gif } from "../components/Gif";
import { useState } from "react";
import "./css/created.css";
import { useNavigate } from "react-router-dom";

export const Created = () => {
  const navigate = useNavigate();
  const [gifName, setGifName] = useState("");
  return (
    <div
      className="created-container container"
      onClick={() => {
        setGifName("");
        //  if already second gif name,
        navigate("/");
        //    set some state somewhere to trigger the bubble drop in animation
      }}
    >
      <Gif name={gifName} />
    </div>
  );
};
