import { useEffect, useState } from "react";
import usePeer from "../hooks/usePeer";
import useSession from "../hooks/useSession";
import ChatView from "../views/ChatView";

const history = [
  { sender: "Ali", text: "Hi", sent: true },
  { sender: "Boom", text: "Hey how you doing?", sent: false },
];

export default function ChatController() {
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
      conn.on("open", () => {
        conn.send(text);
      });
      conn.on("error", (err) => {
        console.log("this is the error", err);
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  // useEffect(() => {
  //   if (!session) return;
  //   import("peerjs").then(async (x) => {
  //     const peer = new x.Peer(session.peerId);
  //     const conn = peer.connect(session.chats[0].peer);

  //     conn.on("error", (err) => {
  //       console.log(err);
  //     });

  //     conn.on("open", () => {
  //       console.log("yeah");
  //       setConnection(conn);
  //     });
  //     // peer.on("connection", (conn) => {
  //     //   conn.on("data", (data) => {
  //     //     console.log(data);
  //     //   });
  //     // });
  //   });
  // }, [session]);

  // const conn = peer.connect("97223302-7d7d-4528-b6ad-5329f3e28836");
  // conn.on("open", () => {
  //   conn.send("hi");
  // });

  // peer.on("connection", (conn) => {
  //   conn.on("data", (data) => {
  //     console.log(data);
  //   });
  //   conn.on("open", () => {
  //     conn.send("hello");
  //   });
  // });

  return (
    <>
      {session && (
        <ChatView session={session} sendText={sendMsg} peer={peer}></ChatView>
      )}
    </>
  );
}
