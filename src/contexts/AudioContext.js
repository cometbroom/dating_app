import React, { useEffect, useRef, useState } from "react";
import ReactAudioPlayer from "react-audio-player";
import ReactPlayer from "react-player";
import CallCard from "../components/CallCard";

import { NAVIGATORS } from "../tools/compatibility";

export const AudioContext = React.createContext([]);

export default function AudioProvider({ peer, ...props }) {
  const [stream, setStream] = useState();
  const [audioEl] = useRef();

  useEffect(() => {
    if (!peer) return;
    peer.on("call", (incoming) => {
      // handle browser prefixes
      if (!navigator) return;
      navigator.getUserMedia = NAVIGATORS(navigator);

      console.log("call came");
      navigator.getUserMedia(
        { video: false, audio: true },
        function success(localAudioStream) {
          incoming.answer(localAudioStream);
          console.log(audioEl);
        },
        function error(err) {}
      );

      incoming.on("stream", (stream) => {
        console.log("stream came", stream);
        setStream(stream);
      });
    });
  }, [peer]);

  return (
    <AudioContext.Provider value={[stream, setStream]}>
      <>
        <CallCard />
        {props.children}
        {stream && (
          <ReactPlayer
            playing={stream ? true : false}
            ref={audioEl}
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
