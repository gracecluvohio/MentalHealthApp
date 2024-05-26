// This could be where we store messages
import {Paper, Typography} from "@mui/material";
import * as React from "react";

interface MessageProps {
    msg: string | undefined;
    audioUrl: string | undefined;
    fromUser: boolean;
}

const Message: React.FC<MessageProps> = ({
                                             msg,
                                             fromUser,
                                             audioUrl,
                                         }) => {
    return (
        <li
            key={`${msg}-${audioUrl}-${fromUser}`}
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
                    padding: "14px",
                    backgroundColor: fromUser ? "lightblue" : "lightgrey",
                    maxWidth: "50%",
                    textAlign: fromUser ? "right" : "left",
                    borderTopLeftRadius: "20px",
                    borderTopRightRadius: "20px",
                    borderBottomLeftRadius: (fromUser) ? "20px" : "0",
                    borderBottomRightRadius: (fromUser) ? "0" : "20px",
                }}
            >
                <Typography variant="body1">{msg}</Typography>
                {audioUrl != null ? (
                    <audio controls style={{width: "400px", paddingTop: "20px"}}>
                        <source src={audioUrl} type="audio/wav"/>
                    </audio>
                ) : (
                    <></>
                )}
            </Paper>
        </li>
    );
};

export default Message;
