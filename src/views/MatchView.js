import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { useContext } from "react";
import DirectionNav from "../components/DirectionNav";
import { motion, useAnimation } from "framer-motion";
import MatchController from "../controllers/MatchController";
import { PaginationContext } from "../contexts/PaginationContext";
import { ANIMATIONS } from "../tools/constants";

const LEFT_HIDDEN = "-200%";
const RIGHT_HIDDEN = "200%";
const DEGREES = 45;

const animLR = {
  hiddenL: {
    left: LEFT_HIDDEN,
    transform: `rotate(-${DEGREES}deg)`,
    opacity: 0,
    transition: { duration: ANIMATIONS.swipeDuration },
  },
  visible: {
    left: 0,
    transform: "rotate(0deg)",
    opacity: 1,
    transition: { duration: ANIMATIONS.swipeDuration },
  },
  hiddenR: {
    left: RIGHT_HIDDEN,
    transform: `rotate(${DEGREES}deg)`,
    opacity: 0,
    transition: { duration: ANIMATIONS.swipeDuration },
  },
};

export default function MatchView() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const [context, setContext] = useContext(PaginationContext);
  const controls = useAnimation();

  //await controls.start({ left: "-200%", transition: { duration: 1 } });

  function directionalNav(direction) {
    return async () => {
      switch (direction) {
        case "left":
          if (context === 0) return;
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

  return (
    <Grid
      container
      sx={{ alignItems: "center", height: "100vh", p: 3, overflowX: "hidden" }}
    >
      {matches && (
        <Grid item md={3}>
          <div onClick={directionalNav("left")}>
            <DirectionNav direction="left" />
          </div>
        </Grid>
      )}
      <Grid item md={6}>
        <motion.div
          style={{ position: "relative", zIndex: 5 }}
          variants={animLR}
          initial="visible"
          animate={controls}
        >
          <MatchController />
        </motion.div>
      </Grid>
      {matches && (
        <Grid item md={3}>
          <div onClick={directionalNav("right")}>
            <DirectionNav direction="right" />
          </div>
        </Grid>
      )}
    </Grid>
  );
}
