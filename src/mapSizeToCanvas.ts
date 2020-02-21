import Ro from "./resizeObserver.init";
import { State } from "./constructor";

interface mapSizeToCanvasInterface {
  width: number;
  height: number;
  resolution: number;
  resizeObserverInstance: any;
}

/**
 * 第一引数のcanvasを第二引数のElementのサイズを元にstate.aspectのアスペクト比でリサイズする。
 * また、解像度を自動で設定する。
 * @param canvas
 * @param host
 */
const mapSizeToCanvas = (
  canvas: HTMLCanvasElement,
  host: Element,
  state: State
): mapSizeToCanvasInterface => {
  let w: number, h: number, res: number;

  const ro = new Ro((entries): void => {
    const { width, height } = entries[0].contentRect;

    res = window.devicePixelRatio || 1;

    const _w = width;
    const _h = (width / state.aspect.w) * state.aspect.h;

    canvas.width = _w * res;
    canvas.height = _h * res;

    canvas.style.width = `${_w}px`;
    canvas.style.height = `${_h}px`;

    w = width;
    h = height;

    state.width = width;
    state.height = height;
  });

  ro.observe(host);

  return {
    width: w,
    height: h,
    resolution: res,
    resizeObserverInstance: ro
  };
};

export { mapSizeToCanvas, mapSizeToCanvasInterface };
