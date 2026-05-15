"use client";

import { Pause, Play, VideoOff } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";

type ProductVideoCardProps = {
  title: string;
  videoSrc: string;
};

export default function ProductVideoCard({
  title,
  videoSrc,
}: ProductVideoCardProps) {
  const cardRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const playRequestIdRef = useRef(0);
  const isPlayPendingRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [showControls, setShowControls] = useState(true);

  const normalizedSrc = videoSrc?.trim() ?? "";
  const hasVideo = normalizedSrc.length > 0;

  const previewVideoSrc = hasVideo ? `${normalizedSrc}#t=0.5` : "";

  const waitForVideoReady = (video: HTMLVideoElement) => {
    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      return Promise.resolve();
    }

    return new Promise<void>((resolve) => {
      let settled = false;

      const cleanup = () => {
        if (settled) {
          return;
        }

        settled = true;
        window.clearTimeout(timeoutId);
        video.removeEventListener("loadeddata", handleReady);
        video.removeEventListener("canplay", handleReady);
        video.removeEventListener("error", handleReady);
      };

      const handleReady = () => {
        cleanup();
        resolve();
      };

      const timeoutId = window.setTimeout(handleReady, 12_000);

      video.addEventListener("loadeddata", handleReady, { once: true });
      video.addEventListener("canplay", handleReady, { once: true });
      video.addEventListener("error", handleReady, { once: true });
    });
  };

  useEffect(() => {
    const card = cardRef.current;

    if (!card || !hasVideo) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (entry.isIntersecting) {
          setShouldLoadVideo(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: "400px",
        threshold: 0.01,
      },
    );

    observer.observe(card);

    return () => {
      observer.disconnect();
    };
  }, [hasVideo]);

  useEffect(() => {
    if (!shouldLoadVideo) {
      return;
    }

    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.load();
  }, [shouldLoadVideo]);

  const handleTogglePlay = async () => {
    const video = videoRef.current;

    if (!video || !hasVideo) {
      return;
    }

    const cancelPendingPlay = () => {
      playRequestIdRef.current += 1;
      isPlayPendingRef.current = false;
      video.pause();
      setIsPlaying(false);
      setShowControls(true);
    };

    if (isPlaying || isPlayPendingRef.current) {
      cancelPendingPlay();
      return;
    }

    const requestId = ++playRequestIdRef.current;
    isPlayPendingRef.current = true;

    flushSync(() => {
      setShouldLoadVideo(true);
    });

    video.load();

    try {
      await waitForVideoReady(video);

      if (requestId !== playRequestIdRef.current) {
        return;
      }

      await video.play();

      if (requestId === playRequestIdRef.current) {
        setIsPlaying(true);
        setShowControls(false);
      }
    } catch {
      if (requestId === playRequestIdRef.current) {
        setIsPlaying(false);
        setShowControls(true);
      }
    } finally {
      if (requestId === playRequestIdRef.current) {
        isPlayPendingRef.current = false;
      }
    }
  };

  const handleMouseEnter = () => {
    if (isPlaying) {
      setShowControls(true);
    }
  };

  const handleMouseLeave = () => {
    if (isPlaying) {
      setShowControls(false);
    }
  };

  return (
    <article
      ref={cardRef}
      className="overflow-hidden rounded-2xl border border-white bg-[#080C17]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-[232px] w-full overflow-hidden bg-black">
        {hasVideo ? (
          <>
            <video
              ref={videoRef}
              className="h-full w-full object-cover"
              preload="metadata"
              playsInline
              muted
              onPlay={() => {
                setIsPlaying(true);
                setShowControls(false);
              }}
              onPause={() => {
                setIsPlaying(false);
                setShowControls(true);
              }}
              onEnded={() => {
                setIsPlaying(false);
                setShowControls(true);
              }}
            >
              {shouldLoadVideo ? (
                <source src={previewVideoSrc} type="video/mp4" />
              ) : null}
              Your browser does not support the video tag.
            </video>

            {!shouldLoadVideo && (
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),rgba(0,0,0,0.85))]" />
            )}

            <button
              type="button"
              onClick={handleTogglePlay}
              aria-label={isPlaying ? "Pause video" : "Play video"}
              className={`absolute inset-0 flex items-center justify-center bg-black/20 transition duration-300 hover:bg-black/30 focus-visible:bg-black/30 focus-visible:outline-none ${
                showControls ? "opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-black/45 text-white backdrop-blur-md transition duration-300 hover:scale-105 hover:bg-black/60">
                {isPlaying ? <Pause size={26} /> : <Play size={28} />}
              </span>
            </button>
          </>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[#080C17]">
            <VideoOff size={32} className="text-white/25" />
            <p
              className="text-white/30"
              style={{ fontFamily: "Poppins, sans-serif", fontSize: "12px" }}
            >
              Video coming soon
            </p>
          </div>
        )}
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