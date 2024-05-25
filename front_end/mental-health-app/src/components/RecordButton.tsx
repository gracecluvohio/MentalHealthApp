import MicIcon from "@mui/icons-material/Mic";
import Fab from "@mui/material/Fab";

export default function RecordButton() {
  return (
    <Fab color="primary" aria-label="record">
      <MicIcon sx={{ color: "#FFBF00" }}  />
    </Fab>
  );
}
