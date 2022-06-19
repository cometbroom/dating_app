import { Paper, Typography } from "@mui/material";
import { useRouter } from "next/router";
import BugReportIcon from "@mui/icons-material/BugReport";
import LandingLayout from "../../src/Layouts/LandingLayout";

export default function Error() {
  const router = useRouter();
  const { msg } = router.query;
  return (
    <>
      <LandingLayout>
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Paper
            elevation={19}
            sx={{
              p: { xs: 1, sm: 10 },
              borderRadius: "10px",
            }}
          >
            <BugReportIcon
              sx={{ ml: "auto", mr: "auto", width: "100%", height: "92px" }}
              color="primary"
            />
            <Typography variant="h4" color="error" gutterBottom>
              Could not find page
            </Typography>
            <Typography variant="h6" align="center" paragraph>
              {msg}
            </Typography>
          </Paper>
        </div>
      </LandingLayout>
    </>
  );
}
