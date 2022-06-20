import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { useContext } from "react";
import DirectionNav from "../components/DirectionNav";
import { motion, useAnimation } from "framer-motion";
import MatchController from "../controllers/MatchController";
import { PaginationContext } from "../contexts/PaginationContext";

const cardAnim = {
  visible: { left: "0" },
  hidden: { left: "200%" },
};

export default function MatchView() {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const controls = useAnimation();
  const [context, setContext] = useContext(PaginationContext);

  //await controls.start({ left: "-200%", transition: { duration: 1 } });

  function directionalNav(direction) {
    return async () => {
      if (context === 0 && direction === "left") return;
      const skipDir = direction === "left" ? -1 : 1;
      setContext(context + skipDir);
    };
  }
  return (
    <Grid container sx={{ alignItems: "center", height: "100vh", p: 3 }}>
      {matches && (
        <Grid item md={3}>
          <div onClick={directionalNav("left")}>
            <DirectionNav direction="left" />
          </div>
        </Grid>
      )}
      <Grid item md={6}>
        <motion.div style={{ position: "relative" }} animate={controls}>
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
