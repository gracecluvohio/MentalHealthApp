import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import Fab from "@mui/material/Fab";
import React, { useEffect, useRef, useState } from "react";
import API from "../api/API";
import uploadFile from "../api/CDN";

interface AudioRecorderProps {
  sendMessage: (message?: string, audio?: string) => void;
}

const AudioRecorder: React.FC<AudioRecorderProps> = ({ sendMessage }) => {
  const mimeType = "audio/webm";
  const [permission, setPermission] = useState<boolean>(false);
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const [recordingStatus, setRecordingStatus] = useState<string>("inactive");
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [audio, setAudio] = useState<string | null | Blob>(null);

  const getMicrophonePermission = async (): Promise<void> => {
    if ("MediaRecorder" in window) {
      try {
        const streamData: MediaStream = await navigator.mediaDevices
          .getUserMedia({
            audio: true,
            video: false,
          })
          .then((streamData) => {
            setPermission(true);
            setStream(streamData);
          });
      } catch (err) {
        if (err instanceof Error) {
          alert(err.message);
        } else {
          alert("An unknown error occurred.");
        }
      }
    } else {
      alert("The MediaRecorder API is not supported in your browser.");
    }
  };
  const startRecording = async (): Promise<void> => {
    if (!stream) {
      console.error("No media stream available");
      return;
    }
    setRecordingStatus("recording");
    const media = new MediaRecorder(stream, { mimeType });
    mediaRecorder.current = media;

    // Invokes the start method to start the recording process
    mediaRecorder.current.start();

    const localAudioChunks: Blob[] = [];
    mediaRecorder.current.ondataavailable = (event: BlobEvent) => {
      if (typeof event.data === "undefined") return;
      if (event.data.size === 0) return;
      localAudioChunks.push(event.data);
    };

    setAudioChunks(localAudioChunks);
  };

  const stopRecording = async () => {
    setRecordingStatus("inactive");
    //stops the recording instance
    if (mediaRecorder !== null && mediaRecorder.current != null) {
      mediaRecorder.current.stop();
      mediaRecorder.current.onstop = async () => {
        //creates a blob file from the audiochunks data
        const audioBlob = new Blob(audioChunks, { type: mimeType });
        //creates a playable URL from the blob file.
        const audioUrl = URL.createObjectURL(audioBlob);
        // setAudio(audioUrl);
        setAudio(audioBlob);
        const aud = await uploadFile(audioBlob);
        sendMessage(undefined, aud);
        //find the date, TO

        console.log(audioUrl);
        setAudioChunks([]);
      };
    }
  };

  useEffect(() => {
    getMicrophonePermission();
  }, []);

  return (
    <div>
      <main>
        <div className="audio-controls">
          {recordingStatus === "inactive" ? (
            <Fab
              color="primary"
              aria-label="record"
              style={{
                position: "fixed",
                bottom: "20px",
                right: "unset",
                top: "unset",
                left: "265px",
              }}
              onClick={startRecording}
            >
              <MicIcon />
            </Fab>
          ) : null}
          {recordingStatus === "recording" ? (
            <Fab
              color="primary"
              aria-label="record"
              style={{
                position: "fixed",
                bottom: "20px",
                right: "unset",
                top: "unset",
                left: "265px",
              }}
              onClick={stopRecording}
            >
              <StopIcon />
            </Fab>
          ) : null}
        </div>
        {audio ? (
          <div className="audio-player">
            {/* <audio src={audio} controls></audio> */}

            <a download href={audio}>
              Download Recording
            </a>
          </div>
        ) : null}
        {/* CDN.uploadFile(audio); */}
      </main>
    </div>
  );
};

export default AudioRecorder;
