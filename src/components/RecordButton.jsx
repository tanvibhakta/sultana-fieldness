import { useEffect, useState } from "react";
import "./css/recordbutton.css";

export const RecordButton = ({
  mimeTypeToUseWhenRecording,
  mediaRecorder,
  handleCountDown = (data) => {},
  handleAudioStop,
}) => {
  const [time, setTime] = useState({
    time: {},
    miliseconds: 0,
  });
  const [timer, setTimer] = useState();
  const [record, setRecord] = useState({
    mediaNotFound: false,
    chunks: [],
    recording: false,
    pauseRecording: false,
    audio: [],
    audioBlob: null,
  });
  const audioType = "audio/*";
  let stream;

  function milisecondsToTime(milisecs) {
    let secs = milisecs / 1000;
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      h: hours,
      m: minutes,
      s: seconds,
      ms: milisecs,
    };
    return obj;
  }

  function countDown() {
    // Remove one second, set state so a re-render happens.
    const miliseconds = time.miliseconds + 100;
    setTime({ time: milisecondsToTime(miliseconds), miliseconds: miliseconds });
    handleCountDown(time.time);
  }

  function startTimer() {
    setTimer(setInterval(countDown, 100));
  }

  async function initRecorder() {
    navigator.getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia ||
      navigator.msGetUserMedia;
    if (navigator.mediaDevices) {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (mimeTypeToUseWhenRecording) {
        mediaRecorder = new MediaRecorder(stream, {
          mimeType: mimeTypeToUseWhenRecording,
        });
      } else {
        mediaRecorder = new MediaRecorder(stream);
      }
      mediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          const c = record.chunks;
          c.push(e.data);
          setRecord({
            ...record,
            chunks: c,
          });
        }
      };
    } else {
      setRecord({ ...record, medianotFound: true });
      console.log("Media Devices will work only with SSL");
    }
  }

  async function startRecording(e) {
    e.preventDefault();
    // wipe old data chunks
    setRecord({ ...record, chunks: [] });

    await initRecorder();
    // start recorder with 10ms buffer
    mediaRecorder.start(10);
    startTimer();
    // say that we're recording
    setRecord({ ...record, recording: true });
  }

  function stopRecording(e) {
    clearInterval(timer);
    setTime({ ...time, time: {} });
    e.preventDefault();
    // stop the recorder

    if (stream.getAudioTracks) {
      const tracks = stream.getAudioTracks();
      tracks.forEach((track) => {
        track.stop();
      });
    } else {
      console.log("No Tracks Found");
    }

    mediaRecorder.stop();

    // say that we're not recording
    setRecord({ ...record, recording: false, pauseRecord: false });
    // save the audio to memory
    saveAudio();
  }

  function handleReset(e) {
    if (record.recording) {
      stopRecording(e);
    }
    setRecord({
      ...record,
      time: {},
      miliseconds: 0,
      recording: false,
      medianotFound: false,
      audios: [],
      audioBlob: null,
    });
  }

  function saveAudio() {
    // convert saved chunks to blob
    const blob = new Blob(record.chunks, { type: audioType });
    // generate video url from blob
    const audioURL = window.URL.createObjectURL(blob);
    // append videoURL to list of saved videos for rendering
    const audios = [audioURL];
    setRecord({ ...record, audio: audios, audioBlob: blob });
    handleAudioStop({
      url: audioURL,
      blob: blob,
      chunks: record.chunks,
      duration: time.time,
    });
  }

  useEffect(() => {
    console.log("time", time);
    console.log("record", record);
  }, [time, record]);

  return (
    <div>
      {
        <div>
          <span>
            {time.time.m !== undefined
              ? `${time.time.m <= 9 ? "0" + time.time.m : time.time.m}`
              : "00"}
          </span>
          <span>:</span>
          <span>
            {time.time.s !== undefined
              ? `${time.time.s <= 9 ? "0" + time.time.s : time.time.s}`
              : "00"}
          </span>
        </div>
      }
      <button
        className="record_button-record"
        onClick={(e) => {
          console.log(record);
          record.recording ? stopRecording(e) : startRecording(e);
        }}
      >
        {record.recording ? "STOP" : "REC"}
      </button>
      <button></button>
    </div>
  );
};
