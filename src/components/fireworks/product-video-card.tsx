"use client";

import { Pause, Play } from "lucide-react";
import { useRef, useState } from "react";

type ProductVideoCardProps = {
  title: string;
  videoSrc: string;
};

export default function ProductVideoCard({
  title,
  videoSrc,
}: ProductVideoCardProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const previewVideoSrc = `${videoSrc}#t=0.1`;

  const handleTogglePlay = async () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (video.paused) {
      try {
        await video.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <article className="overflow-hidden rounded-2xl border border-white bg-[#080C17]">
      <div className="relative h-[232px] w-full overflow-hidden bg-black">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          preload="metadata"
          playsInline
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        >
          <source src={previewVideoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <button
          type="button"
          onClick={handleTogglePlay}
          aria-label={isPlaying ? "Pause video" : "Play video"}
          className="absolute inset-0 flex items-center justify-center bg-black/20 transition duration-300 hover:bg-black/30"
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-black/45 text-white backdrop-blur-md transition duration-300 hover:scale-105 hover:bg-black/60">
            {isPlaying ? <Pause size={26} /> : <Play size={28} />}
          </span>
        </button>
      </div>

      <div className="px-4 py-3">
        <p
          className="text-white"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontSize: "16px",
            lineHeight: "24px",
          }}
        >
          {title}
        </p>
      </div>
    </article>
  );
}