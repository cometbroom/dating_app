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
import { Paper, useMediaQuery, useTheme } from "@mui/material";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import useToggle from "../../src/hooks/useToggle";

const LIST_ITEMS = [
  { title: "SONAR", icon: <RadarIcon />, link: "/application/" },
  { title: "Chat", icon: <AssistantOutlinedIcon />, link: "application/chats" },
  { title: "Settings", icon: <SettingsIcon />, link: "application/settings" },
];

const BAR_DURATION = 0.5;

const barsAnim = {
  close: { x: "-100%", transition: { duration: BAR_DURATION } },
  open: { x: 0, transition: { duration: BAR_DURATION } },
};

export default function ApplicationLayout(props) {
  const theme = useTheme();
  const [barClosed, setBarClosed] = useToggle(true);

  const biggerScreens = useMediaQuery(theme.breakpoints.up("md"));
  const leftBarControls = useAnimation();

  async function closeBarHandler() {
    await leftBarControls.start(barClosed ? "close" : "open");
  }

  const drawerWidth = biggerScreens ? 240 : 80;

  return (
    <Box sx={{ display: "flex" }}>
      <AnimatePresence>
        <AppBar
          position="fixed"
          sx={{
            ml: `${drawerWidth}px`,
          }}
          component={motion.div}
          variants={barsAnim}
          animate={{
            width: barClosed ? `calc(100% - ${drawerWidth}px)` : "100%",
            transition: { duration: BAR_DURATION },
          }}
          exit="close"
        >
          <Toolbar sx={{ color: COLORS.primary }}>
            <div
              style={{
                cursor: "pointer",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
              onClick={setBarClosed}
            >
              <LogoIcon />
            </div>
          </Toolbar>
        </AppBar>
      </AnimatePresence>
      <AnimatePresence>
        {barClosed && (
          <motion.div
            style={{ zIndex: 100 }}
            variants={barsAnim}
            initial="close"
            animate="open"
            exit="close"
          >
            <Drawer
              sx={{
                width: 0,
                flexShrink: 0,
              }}
              variant="permanent"
              anchor="left"
            >
              <Paper
                sx={{
                  width: drawerWidth,
                  height: "100%",
                  backgroundColor: COLORS.primaryDark,
                  boxSizing: "border-box",
                }}
                component={motion.div}
                variants={barsAnim}
                initial="close"
                animate="open"
                exit="close"
              >
                <Toolbar
                  sx={{
                    display: "flex",
                    gap: "5px",
                    overflow: "hidden",
                  }}
                >
                  <BadgedAvatar
                    src="https://randomuser.me/api/portraits/thumb/men/75.jpg"
                    alt="Ali's avatar photo"
                  />
                  {biggerScreens && (
                    <>
                      <Typography variant="caption">Logged in as </Typography>
                      <Typography variant="caption">Ali</Typography>
                    </>
                  )}
                </Toolbar>
                <Divider />
                <List>
                  {LIST_ITEMS.map((item, index) => (
                    <ListItem
                      alignItems="center"
                      justifyContent="center"
                      key={index}
                      disablePadding
                    >
                      <ListItemButton href={item.link}>
                        <motion.div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                          }}
                          animate={{
                            rotate: index === 0 ? 360 : 0,
                            color: [
                              "hsl(128, 100%, 100%)",
                              "hsl(128, 100%, 50%)",
                            ],
                            transition: {
                              duration: 1,
                              repeat: 50,
                              repeatDelay: 3,
                            },
                          }}
                        >
                          <ListItemIcon sx={{ justifyContent: "center" }}>
                            {item.icon}
                          </ListItemIcon>
                        </motion.div>
                        {biggerScreens && <ListItemText primary={item.title} />}
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Drawer>
          </motion.div>
        )}
      </AnimatePresence>

      <Box
        component={motion.div}
        sx={{
          bgColor: "background.default",
          p: 3,
          height: "100%",
        }}
        animate={{
          width: barClosed ? `calc(100% - ${drawerWidth}px)` : "100%",
          marginLeft: `${barClosed ? drawerWidth : 0}px`,
          transition: { duration: BAR_DURATION },
        }}
      >
        {/* <Toolbar sx={{ p: 0 }} /> */}
        <motion.div
          style={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            transition: { duration: 2 },
          }}
        >
          {props.children}
        </motion.div>
      </Box>
    </Box>
  );
}
