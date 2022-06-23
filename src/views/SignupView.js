import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Toolbar,
  Typography,
} from "@mui/material";
import CenteredBox from "../components/CenteredBox";
import TabPanel from "../components/TabPanel";

export default function SignupView() {
  return (
    <Grid bgcolor="seconday" container>
      <Grid
        item
        md={6}
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <TabPanel
          tabLabels={["Sign up", "Login"]}
          tabContent={[
            <Typography>Sign up content</Typography>,
            <Typography>Login content</Typography>,
          ]}
        />
        <Button variant="contained">Sign up!</Button>
      </Grid>
      <Grid item md={6}></Grid>
    </Grid>
  );
}
