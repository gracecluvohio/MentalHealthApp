import { ThemeProvider } from "@mui/material";
import "./App.css";
import ResponsiveDrawer from "./components/Sidebar";

import theme from "./theme";
import ChatHome from './components/ChatHome'
/**creates the font for our text */
// const theme = createTheme({
//   typography: {
//     fontFamily: ["Chilanka", "cursive"].join(","),
//   },
// });

/**main function for our App as of now*/
function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <ResponsiveDrawer />
        <div className="chatContainer">
          <ChatHome/>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
