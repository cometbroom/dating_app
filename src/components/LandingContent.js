import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";

export default function LandingContent() {
  const GetImageBg = () => <img src="/eezy_24.svg" />;

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
          <Button variant="contained" href="/application/">
            Get Started
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
