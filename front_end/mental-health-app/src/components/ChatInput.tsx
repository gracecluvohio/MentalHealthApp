import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import {useTheme} from "@mui/material/styles";
import * as React from "react";
import AudioRecorder from "./AudioRecorder";

interface ChatInputProps {
    sendChatMessage: (message?: string, audio?: string) => void
}

const ChatInput: React.FC<ChatInputProps> = ({sendChatMessage}) => {
    const theme = useTheme();

    // Text box state
    const [message, setMessage] = React.useState<string>("");

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    };

    const handleSendMessage = (message?: string, audio?: string) => {
        if ((message != null && message.trim()) || audio != null) {
            sendChatMessage(message, audio);
            setMessage("");
        }
    };

    const handleSendTextMessage = () => {
        handleSendMessage(message, undefined);
    }

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === "Enter") {
            event.preventDefault();
            handleSendMessage(message);
        }
    };

    return (
        <Box
            component="form"
            sx={{
                display: "flex",
                alignItems: "center",
                position: "fixed",
                bottom: 0,
                right: 0,
                width: "calc(100% - 400px)", // Adjusting width to account for sidebar width,
                padding: "16px",
                borderRadius: "10px",
                "& > :not(style)": {m: 5, width: "1000ch"},
            }}
            noValidate
            autoComplete="off"
        >
            <div>
                <TextField
                    fullWidth
                    id="outlined-multiline-input"
                    label="Chat"
                    multiline
                    onChange={handleInputChange}
                    onKeyDown={handleKeyPress}
                    value={message}
                    maxRows={5}
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                                borderColor: theme.palette.secondary.main,
                                color: theme.palette.secondary.main,

                            },
                        },
                    }}
                    style={{
                        position: "absolute",
                        bottom: "0px",
                        right: "50px",
                        marginRight: "5px",
                        marginBottom: "10px",
                    }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <AudioRecorder sendMessage={handleSendMessage}/>
                                <IconButton edge="end" onClick={handleSendTextMessage}>
                                    <SendIcon/>
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </div>
        </Box>
    );
};

export default ChatInput;
