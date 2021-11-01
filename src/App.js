import { useState } from "react";
import {Recorder} from 'react-voice-recorder';
import 'react-voice-recorder/dist/index.css';

import './App.css';


function App() {

    const [audioDetails, setAudioDetails] = useState({
        url: null,
        blob: null,
        chunks: null,
        duration: {h: null, m: null, s: null}
    })

    const handleAudioStop = (data) => {
        console.log(data);
        setAudioDetails(data);
    }

    const handleAudioUpload = (file) => {
        console.log(file);
    }

    const handleReset= () => {
        const reset = {
            url: null,
            blob: null,
            chunks: null,
            duration: {h: null, m: null, s: null,}
        }
        setAudioDetails(reset);
    }
    
  return (
    <div>
      <h2>Here is an audio experiment</h2>
      <h4>Start Recording</h4>
      <h4>Stop Recording </h4>
      <h4>Play</h4>
      <h4>Pause</h4>

        <Recorder
            record={true}
            title={"New recording"}
            audioURL={audioDetails.url}
            showUIAudio
            handleAudioStop={data => handleAudioStop(data)}
            // handleOnChange={(value) => handleOnChange(value, 'firstname')}
            handleAudioUpload={data => handleAudioUpload(data)}
            handleReset={() => handleReset()} />
    </div>
  );
}

export default App;
