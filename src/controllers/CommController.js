import Error from "next/error";
import { useContext, useEffect } from "react";
import useContacts from "../hooks/useContacts";
import CommView from "../views/CommView";
import { AudioContext } from "../contexts/AudioContext";
import { NAVIGATORS } from "../tools/compatibility";

export default function CommController({ peer, session }) {
  const [data, loading, error] = useContacts();
  const [context, setContext] = useContext(AudioContext);

  function callPeer(idx) {
    if (!data || !navigator || context) return;
    navigator.getUserMedia = NAVIGATORS(navigator);

    navigator.getUserMedia(
      { video: false, audio: true },
      // Success callback
      function success(localAudioStream) {
        const outgoing = peer.call(data[idx].peer, localAudioStream);
        console.log(data[idx].peer);

        outgoing.on("stream", function (stream) {
          console.log("stream went", stream);
          setContext(stream);
          // Do something with this audio stream
        });
        // Do something with audio stream
      },
      // Failure callback
      function error(err) {
        // handle error
      }
    );
  }

  useEffect(() => {
    if (!peer || !data) return;
    data.map((x) => {
      const conn = peer.connect(x.peer, { metadata: session.name });

      // const conn = peer.connect(data.id, { metadata: session.name });
      conn.on("open", () => {
        console.log("connection opened");
        x.dot = "dot";
      });
      conn.on("error", (err) => {
        console.log("this is the error", err);
      });
    });
  }, [data, peer]);

  if (error) return <Error />;

  return <>{session && data && <CommView contacts={data} call={callPeer} />}</>;
}
