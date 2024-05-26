import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import { deepPurple, purple } from "@mui/material/colors";

export default function LetterAvatars() {
  return (
    <Stack direction="row" spacing={2}>
      {/** The idea is to use these avatars for a chat profile pic and user profile pic */}
      <Avatar sx={{ bgcolor: purple[500], width: 60, height: 60}}></Avatar>
      <Avatar sx={{ bgcolor: deepPurple[500], width: 60, height: 60}}>
      </Avatar>
    </Stack>
  );
}
