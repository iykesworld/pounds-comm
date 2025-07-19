"use client";

import { useRef, useCallback } from "react";

type HeroVideoHoverProps = {
  src: string;            // e.g. "/hero.mp4" (public/) or remote URL
  poster?: string;        // optional poster image
  className?: string;     // extra Tailwind classes
  loop?: boolean;         // default true
};

export function HeroVideoHover({
  src,
  poster,
  className = "",
  loop = true,
}: HeroVideoHoverProps) {
  const vidRef = useRef<HTMLVideoElement>(null);

  const playVideo = useCallback(() => {
    const v = vidRef.current;
    if (!v) return;
    // browsers often require video muted to auto-play programmatically
    v.muted = true;
    void v.play().catch(() => {
      /* ignore play rejection */
    });
  }, []);

  const pauseVideo = useCallback(() => {
    const v = vidRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0; // rewind when not hovered; remove if you want resume
  }, []);

  // Mobile/touch fallback: toggle play/pause on click
  const handleClick = useCallback(() => {
    const v = vidRef.current;
    if (!v) return;
    if (v.paused) playVideo();
    else pauseVideo();
  }, [playVideo, pauseVideo]);

  return (
    <div
      className={`group relative w-full overflow-hidden rounded-lg ${className}`}
      onPointerEnter={playVideo}
      onPointerLeave={pauseVideo}
      onClick={handleClick}
      role="button"
      aria-label="Hero video. Hover or tap to play."
    >
      <video
        ref={vidRef}
        src={src}
        poster={poster}
        loop={loop}
        playsInline
        preload="metadata"
        className="h-full w-full object-cover"
        // no controls; we control playback
      />

      {/* Overlay hint (shows when paused / not hovered) */}
      {/* <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/40 opacity-100 transition-opacity group-hover:opacity-0">
        <span className="text-xs sm:text-sm md:text-base font-medium text-white">
          Hover / Tap to Play
        </span>
      </div> */}
    </div>
  );
}
