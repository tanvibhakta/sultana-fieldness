import React from "react";
import "./css/audiotrack.css";

export const AudioTrack = ({ audios, showUIAudio }) => (
  <div className="audio_section">
    <audio controls>
      <source src={audios[0]} type="audio/ogg" />
      <source src={audios[0]} type="audio/mpeg" />
    </audio>
  </div>
);
