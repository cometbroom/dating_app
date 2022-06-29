import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Paper,
  Slider,
  Stack,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import styles from "../../styles/MatchCard.module.css";

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac ultrices lorem. Cras dictum, nunc sit amet blandit dignissim, enim velit sagittis eros, ut lobortis est purus eget nibh. Ut eu congue libero, at porta felis. ";

function valueText(value) {
  return `${value} out of 10`;
}

const interestAnim = {
  stopped: { backgroundPosition: 0 },
  visible: (i) => ({ opacity: 1, transition: { delay: i * 0.3 } }),
  going: {
    backgroundPosition: "50px",
    transition: { duration: 0.3, repeat: Infinity },
  },
};

export default function MatchCard({
  img = "",
  title = "",
  bio = "",
  dataInterest = 0,
  sendInterest = () => {},
  matchInterests = [],
}) {
  const [interest, setInterest] = useState(dataInterest);
  const interestRef = useRef(interest);
  const theme = useTheme();

  const smallerScreen = useMediaQuery(theme.breakpoints.down("lg"));
  const smallestScreen = useMediaQuery(theme.breakpoints.down("md"));

  function sliderChanged(e, value) {
    setInterest(value);
  }

  useEffect(() => {
    setInterest(dataInterest);
  }, []);

  //Effect to keep my ref updated so I can send it without closure to cleanup
  useEffect(() => {
    interestRef.current = interest;
  }, [interest]);

  useEffect(() => {
    return function () {
      //Send interest to server.
      sendInterest(interestRef.current);
    };
  }, []);

  return (
    <Paper sx={{ zIndex: "50" }} elevation={10}>
      <Card
        sx={{
          zIndex: 6,
          m: "auto",
          filter: `brightness(${0.9 + interest / 50})`,
        }}
        className={styles.card}
        component={motion.div}
        animate={{
          padding: smallestScreen
            ? 2
            : `${(11 - interest) * 4 + 10 - (smallerScreen ? 30 : 0)}px`,
        }}
      >
        <div className={styles.cardAction}>
          <CardMedia
            component="img"
            image={img}
            alt={`An image of ${title}`}
            className={styles.cardMedia}
          />
          <CardContent className={styles.cardContent}>
            <Typography gutterBottom variant="h5" component="div">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {bio || LOREM}
            </Typography>
          </CardContent>
        </div>
        <Stack
          alignSelf="center"
          flexWrap="wrap"
          justifyContent="center"
          alignItems="center"
          direction="row"
          spacing={1}
        >
          {matchInterests.map((x, idx) => (
            <motion.div className={styles.chipWrap} key={idx}>
              <Chip
                component={motion.div}
                variants={interestAnim}
                custom={idx}
                animate="visible"
                label={x}
                variant="outlined"
                color="secondary"
                className={styles.chip}
                sx={{ backgroundColor: "background.default", opacity: 0 }}
              />
            </motion.div>
          ))}
        </Stack>

        <CardActions>
          <Toolbar
            sx={{
              display: "flex",
              width: "100%",
              gap: "20px",
              justifyContent: "space-between",
            }}
          >
            <Typography>Points:</Typography>
            <Slider
              aria-label="Interest Slider"
              defaultValue={dataInterest}
              step={1}
              min={0}
              max={10}
              sx={{ width: "100%" }}
              valueLabelDisplay="auto"
              getAriaValueText={valueText}
              onChange={sliderChanged}
            />
          </Toolbar>
        </CardActions>
      </Card>{" "}
    </Paper>
  );
}
