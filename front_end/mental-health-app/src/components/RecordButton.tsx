import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import Fab from "@mui/material/Fab";
import React, { useState } from "react";

export default function RecordButton() {
  const [isRecording, setIsRecording] = useState(false);

  const handleButtonClick = () => {
    setIsRecording((prev) => !prev);
  };

  return (
    <Fab color="primary" aria-label="record" onClick={handleButtonClick}>
      {/* "isRecording ?" = If isRecording true..., ":" = else*/}
      {isRecording ? (
        <StopIcon sx={{ color: "#FFBF00" }} />
      ) : (
        <MicIcon sx={{ color: "#FFBF00" }} />
      )}
    </Fab>
  );
}
