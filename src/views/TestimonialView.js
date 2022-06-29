import { Container, Grid, useMediaQuery } from "@mui/material";
import classNames from "classnames";
import styles from "../../styles/Testimonial.module.css";
import TestimonyCard from "../components/TestimonyCard";

const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer ac ultrices lorem. Cras dictum, nunc sit amet blandit dignissim, enim velit sagittis eros, ut lobortis est purus eget nibh. Ut eu congue libero, at porta felis. Nulla quis est nec mauris pharetra ultrices. Pellentesque sit amet posuere odio, at tempus urna. Sed at nisl hendrerit, pellentesque dolor sed, vestibulum ante. Sed sollicitudin condimentum libero.";

export default function TestimonialView({ users }) {
  const matchBigScreen = useMediaQuery((theme) => theme.breakpoints.up("md"));
  return (
    <Container>
      <Grid container mt={10} className={styles.container}>
        {users.map((user, idx) => (
          <Grid xs={12} item key={idx}>
            <TestimonyCard
              cardClass={
                idx % 2 !== 0
                  ? classNames(
                      styles.card,
                      matchBigScreen ? styles.evenCard : ""
                    )
                  : classNames(
                      styles.card,
                      matchBigScreen ? styles.oddCard : ""
                    )
              }
              mediaClass={styles.cardMedia}
              contentClass={styles.cardContent}
              user={user}
              text={LOREM}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
