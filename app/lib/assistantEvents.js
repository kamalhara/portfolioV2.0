export const assistantOpenEvent = "portfolio:open-assistant";

export function askAboutProject(title, trigger) {
  window.dispatchEvent(
    new CustomEvent(assistantOpenEvent, {
      detail: {
        question: `What does ${title} do, and what are its main technical features?`,
        trigger,
      },
    }),
  );
}
