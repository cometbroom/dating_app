import React, { useState, useEffect } from "react";
import useFetch from "./useFetch";

const config = {
  iceServers: [
    { urls: ["stun:stun.l.google.com:19302"] },
    {
      urls: "turn:0.peerjs.com:3478",
      username: "peerjs",
      credential: "peerjsp",
    },
  ],
  sdpSemantics: "unified-plan",
  iceTransportPolicy: "relay",
};

// const localConfig = {
//   secure: true,
//   config,
//   debug: 0, // from 0 up to 3
// };

export default function usePeer(session) {
  const [peer, setPeer] = useState(null);
  const [peerId, setPeerId] = useState();
  const [data, loading, error] = useFetch(`/api/chat/${peerId}`, {
    method: "POST",
  });

  const cleanUp = () => {
    if (peer) {
      peer.disconnect();
      peer.destroy();
    }
    setPeer(null);
  };

  useEffect(() => {
    console.log(session);

    if (!session) return;
    // const id = session.peerId;
    import("peerjs")
      .then((x) => {
        const peer = peer ? peer : new x.Peer();

        peer.on("open", (id) => {
          console.log("opened", id);
          setPeer(peer);
          setPeerId(id);
        });

        peer.on("connection", (conn) => {
          conn.on("data", (data) => {
            console.log(data);
          });
        });

        peer.on("disconnected", () => {
          console.log("Peer desconnected");
          cleanUp();
        });

        peer.on("close", () => {
          console.log("Peer closed remotetly");
          cleanUp();
        });

        peer.on("error", (error) => {
          console.log("peer error", error);
          cleanUp();
        });
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      cleanUp();
    };
  }, [session]);

  return [peer];
}
