import Error from "next/error";
import { useContext, useEffect, useState } from "react";
import useContacts from "../hooks/useContacts";
import CommView from "../views/CommView";
import { AudioContext } from "../contexts/AudioContext";
import { NAVIGATORS } from "../tools/compatibility";
import CallCard from "../components/CallCard";
import { CALL_STATES } from "../tools/constants";

export default function CommController({ peer, session }) {
  const [data, loading, error] = useContacts();
  const [context, setContext] = useContext(AudioContext);
  const [callFunction, setCallFunction] = useState();
  const [callState, setCallState] = useState(CALL_STATES.OUTGOING);
  const [errorCall, setErrorCall] = useState("");

  function callPeer(idx) {
    if (!data || !navigator || context || !peer) return;
    navigator.getUserMedia = NAVIGATORS(navigator);

    navigator.getUserMedia(
      { video: false, audio: true },
      function success(localAudioStream) {
        const ongoing = peer.call(data[idx].peer, localAudioStream, {
          metadata: { name: session.name },
        });

        ongoing.on("stream", function (stream) {
          setCallState(CALL_STATES.ONCALL);
          setContext(stream);
        });
        peer.on("error", () => {
          setErrorCall("Could not reach your target.");
          setTimeout(() => {
            setCallFunction();
            setErrorCall("");
            console.log(peer);
          }, 6000);
        });
        setCallFunction({
          reject: () => {
            if (ongoing) ongoing.close();
            setCallFunction();
          },
        });
      },
      function error(err) {}
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

  return (
    <>
      {callFunction && (
        <CallCard
          callFunction={callFunction}
          initialState={callState}
          errorMessage={errorCall}
        />
      )}
      {session && data && <CommView contacts={data} call={callPeer} />}
    </>
  );
}
