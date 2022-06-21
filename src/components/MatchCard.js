import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Slider,
  Toolbar,
  Typography,
} from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styles from "../../styles/MatchCard.module.css";

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac ultrices lorem. Cras dictum, nunc sit amet blandit dignissim, enim velit sagittis eros, ut lobortis est purus eget nibh. Ut eu congue libero, at porta felis. ";

function valueText(value) {
  return `${value} out of 10`;
}

export default function MatchCard({
  sx,
  img,
  title,
  bio,
  dataInterest,
  sendInterest,
}) {
  const [interest, setInterest] = useState(dataInterest);
  const interestRef = useRef(interest);

  function sliderChanged(e, value) {
    setInterest(value);
  }

  useEffect(() => {
    console.log("Match card startup", dataInterest);
    setInterest(dataInterest);
  }, []);

  //Effect to keep my ref updated so I can send it without closure to cleanup
  useEffect(() => {
    interestRef.current = interest;
  }, [interest]);

  useEffect(() => {
    return function () {
      //Send interest to server.
      console.log("cleanup", interestRef.current);
      sendInterest(interestRef.current);
    };
  }, []);

  return (
    <>
      <Card
        sx={{
          m: "auto",
          filter: `brightness(${0.9 + interest / 50})`,
          ...sx,
        }}
        className={styles.card}
        component={motion.div}
        animate={{
          padding: `${(11 - interest) * 7 + 10}px`,
        }}
      >
        <CardActionArea className={styles.cardAction}>
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
        </CardActionArea>
        <CardActions>
          <Toolbar
            sx={{
              display: "flex",
              width: "100%",
              gap: "20px",
              justifyContent: "space-between",
            }}
          >
            <Typography>Interest:</Typography>
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
    </>
  );
}
