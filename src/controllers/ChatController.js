import { useEffect, useState } from "react";
import usePeer from "../hooks/usePeer";
import useSession from "../hooks/useSession";
import ChatView from "../views/ChatView";

const history = [
  { sender: "Ali", text: "Hi", sent: true },
  { sender: "Boom", text: "Hey how you doing?", sent: false },
];

function getRandomId() {
  let min = Math.ceil(10000000);
  let max = Math.floor(99999999);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function ChatController() {
  const [session, loadSession, errSession] = useSession();
  const [connection, setConnection] = useState();
  // const [peer] = usePeer(session);

  function sendMsg(text) {
    console.log(text, "will be sent");
    if (!peer || !session) return;
    // session.chats[0].peer
    const conn = peer.connect(text);
    conn.on("open", () => {
      console.log("Connection to peer 2 open");
      conn.send("hi");
    });
    conn.on("error", (err) => {
      console.log("this is the error", err);
    });
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
        <ChatView
          sendText={sendMsg}
          connection={connection}
          history={history}
        ></ChatView>
      )}
    </>
  );
}
