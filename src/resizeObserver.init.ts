import rikaaaResizeObserver from "./polyfill/rikaaa-ResizeWatcher/src/rikaaa-ResizeWatcher";

declare global {
  interface Window {
    WcRikaaaResizeObserver: any;
    ResizeObserver: any;
  }
}

if (!self.ResizeObserver && !self.WcRikaaaResizeObserver) {
  Object.defineProperty(self, "WcRikaaaResizeObserver", {
    value: rikaaaResizeObserver
  });
}

const resizeobserver = self.ResizeObserver || self.WcRikaaaResizeObserver;

export default resizeobserver;
