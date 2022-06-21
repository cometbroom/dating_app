import { Paper } from "@mui/material";
import classNames from "classnames";
import styles from "../../styles/MatchView.module.css";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { motion } from "framer-motion";

const HOVER_WIDTH = 10;
const CSS_PROPS = {
  height: "100%",
  border: "0px solid #121212",
  backgroundColor: "red",
};

export default function DirectionNav({ direction }) {
  let Vars;
  let Icon = <></>;

  switch (direction) {
    case "left":
      Vars = {
        className: classNames(styles.paper, styles.left),
        sx: {
          width: `${100 - HOVER_WIDTH}%`,
          ml: "auto",
          ...CSS_PROPS,
        },
      };
      Icon = <ArrowBackIosIcon />;
      break;
    case "right":
      Vars = {
        className: classNames(styles.paper, styles.right),
        sx: {
          width: `${100 - HOVER_WIDTH}%`,
          ...CSS_PROPS,
        },
      };
      Icon = <ArrowForwardIosIcon />;
      break;
  }

  return (
    <>
      <Paper
        component={motion.div}
        elevation={20}
        whileHover={{
          width: "100%",
          filter: "brightness(1.5)",
          transition: { duration: 0.3 },
        }}
        whileTap={{
          boxShadow: "7px 6px 28px 1px rgba(0, 0, 0, 0.24)",
          filter: "brightness(1)",
          borderWidth: "10px",
          transition: { duration: 0.2 },
        }}
        {...Vars}
      >
        {Icon}
      </Paper>
    </>
  );
}
