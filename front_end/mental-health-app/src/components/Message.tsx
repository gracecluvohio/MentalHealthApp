// This could be where we store messages
import { Paper, Typography } from "@mui/material";
import * as React from "react";

interface MessageProps {
  msg: string;
  fromUser: boolean;
  entryID: number;
  index: number;
}

const Message: React.FC<MessageProps> = ({ msg, fromUser, entryID, index }) => {
  return (
    <li
    key={`${entryID}-${index}`}
    style={{
      listStyle: "none",
      display: "flex",
      justifyContent: fromUser ? "flex-end" : "flex-start",
      marginBottom: "8px",
    }}
    >
    <Paper
      sx={{
        padding: "8px",
        backgroundColor: fromUser ? "lightblue" : "lightgrey",
        maxWidth: "70%",
      }}
    >
      <Typography variant="body1">{msg}</Typography>
    </Paper>
  </li>);

};

export default Message;
