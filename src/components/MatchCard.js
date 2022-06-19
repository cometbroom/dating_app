import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Slider,
  Typography,
} from "@mui/material";
import styles from "../../styles/MatchCard.module.css";

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac ultrices lorem. Cras dictum, nunc sit amet blandit dignissim, enim velit sagittis eros, ut lobortis est purus eget nibh. Ut eu congue libero, at porta felis. ";

function valueText(value) {
  return `${value} out of 10`;
}

export default function MatchCard({ img, title, bio }) {
  return (
    <>
      <Card
        sx={{
          m: "auto",
        }}
        className={styles.card}
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
          <Slider
            aria-label="Interest Slider"
            defaultValue={0}
            step={1}
            min={0}
            max={10}
            valueLabelDisplay="auto"
            getAriaValueText={valueText}
            classes={styles.slider}
          />
        </CardActions>
      </Card>{" "}
    </>
  );
}
