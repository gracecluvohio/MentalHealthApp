import MicIcon from "@mui/icons-material/Mic";
import StopIcon from "@mui/icons-material/Stop";
import Fab from "@mui/material/Fab";
import {useState} from "react";

export default function RecordButton() {
    const [isRecording, setIsRecording] = useState(false);

    const handleButtonClick = () => {
        setIsRecording((prev) => !prev);
    };

    return (
        <Fab color="primary" aria-label="record"
             style={{position: 'fixed', bottom: '20px', right: 'unset', top: 'unset', left: "265px"}}
             onClick={handleButtonClick}>
            {/* "isRecording ?" = If isRecording true..., ":" = else*/}
            {isRecording ? (
                <StopIcon/>
            ) : (
                <MicIcon/>
            )}
        </Fab>
    );
}



