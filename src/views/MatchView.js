import { Box, Grid, Toolbar } from "@mui/material";
import { Container } from "@mui/system";
import MatchCard from "../components/MatchCard";

export default function MatchView({ img, title }) {
  return (
    <Grid container>
      <Grid item md={4}>
        <MatchCard img={img} title={title}></MatchCard>
      </Grid>

      <Grid item md={4}>
        <MatchCard img={img} title={title}></MatchCard>
      </Grid>
      <Grid item md={4}>
        <MatchCard img={img} title={title}></MatchCard>
      </Grid>
    </Grid>
  );
}
