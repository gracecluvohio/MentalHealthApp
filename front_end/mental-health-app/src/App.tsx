import { ThemeProvider } from "@mui/material";
import "./App.css";
import ResponsiveDrawer from "./components/Sidebar";

import { useState } from "react";
import ChatHome from "./components/ChatHome";
import theme from "./theme";
/**creates the font for our text */
// const theme = createTheme({
//   typography: {
//     fontFamily: ["Chilanka", "cursive"].join(","),
//   },
// });

/**main function for our App as of now*/
function App() {
  const [entryID, setEntryID] = useState(0);

  const handleChangeEntry = (newEntryID: number) => {
    console.log("Changing entry ID to:", newEntryID);
    setEntryID(newEntryID);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <ResponsiveDrawer changeEntry={handleChangeEntry} />
        <div className="chatContainer">
          <ChatHome entryID={entryID} />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
