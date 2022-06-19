import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { COLORS } from "../tools/constants";
import LogoIcon from "../components/LogoIcon";
import BadgedAvatar from "../components/BadgedAvatar";
import RadarIcon from "@mui/icons-material/Radar";
import AssistantOutlinedIcon from "@mui/icons-material/AssistantOutlined";
import SettingsIcon from "@mui/icons-material/Settings";

const drawerWidth = 240;
const LIST_ITEMS = [
  { title: "SONAR", icon: <RadarIcon />, link: "/application/" },
  { title: "Chat", icon: <AssistantOutlinedIcon />, link: "application/chats" },
  { title: "Settings", icon: <SettingsIcon />, link: "application/settings" },
];

export default function ApplicationLayout(props) {
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
        }}
      >
        <Toolbar sx={{ color: COLORS.primary }}>
          <LogoIcon />
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backgroundColor: COLORS.primaryDark,
            boxSizing: "border-box",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar sx={{ display: "flex", gap: "5px" }}>
          <BadgedAvatar
            src="https://randomuser.me/api/portraits/thumb/men/75.jpg"
            alt="Ali's avatar photo"
          />
          <Typography variant="caption">Logged in as </Typography>
          <Typography variant="caption">Ali</Typography>
        </Toolbar>
        <Divider />
        <List>
          {LIST_ITEMS.map((item, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton href={item.link}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar sx={{ bgColor: "red", p: 0 }} />
        {props.children}
      </Box>
    </Box>
  );
}
