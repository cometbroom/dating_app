import {
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { style } from "@mui/system";
import styles from "../../styles/Testimonial.module.css";

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac ultrices lorem. Cras dictum, nunc sit amet blandit dignissim, enim velit sagittis eros, ut lobortis est purus eget nibh. Ut eu congue libero, at porta felis. Nulla quis est nec mauris pharetra ultrices. Pellentesque sit amet posuere odio, at tempus urna. Sed at nisl hendrerit, pellentesque dolor sed, vestibulum ante. Sed sollicitudin condimentum libero.";

export default function TestimonialView({ users }) {
  return (
    <Container>
      <Grid container mt={10} className={styles.container}>
        {users.map((user, idx) => (
          <Grid item xs={12} key={idx}>
            <Card className={styles.card}>
              <CardMedia
                className={styles.cardMedia}
                image={user.picture.large}
                title="Image Title"
              />
              <CardContent className={styles.cardContent}>
                <Typography variant="h4">{user.name.first}</Typography>
                <Typography variant="h6">{LOREM}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
