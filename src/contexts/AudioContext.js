import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import CallCard from "../components/CallCard";

import { NAVIGATORS } from "../tools/compatibility";

export const AudioContext = React.createContext([]);

export default function AudioProvider({ peer, ...props }) {
  const [stream, setStream] = useState();
  const [callFunction, setCallFunction] = useState();
  const [caller, setCaller] = useState("");

  useEffect(() => {
    if (!peer) return;
    peer.on("call", (incoming) => {
      setCaller(incoming.metadata.name);
      if (!navigator) return;
      navigator.getUserMedia = NAVIGATORS(navigator);

      setCallFunction({
        accept: () => {
          navigator.getUserMedia(
            { video: false, audio: true },
            function success(localAudioStream) {
              incoming.answer(localAudioStream);
            },
            function error(err) {}
          );
          incoming.on("stream", (stream) => {
            setStream(stream);
          });
        },
        reject: () => {
          incoming.close();
          peer.destroy();
          setCallFunction();
        },
      });
    });
  }, [peer]);

  return (
    <AudioContext.Provider value={[stream, setStream]}>
      <>
        {callFunction && (
          <CallCard callFunction={callFunction} caller={caller} />
        )}

        {props.children}
        {stream && <ReactPlayer playing={stream ? true : false} url={stream} />}
      </>
    </AudioContext.Provider>
  );
}
