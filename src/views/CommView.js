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
import { motion } from "framer-motion";

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
              <motion.div
                whileHover={{
                  rotate: [0, -5, 0, 5, 0],
                  scale: 1.2,
                  transition: { repeat: Infinity, repeatDelay: 2 },
                }}
                whileTap={{ rotate: -25 }}
                onClick={() => call(idx)}
              >
                <CallIcon sx={{ cursor: "pointer" }} />
              </motion.div>
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        ))}
      </List>
    </>
  );
}
