import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import useSession from "../hooks/useSession";

export default function LandingContent() {
  const GetImageBg = () => <img src="/eezy_24.svg" />;
  const [session, loading, error] = useSession();

  return (
    <>
      <Grid
        component="main"
        container
        columnSpacing={2}
        sx={{ alignItems: "center", height: "100vh", mt: { xs: 8, sm: 0 } }}
      >
        <Grid item xs={12} sm={6}>
          <Box>
            <Typography variant="h4" color="primary">
              Submarine Dating
            </Typography>
            <Typography variant="h5" paragraph align="justify" pr={2}>
              Find someone who appreciates your uniqueness and get submerged
              into the ocean.
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper
            component={GetImageBg}
            elevation={0}
            variant="outlined"
          ></Paper>
          <Box></Box>
        </Grid>
        <Grid
          sx={{
            display: "flex",
            justifyContent: "center",
            alignSelf: "flex-start",
          }}
          item
          xs={12}
        >
          {loading ? (
            <CircularProgress />
          ) : (
            <Link href={session ? "/application/" : "/signup/"}>
              <Button variant="contained">Get Started</Button>
            </Link>
          )}
        </Grid>
      </Grid>
    </>
  );
}
