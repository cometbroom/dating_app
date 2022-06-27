import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Toolbar,
} from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import BadgedAvatar from "../components/BadgedAvatar";

export default function CommView({ contacts, call }) {
  return (
    <>
      <Toolbar />
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        {contacts.map((x, idx) => (
          <div key={idx}>
            <ListItem key={idx} alignItems="flex-start">
              <ListItemAvatar>
                <BadgedAvatar
                  alt={`avatar of ${x.name}`}
                  src={x.img}
                  dot={x.dot}
                />
              </ListItemAvatar>
              <ListItemText primary={x.name} />
              <div onClick={() => call(idx)}>
                <CallIcon />
              </div>
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        ))}
      </List>
    </>
  );
}
