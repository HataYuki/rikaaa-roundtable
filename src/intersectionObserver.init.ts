import rikaaaIntersectionObserver from "./polyfill/rikaaa-IntersectionWatcher/src/rikaaa-IntersectionWatcher";

declare global {
  interface Window {
    WcRikaaaIntersectionObserver: any;
  }
}

if (!self.IntersectionObserver && !self.WcRikaaaIntersectionObserver) {
  Object.defineProperty(self, "WcRikaaaIntersectionObserver", {
    value: rikaaaIntersectionObserver
  });
}

const intersectionobserver =
  self.IntersectionObserver || self.WcRikaaaIntersectionObserver;

export default intersectionobserver;
