import {
  Box,
  Button,
  Grid,
  Paper,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Container } from "@mui/system";
import MatchCard from "../components/MatchCard";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import styles from "../../styles/MatchView.module.css";
import classNames from "classnames";
import { useState } from "react";
import DirectionNav from "../components/DirectionNav";

export default function MatchView({ img, title }) {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));
  return (
    <Grid container sx={{ alignItems: "center", height: "100vh", p: 3 }}>
      {matches && (
        <Grid item md={3}>
          <DirectionNav direction="left" />
        </Grid>
      )}

      <Grid item md={6}>
        <MatchCard img={img} title={title}></MatchCard>
      </Grid>
      {matches && (
        <Grid item md={3}>
          <DirectionNav direction="right" />
        </Grid>
      )}
    </Grid>
  );
}
