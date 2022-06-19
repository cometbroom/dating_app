import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Slider,
  Typography,
} from "@mui/material";

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac ultrices lorem. Cras dictum, nunc sit amet blandit dignissim, enim velit sagittis eros, ut lobortis est purus eget nibh. Ut eu congue libero, at porta felis. Nulla quis est nec mauris pharetra ultrices. Pellentesque sit amet posuere odio, at tempus urna. Sed at nisl hendrerit, pellentesque dolor sed, vestibulum ante. Sed sollicitudin condimentum libero.";

function valueText(value) {
  return `${value} out of 10`;
}

export default function MatchCard({ img, title, bio }) {
  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={img}
            alt={`An image of ${title}`}
          />
          <CardContent>
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
          />
        </CardActions>
      </Card>{" "}
    </>
  );
}
