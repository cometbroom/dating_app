import {
  Box,
  Button,
  Card,
  CardHeader,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import CallIcon from "@mui/icons-material/Call";
import CallEndIcon from "@mui/icons-material/CallEnd";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useReducer, useState } from "react";
import { FORMAT_TIME } from "../tools/time";
import { CALL_STATES } from "../tools/constants";

function reducer(state, action) {
  return state + action;
}

export default function CallCard({
  callFunction,
  initialState = CALL_STATES.INCOMING,
  caller,
  errorMessage = "",
}) {
  const call = true;
  const [state, setState] = useState(initialState);

  const [counter, dispatch] = useReducer(reducer, 0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      dispatch(1);
    }, 1000);
    console.log("interval created", intervalId);

    return () => {
      console.log("interval cleared");
      clearInterval(intervalId);
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        style={{
          x: "-50%",
          y: "-50%",
          position: "absolute",
          left: "50%",
          top: "50%",
          zIndex: 10,
        }}
        animate={
          state !== CALL_STATES.INCOMING
            ? {}
            : {
                rotate: [0, -3, 0, 3, 0],
                transition: {
                  repeat: 50,
                  repeatDelay: 2,
                  duration: 0.7,
                  bounce: 0.5,
                },
              }
        }
        exit={{ opacity: 0 }}
      >
        <Paper
          elevation={10}
          sx={{
            width: 345,
            p: 5,
            borderRadius: "10px",
            minHeight: "400px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Stack spacing={3}>
            <Typography sx={{ textAlign: "center" }} variant="h6">
              {state === CALL_STATES.OUTGOING
                ? "Outgoing call..."
                : state === CALL_STATES.ONCALL
                ? "Ongoing call..."
                : "Incoming call from..."}
            </Typography>
            {errorMessage && (
              <Typography sx={{ textAlign: "center" }} variant="h5" color="red">
                {errorMessage}
              </Typography>
            )}
            <Typography
              sx={{ textAlign: "center" }}
              variant="h4"
              color="primary"
            >
              {caller}
            </Typography>
            {state === CALL_STATES.ONCALL && (
              <Typography sx={{ textAlign: "center" }}>
                {FORMAT_TIME(counter)}
              </Typography>
            )}
          </Stack>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent:
                state !== CALL_STATES.INCOMING ? "center" : "space-between",
            }}
          >
            <Button
              variant="contained"
              color="error"
              onClick={callFunction.reject}
            >
              <CallEndIcon sx={{ color: "white" }} />
            </Button>
            {state === CALL_STATES.INCOMING && (
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  setState(CALL_STATES.ONCALL);
                  callFunction.accept();
                }}
              >
                <CallIcon sx={{ color: "white" }} />
              </Button>
            )}
          </Box>
        </Paper>
      </motion.div>
    </AnimatePresence>
  );
}
