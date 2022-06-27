import React, { useEffect, useRef, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
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
      // handle browser prefixes
      if (!navigator) return;
      navigator.getUserMedia = NAVIGATORS(navigator);

      console.log("call gotten");

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
            console.log("stream came", stream);
            setStream(stream);
          });
        },
        reject: () => {
          console.log("closing clinet");
          incoming.close();
          peer.destroy();
          setCallFunction();
        },
      });
      console.log(callFunction);
    });
  }, [peer]);

  return (
    <AudioContext.Provider value={[stream, setStream]}>
      <>
        {callFunction && (
          <CallCard callFunction={callFunction} caller={caller} />
        )}

        {props.children}
        {stream && (
          <ReactPlayer
            playing={stream ? true : false}
            url={stream}
            onStart={() => {
              console.log("Media started playing");
            }}
          />
        )}
      </>
    </AudioContext.Provider>
  );
}
