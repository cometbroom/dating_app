import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import TabPanel from "../components/TabPanel";
import SignupController from "../controllers/SignupController";

export default function SignupView() {
  return (
    <Grid bgcolor="seconday" container>
      <Grid
        item
        md={6}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <TabPanel
          tabLabels={["Sign up", "Login"]}
          tabContent={[
            <SignupController key={0} />,
            <Typography key={1}>Login content</Typography>,
          ]}
        />
      </Grid>
      <Grid item md={6}></Grid>
    </Grid>
  );
}
