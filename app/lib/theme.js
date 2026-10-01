export const themeStorageKey = "portfolio-theme";

export function resolveTheme(value) {
  return value === "light" ? "light" : "dark";
}

// Runs in the document head before the page is painted.
export const themeInitScript = `(() => {
  let theme = "dark";
  try {
    theme = localStorage.getItem("portfolio-theme") === "light" ? "light" : "dark";
  } catch {}
  document.documentElement.classList.toggle("dark", theme === "dark");
})();`;
