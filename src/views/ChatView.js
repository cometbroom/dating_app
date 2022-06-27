import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useReducer, useRef, useState } from "react";
import Message from "../components/Message";
import { TextInput } from "../components/TextInput";
import { shuffle } from "../tools/random";

const COLORS = [
  // "#9400D3",
  // "#4B0082",
  // "#0000FF",
  // "#00FF00",
  "#FFFF00",
  // "#FF7F00",
  "#FF0000",
];

const history = [];

function reducer(state, action) {
  state.push(action);
  console.log(state);
  return [...state];
}

export default function ChatView({ peer, sendText, session, bar }) {
  const theme = useTheme();
  const biggerScreens = useMediaQuery(theme.breakpoints.up("md"));

  const [state, dispatch] = useReducer(reducer, []);

  const connectionHandler = (conn) => {
    conn.on("data", (data) => {
      console.log(data);
      dispatch({
        sender: conn.metadata,
        text: data,
        sent: false,
      });
    });
  };

  useEffect(() => {
    if (!peer) return;
    peer.on("connection", connectionHandler);
    return () => {
      peer.off("connection");
    };
  }, [peer]);

  const sendHandler = (value) => {
    dispatch({
      sender: session ? session.name : "No name",
      text: value,
      sent: true,
    });
    sendText(value);
    // setText([
    //   ...historyRef.current,
    //   { sender: session ? session.name : "No name", text: value, sent: true },
    // ]);
  };

  // shuffle(COLORS);

  return (
    <Grid container direction="column">
      <Grid
        item
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {state &&
          state.map((msg, idx) => (
            <Message
              key={idx}
              sender={msg.sender}
              msg={msg.text}
              color={msg.sent ? COLORS[0] : COLORS[1]}
              sent={msg.sent}
            />
          ))}
      </Grid>
      <Grid
        item
        sx={{
          position: "fixed",
          bottom: "10px",
          right: 0,
          left: bar ? (biggerScreens ? "240px" : "80px") : 0,
        }}
      >
        <TextInput sendText={sendHandler} />
      </Grid>
    </Grid>
  );
}
