import SendIcon from "@mui/icons-material/Send";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material/styles";
import * as React from "react";

export default function ChatTextField() {
  const theme = useTheme();
  const [message, setMessage] = React.useState<string>("");
  const [messages, setMessages] = React.useState<
    { text: string; fromUser: boolean }[]
  >([]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, fromUser: true },
      ]);
      setMessage("");
    }
  };

// // uncomment below to print the list of messages on console
//   React.useEffect(() => {
//     console.log("Updated messages:", messages);
//   }, [messages]);

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSendMessage();
    }
  };

  return (
    // <div className="chat">

    // <div className="messages">
    //     {messages.map((message, index))}
        

    // </div>

        
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
        "& > :not(style)": { m: 5, width: "1000ch" },
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
                <IconButton edge="end" onClick={handleSendMessage}>
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </div>
    </Box>
  );
}


