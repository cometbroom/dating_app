import {
  Avatar,
  Divider,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import CallIcon from "@mui/icons-material/Call";

export default function CommView({ contacts }) {
  return (
    <>
      {contacts.map((x) => (
        <>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar />
            </ListItemAvatar>
            <ListItemText primary="Name" />
            <CallIcon />
          </ListItem>
          <Divider variant="inset" component="li" />
        </>
      ))}
    </>
  );
}
