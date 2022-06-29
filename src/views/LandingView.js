import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import Link from "next/link";
import useSession from "../hooks/useSession";

const GetImageBg = () => <img src="/eezy_24.svg" />;

export default function LandingView() {
  const [session, loading] = useSession();

  return (
    <Grid
      component="main"
      container
      columnSpacing={2}
      sx={{ alignItems: "center", height: "100vh", mt: { xs: 8, sm: 0 } }}
    >
      <Grid item xs={12} sm={6}>
        <Box>
          <Typography variant="h4" color="primary">
            Submarine Social
          </Typography>
          <Typography variant="h5" paragraph align="justify" pr={2}>
            Find people that share your interest and get submerged into the
            ocean.
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper component={GetImageBg} elevation={0} variant="outlined"></Paper>
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
  );
}
