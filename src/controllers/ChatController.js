import { useEffect, useState } from "react";
import useSession from "../hooks/useSession";
import ChatView from "../views/ChatView";

const history = [
  { sender: "Ali", text: "Hi", sent: true },
  { sender: "Boom", text: "Hey how you doing?", sent: false },
];

export default function ChatController() {
  const [session, loadSession, errSession] = useSession();
  const [connection, setConnection] = useState();

  useEffect(() => {
    if (!session) return;
    import("simple-peer").then((x) => {
      // var peer1 = new x.default({ initiator: true });
      // var peer2 = new x.default();
      // peer1.on("signal", (data) => {
      //   // when peer1 has signaling data, give it to peer2 somehow
      //   peer2.signal(data);
      // });
      // peer2.on("signal", (data) => {
      //   // when peer2 has signaling data, give it to peer1 somehow
      //   peer1.signal(data);
      // });
      // peer1.on("connect", () => {
      //   // wait for 'connect' event before using the data channel
      //   peer1.send("hey peer2, how is it going?");
      // });
      // peer2.on("data", (data) => {
      //   // got a data channel message
      //   console.log("got a message from peer1: " + data);
      // });
    });
  }, [session]);

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

  useEffect(() => {
    if (!connection) return;
    console.log(connection);
  }, [connection]);
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
        <ChatView connection={connection} history={history}></ChatView>
      )}
    </>
  );
}
