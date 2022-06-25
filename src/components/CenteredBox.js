import { Box } from "@mui/material";

export default function CenteredBox(props) {
  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{ width: "100%" }}
      >
        {props.children}
      </Box>
    </>
  );
}
