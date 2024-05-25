import Typography from "@mui/material/Typography";
import "./App.css";
import RecordButton from "./components/RecordButton";

function App() {
  return (
    <div className="App">
      <div className="recordAudio">
        <Typography variant="h5">Start recording</Typography>
        <RecordButton />
      </div>
    </div>
  );
}

export default App;
