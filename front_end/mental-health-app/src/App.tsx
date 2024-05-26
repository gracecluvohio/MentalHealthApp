import {ThemeProvider, Typography} from "@mui/material";
import * as React from "react";
import "./App.css";
import theme from "./theme";
import Loading from "./components/Loading.tsx";
import {useState} from "react";
import {Interaction, Mood, Session} from "./types.tsx";
import API from "./api/API.tsx";
import Sidebar from "./components/Sidebar.tsx";
import ChatHome from "./components/ChatHome.tsx";

/**main function for our App as of now*/
function App() {
    // ALl the user's data
    const [sessions, setSessions] = useState<Record<string, Session>>({});

    // The entry the user is currently selecting
    const [entryDate, setEntryDate] = React.useState<string | null>(null);

    // Whether the app is done loading
    // 0 = not loaded, 1 = in progress, 2 = done
    const [loadingProgress, setLoadingProgress] = useState(0);

    if (loadingProgress === 0) {
        setLoadingProgress(1);
        API.getSessionHistory("user").then((data) => {
            setSessions(data);
            setLoadingProgress(2);
        });
    }

    // Create a new entry
    const createNewEntry = () => {
        const dateObj: Date = new Date();
        setSessions((prevSessions) => ({
            ...prevSessions,
            [dateObj.toISOString()]: {
                mood: Mood.none,
                conversation: [],
            },
        }));
        setEntryDate(dateObj.toISOString());
    };

    // Send a chat message
    const sendChatMessage = async (message?: string, audio?: string) => {

        if (entryDate === null) {
            console.warn("No entry date selected")
            return;
        }

        const placeholderInteraction: Interaction = {
            user_text: message ?? "",
            user_audio_url: audio,
            gemini_text: "",
            gemini_audio_url: undefined,
        };
        setSessions((prevSessions) => ({
            ...prevSessions,
            [entryDate]: {
                mood: prevSessions[entryDate].mood,
                conversation: [
                    ...prevSessions[entryDate].conversation,
                    placeholderInteraction,
                ],
            },
        }));

        const response = await API.sendChatMessage("user", new Date(entryDate), audio, message);

        const newInteraction = {
            user_text: response.user_text,
            user_audio_url: audio,
            gemini_text: response.gemini_text,
            gemini_audio_url: response.gemini_audio_url,
        };
        setSessions((prevSessions) => ({
            ...prevSessions,
            [entryDate]: {
                mood: response.mood,
                conversation: [
                    ...prevSessions[entryDate].conversation.slice(0, -1),
                    newInteraction],
            },
        }));
    }


    return (
        <ThemeProvider theme={theme}>
            {(loadingProgress === 2) ?
                <div className="App">
                    <Sidebar
                        sessions={sessions}
                        entryDate={entryDate}
                        setEntryDate={setEntryDate}
                        createNewEntry={createNewEntry}
                    />
                    <div className="chatContainer">
                        {(entryDate !== null) ?
                            <ChatHome
                                session={sessions[entryDate]}
                                sendChatMessage={sendChatMessage}
                            />
                            :
                            <div className="chatHome">
                                <Typography variant="h5" component="h2">
                                    Create a new entry to start chatting
                                </Typography>
                            </div>}
                    </div>
                </div>
                : <Loading/>
            }
        </ThemeProvider>
    );
}

export default App;
