import { Box, Container, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Message from "../components/Message";
import { TextInput } from "../components/TextInput";
import { Random, shuffle } from "../tools/random";

const COLORS = [
  // "#9400D3",
  // "#4B0082",
  // "#0000FF",
  // "#00FF00",
  "#FFFF00",
  // "#FF7F00",
  "#FF0000",
];

const getRand = () => Math.floor(Math.random() * COLORS.length);

export default function ChatView({ peer, sendText, session }) {
  const [history, setHistory] = useState([]);

  const getHistory = (obj) => [...history, obj];

  const connectionHandler = (conn) => {
    conn.on("data", (data) => {
      console.log(history);
      setHistory([
        ...history,
        { sender: conn.metadata, text: data, sent: false },
      ]);
    });
  };

  useEffect(() => {
    if (!peer) return;
    console.log("peer changed");
    peer.on("connection", connectionHandler);
    return () => {
      peer.off("connection");
    };
  }, [peer]);

  const sendHandler = (value) => {
    setHistory([
      ...history,
      { sender: session ? session.name : "No name", text: value, sent: true },
    ]);
    sendText(value);
  };

  // shuffle(COLORS);

  return (
    <Grid container direction="column">
      <Grid
        item
        sx={{
          display: "flex",
          minHeight: "700px",
          flexDirection: "column",
          gap: "20px",
          overflowY: "scroll",
        }}
      >
        {history.map((msg, idx) => (
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
        // sx={{ position: "fixed", bottom: "10px", right: 0, left: "240px" }}
      >
        <TextInput sendText={sendHandler} />
      </Grid>
    </Grid>
  );
}
