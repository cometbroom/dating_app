import { Box, Grid, Paper } from "@mui/material";
import TabPanel from "../components/TabPanel";
import LoginController from "../controllers/LoginController";
import SignupController from "../controllers/SignupController";

const GetImageBg = () => <img src="/deep_ocean.svg" />;

export default function SignupView() {
  return (
    <Grid bgcolor="seconday" columnSpacing={3} container>
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
            <LoginController key={1} />,
          ]}
        />
      </Grid>
      <Grid item md={6} sx={{ display: { xs: "none", sm: "flex" } }}>
        <Box
          sx={{
            width: "100%",
            alignSelf: "center",
          }}
        >
          <Paper component={GetImageBg}></Paper>
        </Box>
      </Grid>
    </Grid>
  );
}
