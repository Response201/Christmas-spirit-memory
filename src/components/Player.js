import React, { useState, useEffect } from "react";
import { ImMusic, ImVolumeMute2 } from "react-icons/im";
import jul from "../Music/Jul1.mp3"

const useAudio = url => {
 
  const [audio] = useState(new Audio(jul));
  const [playing, setPlaying] = useState(true);

  const toggle = () => setPlaying(!playing);

  useEffect(() => {
      playing ? audio.play() : audio.pause();
    },
    [playing]
  );

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, []);

  return [playing, toggle];
};


const Player = () => {
 


  return (
    <div>
     
    </div>
  );
};

export default Player;