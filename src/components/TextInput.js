import SendIcon from "@mui/icons-material/Send";
import { Box, Button, Divider, TextField } from "@mui/material";
import { useEffect, useRef } from "react";

export const TextInput = ({ sendText }) => {
  const textValue = useRef();

  const clickHandler = () => {
    const inputEl = textValue.current.querySelector("input");
    const value = inputEl.value || "";
    inputEl.value = "";
    sendText(value);
  };

  const enterHandler = (e) => {
    if (e.key === "Enter") {
      clickHandler();
    }
  };

  useEffect(() => {
    window.addEventListener("keyup", enterHandler);
    return () => {
      window.removeEventListener("keyup", enterHandler);
    };
  }, []);

  return (
    <>
      <Divider />
      <Box
        sx={{
          minWidth: "100%",
          display: "flex",
          flexDirection: "row",
          gap: "10px",
        }}
      >
        <TextField
          id="standard-text"
          label="Send something"
          sx={{ flex: "12" }}
          ref={textValue}
          //margin="normal"
        />
        <Button
          sx={{ flex: "1" }}
          variant="contained"
          color="primary"
          onClick={clickHandler}
        >
          <SendIcon />
        </Button>
      </Box>
    </>
  );
};
