import { useEffect, useState } from "react";
import usePeer from "../hooks/usePeer";
import useSession from "../hooks/useSession";
import ChatView from "../views/ChatView";

const history = [
  { sender: "Ali", text: "Hi", sent: true },
  { sender: "Boom", text: "Hey how you doing?", sent: false },
];

export default function ChatController({ bar }) {
  const [session, loadSession, errSession] = useSession();
  const [peer] = usePeer(session);

  async function sendMsg(text) {
    console.log(text, "will be sent");
    if (!peer || !session) return;
    // session.chats[0].peer
    try {
      const response = await fetch("/api/chat", { method: "GET" });
      const data = await response.json();
      const conn = peer.connect(data.id, { metadata: session.name });
      console.log(conn, "is the connection");

      // const conn = peer.connect(data.id, { metadata: session.name });
      conn.on("open", () => {
        console.log("connection opened");
        conn.send(text);
      });
      conn.on("error", (err) => {
        console.log("this is the error", err);
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      {session && (
        <ChatView
          session={session}
          sendText={sendMsg}
          peer={peer}
          bar={bar}
        ></ChatView>
      )}
    </>
  );
}
