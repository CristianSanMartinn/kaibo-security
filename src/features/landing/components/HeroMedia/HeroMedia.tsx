"use client";

import Image from "next/image";
import { Pause, Play } from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import styles from "./HeroMedia.module.css";

function subscribeMotion(change: () => void) {
  const query = matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", change);
  return () => query.removeEventListener("change", change);
}
function motion() {
  return matchMedia("(prefers-reduced-motion: reduce)").matches;
}
function subscribeVisibility(change: () => void) {
  document.addEventListener("visibilitychange", change);
  return () => document.removeEventListener("visibilitychange", change);
}
function visible() {
  return document.visibilityState === "visible";
}

type Props = { image: string; video: string | null };
export default function HeroMedia({ image, video }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [pausedByUser, setPausedByUser] = useState(false);
  const [explicitPlay, setExplicitPlay] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const reduce = useSyncExternalStore(subscribeMotion, motion, () => true);
  const pageVisible = useSyncExternalStore(
    subscribeVisibility,
    visible,
    () => false,
  );

  useEffect(() => {
    const media = videoRef.current;
    if (!media) return;
    if (!pausedByUser && pageVisible && (!reduce || explicitPlay))
      void media.play().catch(() => {});
    else media.pause();
    return () => media.pause();
  }, [pausedByUser, pageVisible, reduce, explicitPlay, video]);

  return (
    <>
      <div
        className={styles.background}
        aria-hidden="true"
      >
        <Image
          src={image}
          alt=""
          fill
          sizes="100vw"
          fetchPriority="high"
          loading="eager"
          unoptimized
          className={styles.image}
        />
        {video && !failed && (
          <video
            ref={videoRef}
            className={styles.video}
            src={video}
            poster={image}
            muted
            loop
            playsInline
            preload="none"
            tabIndex={-1}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onError={() => setFailed(true)}
          />
        )}
        <div className={styles.overlay} />
      </div>
      <div className={styles.status}>
        {video && !failed && (
          <button
            type="button"
            aria-label={
              playing ? "Pausar video de fondo" : "Reproducir video de fondo"
            }
            onClick={() => {
              if (playing) {
                setPausedByUser(true);
                videoRef.current?.pause();
              } else {
                setPausedByUser(false);
                setExplicitPlay(true);
                void videoRef.current?.play().catch(() => {});
              }
            }}
          >
            {playing ? (
              <Pause
                size={14}
                aria-hidden="true"
              />
            ) : (
              <Play
                size={14}
                aria-hidden="true"
              />
            )}
            {playing ? "Pausar video" : "Reproducir video"}
          </button>
        )}
      </div>
    </>
  );
}
