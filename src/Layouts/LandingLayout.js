import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Container,
  Stack,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import LogoIcon from "../components/LogoIcon";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import DrawerSide from "../components/Drawer";

const drawerWidth = 240;
const navItems = ["Home", "Testimonials"];

export default function LandingLayout(props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
              <Stack
                sx={{
                  display: {
                    xs: "none",
                    sm: "flex",
                    flexDirection: "row",
                    gap: "25px",
                  },
                }}
              >
                {navItems.map((item) => (
                  <Link key={item} href={`/${item.toLowerCase()}`}>
                    <Box
                      component={motion.div}
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 1, y: 5 }}
                      sx={{ color: "#fff", cursor: "pointer" }}
                    >
                      {item}
                    </Box>
                  </Link>
                ))}
              </Stack>
            </Toolbar>
          </AppBar>
          <Box component="nav">
            <Drawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
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
              <DrawerSide
                drawerToggle={handleDrawerToggle}
                navItems={navItems}
              />
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
