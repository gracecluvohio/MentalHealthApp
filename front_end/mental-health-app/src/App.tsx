// import Typography from "@mui/material/Typography";
import "./App.css";
// import LetterAvatars from "./components/AvatarProfiles";
// import RecordButton from "./components/RecordButton";
import Sidebar from "./components/Sidebar";

/**creates the font for our text */
// import { createTheme, ThemeProvider } from "@mui/material";
// const theme = createTheme({
//   typography: {
//     fontFamily: ["Chilanka", "cursive"].join(","),
//   },
// });

/**main function for our App as of now*/
function App() {
  return (
    // <ThemeProvider theme={theme}>
    <div className="App">
      <Sidebar />
      {/* <div className="pageTitle">
        <Typography variant="h3">Project Name</Typography>
      </div>
      <div className="recordAudio">
        <Typography variant="h5">Record audio below:</Typography>
        <RecordButton />
        <LetterAvatars />
      </div> */}
    </div>
    // </ThemeProvider>
  );
}

export default App;
