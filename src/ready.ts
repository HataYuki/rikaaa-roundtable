interface Window {
  attachEvent(event: string, listener: EventListener): boolean;
  detachEvent(event: string, listener: EventListener): void;
  addEventListener(event: string, listener: EventListener): void;
}

declare const window: Window;

const ready = (fn: Function): void => {
  if (
    window.attachEvent
      ? document.readyState === "complete"
      : document.readyState !== "loading"
  ) {
    Promise.resolve().then(() => fn());
  } else {
    window.addEventListener("DOMContentLoaded", () => fn());
  }
};

export default ready;
