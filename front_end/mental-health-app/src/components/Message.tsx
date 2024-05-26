// This could be where we store messages
import { Paper, Typography } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import * as React from "react";

interface MessageProps {
  msg: string;
  audioUrl: string | null;
  fromUser: boolean;
  entryID: number;
  index: number;
}

const Message: React.FC<MessageProps> = ({
  msg,
  fromUser,
  audioUrl,
  entryID,
  index,
}) => {
  return (
    <li
      key={`${entryID}-${index}`}
      style={{
        listStyle: "none",
        display: "flex",
        justifyContent: fromUser ? "flex-end" : "flex-start",
        marginBottom: "8px",
        marginRight: "8px",
      }}
    >
      <Paper
        sx={{
          padding: "8px",
          backgroundColor: fromUser ? "lightblue" : "lightgrey",
          maxWidth: "50%",
          textAlign: fromUser ? "right" : "left",
        }}
      >
        {audioUrl != null ? (
          <audio controls style={{ width: "400px" }}>
            <source src={audioUrl} type="audio/wav" />
          </audio>
        ) : (
          <></>
        )}
        <Typography variant="body1">{msg}</Typography>
      </Paper>
    </li>
  );
};

export default Message;
