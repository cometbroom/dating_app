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
import { useEffect, useState } from "react";
import styles from "../../styles/MatchCard.module.css";
import { GET_ERROR_PATH } from "../tools/constants";

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac ultrices lorem. Cras dictum, nunc sit amet blandit dignissim, enim velit sagittis eros, ut lobortis est purus eget nibh. Ut eu congue libero, at porta felis. ";

function valueText(value) {
  return `${value} out of 10`;
}

export default function MatchCard({ sx, img, title, bio }) {
  const [interest, setInterest] = useState(0);

  function sliderChanged(e, value) {
    setInterest(value);
  }

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
              defaultValue={0}
              step={1}
              min={0}
              max={10}
              sx={{ width: "100%" }}
              valueLabelDisplay="auto"
              getAriaValueText={valueText}
              onChange={sliderChanged}
              classes={styles.slider}
            />
          </Toolbar>
        </CardActions>
      </Card>{" "}
    </>
  );
}
