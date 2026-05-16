"use client";

import {
  AlertTriangle,
  Pause,
  Play,
  VideoOff,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { variantSlug } from "@/src/lib/variant-slug";

type ProductVideoCardProps = {
  id?: string;
  title: string;
  videoSrc: string;
};

export default function ProductVideoCard({
  id,
  title,
  videoSrc,
}: ProductVideoCardProps) {
  const cardRef = useRef<HTMLElement | null>(null);
  const previewVideoRef = useRef<HTMLVideoElement | null>(null);
  const popupVideoRef = useRef<HTMLVideoElement | null>(null);
  const playRequestIdRef = useRef(0);
  const hideControlsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(
    null,
  );
  const highlightTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isMounted, setIsMounted] = useState(false);
  const [shouldLoadPreview, setShouldLoadPreview] = useState(false);
  const [shouldWarmVideo, setShouldWarmVideo] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupPlaying, setIsPopupPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showPopupControls, setShowPopupControls] = useState(true);
  const [previewError, setPreviewError] = useState(false);
  const [popupError, setPopupError] = useState(false);
  const [isPopupLoading, setIsPopupLoading] = useState(false);

  const normalizedSrc = videoSrc?.trim() ?? "";
  const hasVideo = normalizedSrc.length > 0;
  const cardId = id ?? variantSlug(title);
  const previewVideoSrc = hasVideo ? `${normalizedSrc}#t=0.5` : "";

  const clearHideControlsTimer = useCallback(() => {
    if (hideControlsTimerRef.current) {
      clearTimeout(hideControlsTimerRef.current);
      hideControlsTimerRef.current = null;
    }
  }, []);

  const clearHighlightTimer = useCallback(() => {
    if (highlightTimerRef.current) {
      clearTimeout(highlightTimerRef.current);
      highlightTimerRef.current = null;
    }
  }, []);

  const scheduleHideControls = useCallback(() => {
    clearHideControlsTimer();

    hideControlsTimerRef.current = setTimeout(() => {
      setShowPopupControls(false);
    }, 1100);
  }, [clearHideControlsTimer]);

  const waitForVideoReady = (video: HTMLVideoElement) => {
    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      return Promise.resolve();
    }

    return new Promise<void>((resolve, reject) => {
      let settled = false;

      const cleanup = () => {
        if (settled) {
          return;
        }

        settled = true;
        window.clearTimeout(timeoutId);
        video.removeEventListener("loadeddata", handleReady);
        video.removeEventListener("canplay", handleReady);
        video.removeEventListener("error", handleError);
      };

      const handleReady = () => {
        cleanup();
        resolve();
      };

      const handleError = () => {
        cleanup();
        reject(new Error("Video failed to load."));
      };

      const timeoutId = window.setTimeout(() => {
        cleanup();
        reject(new Error("Video loading timed out."));
      }, 12_000);

      video.addEventListener("loadeddata", handleReady, { once: true });
      video.addEventListener("canplay", handleReady, { once: true });
      video.addEventListener("error", handleError, { once: true });
    });
  };

  const handleClosePopup = useCallback(() => {
    const popupVideo = popupVideoRef.current;

    playRequestIdRef.current += 1;
    clearHideControlsTimer();

    if (popupVideo) {
      popupVideo.pause();
      popupVideo.currentTime = 0;
    }

    setIsPopupOpen(false);
    setIsPopupPlaying(false);
    setIsPopupLoading(false);
    setPopupError(false);
    setShowPopupControls(true);
  }, [clearHideControlsTimer]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);

    return () => {
      clearHideControlsTimer();
      clearHighlightTimer();
    };
  }, [clearHideControlsTimer, clearHighlightTimer]);

  useEffect(() => {
    const card = cardRef.current;

    if (!card) {
      return;
    }

    const handleGalleryHighlight = () => {
      clearHighlightTimer();
      setIsHighlighted(true);

      highlightTimerRef.current = setTimeout(() => {
        setIsHighlighted(false);
      }, 1800);
    };

    card.addEventListener("gallery-highlight", handleGalleryHighlight);

    return () => {
      card.removeEventListener("gallery-highlight", handleGalleryHighlight);
    };
  }, [clearHighlightTimer]);

  useEffect(() => {
    const card = cardRef.current;

    if (!card || !hasVideo) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;

        if (entry.isIntersecting) {
          setShouldLoadPreview(true);
          setShouldWarmVideo(true);
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: "500px",
        threshold: 0.01,
      },
    );

    observer.observe(card);

    return () => {
      observer.disconnect();
    };
  }, [hasVideo]);

  useEffect(() => {
    if (!shouldLoadPreview) {
      return;
    }

    const previewVideo = previewVideoRef.current;

    if (!previewVideo) {
      return;
    }

    try {
      previewVideo.load();
    } catch {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPreviewError(true);
    }
  }, [shouldLoadPreview]);

  useEffect(() => {
    if (!shouldWarmVideo || !hasVideo) {
      return;
    }

    const warmVideoLink = document.createElement("link");
    warmVideoLink.rel = "prefetch";
    warmVideoLink.as = "video";
    warmVideoLink.href = normalizedSrc;

    document.head.appendChild(warmVideoLink);

    return () => {
      warmVideoLink.remove();
    };
  }, [shouldWarmVideo, hasVideo, normalizedSrc]);

  useEffect(() => {
    if (!isPopupOpen) {
      return;
    }

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClosePopup();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isPopupOpen, handleClosePopup]);

  useEffect(() => {
    if (!isPopupOpen || !hasVideo) {
      return;
    }

    const popupVideo = popupVideoRef.current;

    if (!popupVideo) {
      return;
    }

    popupVideo.muted = isMuted;
    setPopupError(false);
    setIsPopupLoading(true);

    try {
      popupVideo.load();
    } catch {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsPopupLoading(false);
      setPopupError(true);
      setIsPopupPlaying(false);
      setShowPopupControls(true);
      return;
    }

    const playVideo = async () => {
      const requestId = ++playRequestIdRef.current;

      try {
        await waitForVideoReady(popupVideo);

        if (requestId !== playRequestIdRef.current) {
          return;
        }

        setIsPopupLoading(false);

        await popupVideo.play();

        if (requestId === playRequestIdRef.current) {
          setIsPopupPlaying(true);
          setPopupError(false);
          setShowPopupControls(true);
          scheduleHideControls();
        }
      } catch {
        if (requestId === playRequestIdRef.current) {
          setIsPopupLoading(false);
          setIsPopupPlaying(false);
          setPopupError(true);
          setShowPopupControls(true);
        }
      }
    };

    playVideo();
  }, [isPopupOpen, hasVideo, isMuted, scheduleHideControls]);

  const handleOpenPopup = () => {
    if (!hasVideo) {
      return;
    }

    setIsPopupOpen(true);
    setIsPopupPlaying(false);
    setIsPopupLoading(true);
    setPopupError(false);
    setShowPopupControls(true);
  };

  const handleTogglePopupPlay = async () => {
    const popupVideo = popupVideoRef.current;

    if (!popupVideo || !hasVideo) {
      return;
    }

    if (popupVideo.paused) {
      const requestId = ++playRequestIdRef.current;

      setPopupError(false);
      setIsPopupLoading(true);

      try {
        await waitForVideoReady(popupVideo);

        if (requestId !== playRequestIdRef.current) {
          return;
        }

        setIsPopupLoading(false);

        await popupVideo.play();

        if (requestId === playRequestIdRef.current) {
          setIsPopupPlaying(true);
          setShowPopupControls(true);
          scheduleHideControls();
        }
      } catch {
        if (requestId === playRequestIdRef.current) {
          setIsPopupLoading(false);
          setIsPopupPlaying(false);
          setPopupError(true);
          setShowPopupControls(true);
        }
      }

      return;
    }

    popupVideo.pause();
    setIsPopupPlaying(false);
    setIsPopupLoading(false);
    setShowPopupControls(true);
  };

  const handleRetryPopupVideo = async () => {
    const popupVideo = popupVideoRef.current;

    if (!popupVideo || !hasVideo) {
      return;
    }

    playRequestIdRef.current += 1;
    setPopupError(false);
    setIsPopupLoading(true);
    setIsPopupPlaying(false);
    setShowPopupControls(true);

    try {
      popupVideo.load();
      await waitForVideoReady(popupVideo);
      setIsPopupLoading(false);
      await popupVideo.play();
      setIsPopupPlaying(true);
      scheduleHideControls();
    } catch {
      setIsPopupLoading(false);
      setIsPopupPlaying(false);
      setPopupError(true);
      setShowPopupControls(true);
    }
  };

  const handleToggleMute = () => {
    const popupVideo = popupVideoRef.current;
    const nextMutedState = !isMuted;

    setIsMuted(nextMutedState);

    if (popupVideo) {
      popupVideo.muted = nextMutedState;
      popupVideo.volume = nextMutedState ? 0 : 1;
    }

    setShowPopupControls(true);

    if (isPopupPlaying) {
      scheduleHideControls();
    }
  };

  const handlePopupPointerMove = () => {
    setShowPopupControls(true);

    if (isPopupPlaying && !popupError && !isPopupLoading) {
      scheduleHideControls();
    }
  };

  const handlePopupMouseEnter = () => {
    setShowPopupControls(true);

    if (isPopupPlaying && !popupError && !isPopupLoading) {
      scheduleHideControls();
    }
  };

  const handlePopupMouseLeave = () => {
    if (isPopupPlaying && !popupError && !isPopupLoading) {
      clearHideControlsTimer();
      setShowPopupControls(false);
    }
  };

  const popupPlayer =
    isPopupOpen && hasVideo && isMounted
      ? createPortal(
          <div
            className="fixed inset-0 z-[99999] flex h-dvh w-dvw items-center justify-center bg-black/80 px-4 py-4 backdrop-blur-md sm:px-6 sm:py-6"
            role="dialog"
            aria-modal="true"
            aria-label={`${title} video player`}
            onClick={handleClosePopup}
          >
            <style>
              {`
                @keyframes productVideoPopupIn {
                  from {
                    opacity: 0;
                    transform: scale(0.94) translateY(18px);
                  }
                  to {
                    opacity: 1;
                    transform: scale(1) translateY(0);
                  }
                }

                .product-video-popup-animate {
                  animation: productVideoPopupIn 260ms ease-out both;
                }
              `}
            </style>

            <div
              className="product-video-popup-animate relative w-full max-w-5xl overflow-hidden rounded-2xl border border-white/25 bg-[#080C17] shadow-[0_30px_90px_rgba(0,0,0,0.55)]"
              onClick={(event) => event.stopPropagation()}
            >
              <div
                className="relative aspect-video max-h-[calc(100dvh-120px)] w-full overflow-hidden bg-black"
                onMouseEnter={handlePopupMouseEnter}
                onMouseLeave={handlePopupMouseLeave}
                onPointerMove={handlePopupPointerMove}
                onTouchStart={handlePopupPointerMove}
              >
                <video
                  ref={popupVideoRef}
                  className="h-full w-full object-contain"
                  preload="metadata"
                  playsInline
                  muted={isMuted}
                  onWaiting={() => {
                    setIsPopupLoading(true);
                    setShowPopupControls(true);
                  }}
                  onCanPlay={() => {
                    setIsPopupLoading(false);
                  }}
                  onError={() => {
                    setIsPopupLoading(false);
                    setIsPopupPlaying(false);
                    setPopupError(true);
                    setShowPopupControls(true);
                  }}
                  onPlay={() => {
                    setIsPopupPlaying(true);
                    setPopupError(false);
                    setIsPopupLoading(false);
                    setShowPopupControls(true);
                    scheduleHideControls();
                  }}
                  onPause={() => {
                    clearHideControlsTimer();
                    setIsPopupPlaying(false);
                    setIsPopupLoading(false);
                    setShowPopupControls(true);
                  }}
                  onEnded={() => {
                    clearHideControlsTimer();
                    setIsPopupPlaying(false);
                    setIsPopupLoading(false);
                    setShowPopupControls(true);
                  }}
                >
                  <source src={normalizedSrc} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {isPopupLoading && !popupError ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  </div>
                ) : null}

                {popupError ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/70 px-5 text-center">
                    <AlertTriangle size={36} className="text-amber-300" />
                    <p
                      className="max-w-md text-white"
                      style={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: "15px",
                        lineHeight: "24px",
                      }}
                    >
                      This video could not be loaded. Please check your internet
                      connection or try again.
                    </p>
                    <button
                      type="button"
                      onClick={handleRetryPopupVideo}
                      className="rounded-full border border-white/30 bg-white/10 px-5 py-2 text-sm text-white transition hover:bg-white/15"
                    >
                      Retry
                    </button>
                  </div>
                ) : null}

                <div
                  className={`absolute inset-0 flex items-center justify-center bg-black/10 transition duration-300 ${
                    showPopupControls && !popupError && !isPopupLoading
                      ? "opacity-100"
                      : "pointer-events-none opacity-0"
                  }`}
                >
                  <button
                    type="button"
                    onClick={handleTogglePopupPlay}
                    aria-label={isPopupPlaying ? "Pause video" : "Play video"}
                    className="flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-black/50 text-white backdrop-blur-md transition duration-300 hover:scale-105 hover:bg-black/65 sm:h-20 sm:w-20"
                  >
                    {isPopupPlaying ? (
                      <Pause size={30} />
                    ) : (
                      <Play size={34} className="translate-x-0.5" />
                    )}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleClosePopup}
                  aria-label="Close video player"
                  className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/50 text-white backdrop-blur-md transition duration-300 hover:scale-105 hover:bg-black/70 sm:right-4 sm:top-4"
                >
                  <X size={22} />
                </button>

                <button
                  type="button"
                  onClick={handleToggleMute}
                  aria-label={isMuted ? "Unmute video" : "Mute video"}
                  className={`absolute bottom-3 right-3 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/50 text-white backdrop-blur-md transition duration-300 hover:scale-105 hover:bg-black/70 sm:bottom-4 sm:right-4 ${
                    showPopupControls && !popupError && !isPopupLoading
                      ? "opacity-100"
                      : "pointer-events-none opacity-0"
                  }`}
                >
                  {isMuted ? <VolumeX size={22} /> : <Volume2 size={22} />}
                </button>
              </div>

              <div className="border-t border-white/10 px-4 py-3 sm:px-5">
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
            </div>
          </div>,
          document.body,
        )
      : null;

  return (
    <>
      <article
        id={cardId}
        ref={cardRef}
        className={`scroll-mt-32 overflow-hidden rounded-2xl border bg-[#080C17] transition duration-300 ${
          isHighlighted
            ? "border-amber-400 shadow-[0_0_0_3px_rgba(251,191,36,0.28),0_18px_50px_rgba(251,191,36,0.16)]"
            : "border-white"
        }`}
      >
        <div className="relative h-[232px] w-full overflow-hidden bg-black">
          {hasVideo ? (
            <>
              <video
                ref={previewVideoRef}
                className="h-full w-full object-cover"
                preload="metadata"
                playsInline
                muted
                aria-hidden="true"
                onError={() => setPreviewError(true)}
                onLoadedData={() => setPreviewError(false)}
              >
                {shouldLoadPreview ? (
                  <source src={previewVideoSrc} type="video/mp4" />
                ) : null}
                Your browser does not support the video tag.
              </video>

              {(!shouldLoadPreview || previewError) && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.12),rgba(0,0,0,0.85))] px-4 text-center">
                  {previewError ? (
                    <>
                      <VideoOff size={30} className="text-white/35" />
                      <p
                        className="text-white/35"
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontSize: "12px",
                        }}
                      >
                        Preview unavailable
                      </p>
                    </>
                  ) : null}
                </div>
              )}

              <button
                type="button"
                onClick={handleOpenPopup}
                aria-label={`Open ${title} video`}
                className="absolute inset-0 flex items-center justify-center bg-black/20 transition duration-300 hover:bg-black/30 focus-visible:bg-black/30 focus-visible:outline-none"
              >
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/40 bg-black/45 text-white backdrop-blur-md transition duration-300 hover:scale-105 hover:bg-black/60">
                  <Play size={28} />
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

      {popupPlayer}
    </>
  );
}