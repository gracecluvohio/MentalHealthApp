import { ThemeProvider } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import "./App.css";
import ChatHome from "./components/ChatHome";
import ResponsiveDrawer from "./components/Sidebar";
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
  const [entries, setEntries] = React.useState<Record<number, Date>>({
    0: new Date(),
  });

  const handleChangeEntry = (newEntryID: number) => {
    console.log("Changing entry ID to:", newEntryID);
    setEntryID(newEntryID);
  };

  const handleChangeEntRecord = (newEntryObj: { id: number; date: Date }) => {
    setEntries((prevEntries) => ({
      ...prevEntries,
      [newEntryObj.id]: newEntryObj.date,
    }));
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <ResponsiveDrawer
          changeEntry={handleChangeEntry}
          updateEntries={handleChangeEntRecord}
        />
        <div className="chatContainer">
          <ChatHome entryID={entryID} entries={entries} />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
