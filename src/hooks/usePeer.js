import { useState, useEffect } from "react";
import useUpdate from "./useUpdate";

export default function usePeer(session) {
  const [peer, setPeer] = useState(null);
  const [peerId, setPeerId] = useState();
  useUpdate(peerId);

  const cleanUp = () => {
    if (peer) {
      peer.disconnect();
      peer.destroy();
    }
    setPeer(null);
  };

  useEffect(() => {
    if (!session) return;
    // const id = session.peerId;
    import("peerjs")
      .then((x) => {
        const peer = peer ? peer : new x.Peer();

        peer.on("open", (id) => {
          setPeer(peer);
          setPeerId(id);
        });

        peer.on("disconnected", () => {
          cleanUp();
        });

        peer.on("close", () => {
          cleanUp();
        });

        peer.on("error", (error) => {});
      })
      .catch((error) => {});

    return () => {
      cleanUp();
    };
  }, [session]);

  return [peer];
}
