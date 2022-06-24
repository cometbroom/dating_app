import * as React from "react";
import PropTypes from "prop-types";
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Button,
  Container,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import LogoIcon from "../components/LogoIcon";
import { AnimatePresence, motion } from "framer-motion";

const drawerWidth = 240;
const navItems = ["Home", "Testimonials"];

export default function LandingLayout(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box sx={{ display: "inline-flex", alignItems: "center" }}>
        <LogoIcon></LogoIcon>
      </Box>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              href={`/${item.toLowerCase()}`}
              sx={{ textAlign: "center" }}
            >
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
  const container =
    window !== undefined ? () => window().document.body : undefined;
  return (
    <AnimatePresence>
      <Container
        component={motion.div}
        sx={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1 } }}
        exit={{ opacity: 0 }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            justifyContent: "center",
          }}
        >
          <AppBar component="nav">
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon></MenuIcon>
              </IconButton>
              <Toolbar
                sx={{ flexGrow: 1, display: { xs: "none", sm: "inline-flex" } }}
              >
                <LogoIcon></LogoIcon>
              </Toolbar>
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                {navItems.map((item) => (
                  <Button
                    href={`/${item.toLowerCase()}`}
                    key={item}
                    sx={{ color: "#fff" }}
                  >
                    {item}
                  </Button>
                ))}
              </Box>
            </Toolbar>
          </AppBar>
          <Box component="nav">
            <Drawer
              container={container}
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              // Not sure about the reason for this one
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
              sx={{
                display: { xs: "block", sm: "none" },
                "& .MuiDrawer-paper": {
                  boxSizing: "border-box",
                  width: drawerWidth,
                },
              }}
            >
              {drawer}
            </Drawer>
          </Box>
          <Box component="main" sx={{ p: 3, width: "100%" }}>
            <Toolbar />
            {props.children}
          </Box>
        </Box>
      </Container>
    </AnimatePresence>
  );
}

LandingLayout.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};
