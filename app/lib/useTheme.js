"use client";

import { useSyncExternalStore } from "react";
import { resolveTheme, themeStorageKey } from "@/app/lib/theme";

function getSnapshot() {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function getServerSnapshot() {
  return "dark";
}

function subscribe(callback) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  function onStorage(event) {
    if (event.key === themeStorageKey || event.key === null) {
      document.documentElement.classList.toggle(
        "dark",
        resolveTheme(event.newValue) === "dark",
      );
    }
  }
  window.addEventListener("storage", onStorage);
  return () => {
    observer.disconnect();
    window.removeEventListener("storage", onStorage);
  };
}

export function useTheme() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function setTheme(value) {
  const theme = resolveTheme(value);
  document.documentElement.classList.toggle("dark", theme === "dark");
  try {
    window.localStorage.setItem(themeStorageKey, theme);
  } catch {
    // The toggle still works when browser storage is unavailable.
  }
}
