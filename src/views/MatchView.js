import { Grid, useMediaQuery, useTheme } from "@mui/material";
import MatchCard from "../components/MatchCard";
import { useState } from "react";
import DirectionNav from "../components/DirectionNav";
import { motion, useAnimation } from "framer-motion";

const cardAnim = {
  visible: { left: "0" },
  hidden: { left: "200%" },
};

export default function MatchView({ img, title, getNext }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  const [currentProfile, setCurrentProfile] = useState({ img, title });
  const [previousProfile, setPreviousProfile] = useState(null);
  const [nextProfile, setNextProfile] = useState(null);
  const controls = useAnimation();

  function directionalNav(direction) {
    return async () => {
      let current;

      switch (direction) {
        case "left":
          if (previousProfile === null) return;
          await controls.start({
            left: "-200%",
            transition: { duration: 1 },
          });
          setNextProfile(currentProfile);
          current = { img: previousProfile.img, title: previousProfile.title };
          break;
        case "right":
          setPreviousProfile(currentProfile);
          await controls.start({
            left: "200%",
            transition: { duration: 1 },
          });
          if (nextProfile) {
            current = { img: nextProfile.img, title: nextProfile.title };
            setNextProfile(null);
          } else {
            return getNext().then((next) => {
              setCurrentProfile({
                img: next.results[0].picture.large,
                title: next.results[0].name.first,
              });
            });
          }

          break;
      }
      setCurrentProfile(current);
      await controls.start({
        left: "0",
        transition: { duration: 2 },
      });
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
          <MatchCard
            img={currentProfile.img}
            title={currentProfile.title}
          ></MatchCard>
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
