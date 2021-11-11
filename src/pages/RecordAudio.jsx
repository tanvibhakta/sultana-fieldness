import { useState } from "react";
import {Recorder} from 'react-voice-recorder';
import 'react-voice-recorder/dist/index.css';

export const RecordAudio = () => {

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

        // Create file and filename
        const d = new Date();
        const fileName = `Audio File ${d.getFullYear()}-${d.getMonth()}-${d.getDate()} at ${d.getHours()}.${d.getMinutes()}.${d.getSeconds()}`;
        const formData = new FormData();
        formData.append("file", file, fileName);

        // Define parameters of request
        const requestOptions = {
            method: 'POST',
            body: formData,
            redirect: 'follow'
        };

        // Execute POST
        fetch("https://fieldness.com/admin/uploader", requestOptions)
            .then(response => {
                console.log("file has been uploaded")
                response.text()
            })
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

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
        <Recorder
            record={true}
            title={"Fieldness"}
            audioURL={audioDetails.url}
            showUIAudio
            handleAudioStop={data => handleAudioStop(data)}
            handleAudioUpload={data => handleAudioUpload(data)}
            handleReset={() => handleReset()} />
    );
}
