import { useEffect } from "react";
import useSound from "use-sound";

const useSoundPlayer = (songUrl: string, volume: number = 1) => {
  const [play, { pause, sound }] = useSound(songUrl, {
    volume,
    format: ["mp4", "m4a","mp3"],
  });

  // Cleanup when component unmounts
  useEffect(() => {
    return () => {
      sound?.unload();
    };
  }, [sound]);

  return { play, pause, sound };
};

export default useSoundPlayer;
