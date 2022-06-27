import { useContext, useEffect, useRef, useState } from "react";
import DirectionNav from "../components/DirectionNav";
import { motion, useAnimation } from "framer-motion";
import MatchController from "../controllers/MatchController";
import { PaginationContext } from "../contexts/PaginationContext";
import { ANIMATIONS } from "../tools/constants";
import { Box, Grid, useMediaQuery, useTheme } from "@mui/material";
import useGestures from "../hooks/useGestures";
import MatchCard from "../components/MatchCard";

const LEFT_HIDDEN = "-200%";
const RIGHT_HIDDEN = "200%";
const DEGREES = 45;

const animLR = {
  hiddenL: {
    x: LEFT_HIDDEN,
    rotate: -DEGREES,
    opacity: 0,
    transition: { duration: ANIMATIONS.swipeDuration },
  },
  visible: {
    x: 0,
    rotate: 0,
    opacity: 1,
    transition: { duration: ANIMATIONS.swipeDuration },
  },
  hiddenR: {
    x: RIGHT_HIDDEN,
    rotate: DEGREES,
    opacity: 0,
    transition: { duration: ANIMATIONS.swipeDuration },
  },
};

export default function SonarView() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const smallerScreen = useMediaQuery(theme.breakpoints.down("lg"));

  const [context, setContext] = useContext(PaginationContext);
  const controls = useAnimation();

  function directionalNav(direction) {
    return async () => {
      switch (direction) {
        case "left":
          if (context < 0) return;
          await controls.start("hiddenR");
          controls.set("hiddenL");
          setContext(context - 1);
          controls.start("visible");
          break;
        case "right":
          await controls.start("hiddenL");
          controls.set("hiddenR");
          setContext(context + 1);
          controls.start("visible");
          break;
      }
    };
  }
  useGestures(context, directionalNav("right"), directionalNav("left"));

  return (
    <Grid
      container
      sx={{
        alignItems: "center",
        height: "100vh",
        p: 3,
        overflowX: "hidden",
        overflowY: "hidden",
      }}
    >
      {matches && (
        <Grid item md={smallerScreen ? 2 : 3}>
          <Box
            style={{ height: "100%", zIndex: 0 }}
            onClick={directionalNav("left")}
          >
            <DirectionNav direction="left" />
          </Box>
        </Grid>
      )}
      <Grid
        sx={{ zIndex: 10, gridColumn: "span 1" }}
        item
        md={smallerScreen ? 8 : 6}
      >
        <Box
          component={motion.div}
          sx={{
            zIndex: 5,
            maxHeight: "1000px",
          }}
          variants={animLR}
          initial="visible"
          animate={controls}
        >
          <MatchController />
        </Box>
      </Grid>
      {matches && (
        <Grid
          sx={{
            alignSelf: "center",
            justifySelf: "center",
          }}
          item
          md={smallerScreen ? 2 : 3}
        >
          <Box
            sx={{ height: "100%", zIndex: 0 }}
            onClick={directionalNav("right")}
          >
            <DirectionNav direction="right" />
          </Box>
        </Grid>
      )}
    </Grid>
  );
}
