import { Paper, Typography } from "@mui/material";

export default function Message({ sender, msg, color, sent }) {
  return (
    <Paper
      sx={{
        width: { xs: "95%", md: "90%" },
        position: "relative",
        left: sent ? { xs: "5%", md: "10%" } : "0",
        p: 3,
      }}
    >
      <Typography
        variant="h6"
        color={color}
        sx={{ textShadow: `0 0 4px ${color}` }}
      >
        {sender}
      </Typography>
      <Typography variant="subtitle1">{msg}</Typography>
    </Paper>
  );
}
