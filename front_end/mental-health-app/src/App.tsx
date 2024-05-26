import { ThemeProvider } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import "./App.css";
import API from "./api/API";
import AudioRecorder from "./components/AudioRecorder";
import ChatHome from "./components/ChatHome";
import ResponsiveDrawer from "./components/Sidebar";
import { Message as MessageType } from "./components/types";
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
  const [initialData, setInitialData] = useState({});

  // API.getSessionHistory("TODO USERNAME").then((res: any) => {
  //   setInitialData(res);
  // });

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
          changeEntriesRecord={handleChangeEntRecord}
        />
        <div className="chatContainer">
          <ChatHome
            entryID={entryID}
            entries={entries}
            initialData={initialData}
          />
        </div>
      </div>

      {/* <RecordButton /> */}
      <AudioRecorder />
    </ThemeProvider>
  );
}

export default App;
