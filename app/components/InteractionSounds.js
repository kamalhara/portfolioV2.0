"use client";

import { useCallback, useEffect, useRef } from "react";
import { createClickSamples } from "@/app/lib/clickSound";

const interactiveSelector =
  'button, a[href], summary, input, select, textarea, .cursor-pointer, [role="button"], [role="link"], [role="tab"], [role="switch"], [role="checkbox"], [role="radio"], [role="menuitem"], [role="option"], [data-click-sound]';

export default function InteractionSounds() {
  const audioRef = useRef(null);
  const bufferRef = useRef(null);
  const lastClickRef = useRef(-Infinity);

  const playClick = useCallback(() => {
    if (document.hidden) return;
    const now = performance.now();
    if (now - lastClickRef.current < 45) return;
    lastClickRef.current = now;
    try {
      const AudioContext = window.AudioContext ?? window.webkitAudioContext;
      if (!AudioContext) return;
      if (!audioRef.current || audioRef.current.state === "closed") {
        audioRef.current = new AudioContext({ latencyHint: "interactive" });
        const samples = createClickSamples(audioRef.current.sampleRate);
        bufferRef.current = audioRef.current.createBuffer(
          1,
          samples.length,
          audioRef.current.sampleRate,
        );
        bufferRef.current.copyToChannel(samples, 0);
      }
      const context = audioRef.current;
      const play = () => {
        if (document.hidden || context.state !== "running") return;
        const source = context.createBufferSource();
        source.buffer = bufferRef.current;
        source.connect(context.destination);
        source.onended = () => source.disconnect();
        source.start();
      };
      if (context.state === "running") play();
      else
        void context
          .resume()
          .then(play)
          .catch(() => {});
    } catch {
      // Browser audio restrictions never interrupt navigation or form actions.
    }
  }, []);

  useEffect(() => {
    const onClick = (event) => {
      if (!event.isTrusted || (event.button !== undefined && event.button > 1))
        return;
      const target =
        event.target instanceof Element
          ? event.target.closest(interactiveSelector)
          : null;
      if (
        !target ||
        target.getAttribute("data-click-sound") === "dismiss" ||
        (target.getAttribute("data-click-sound") === "backdrop" &&
          event.target !== target) ||
        target.matches(":disabled") ||
        target.closest('[aria-disabled="true"], [inert]')
      )
        return;
      playClick();
    };
    const onDismiss = (event) => {
      if (
        event.isTrusted &&
        event.button === 0 &&
        event.target instanceof Element &&
        event.target.getAttribute("data-click-sound") === "dismiss"
      )
        playClick();
    };
    document.addEventListener("click", onClick, true);
    document.addEventListener("auxclick", onClick, true);
    document.addEventListener("mousedown", onDismiss, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("auxclick", onClick, true);
      document.removeEventListener("mousedown", onDismiss, true);
      if (audioRef.current && audioRef.current.state !== "closed")
        void audioRef.current.close().catch(() => {});
    };
  }, [playClick]);

  return null;
}
