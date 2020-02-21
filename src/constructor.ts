import "@webcomponents/webcomponentsjs/custom-elements-es5-adapter";
import { mapSizeToCanvas } from "./mapSizeToCanvas";
import { Aspect, calcAspect } from "./calcAspect";
import { polygon, calcHeightFromBase } from "./polygon";
import trim from "./trim";
import { loadImage, ImageResorce } from "./loadImage";
import calcAngle from "./calcRadianFromVertexLen";

import drag from "./drag";

declare global {
  interface Window {
    ShadyCSS: any;
    prepareTemplate: Function;
  }
}

interface ImageSize {
  w: number;
  h: number;
}

interface RTablePos {
  pos: { x: number; y: number };
  angle: number;
}

export interface State {
  width: number;
  height: number;
  canvas: HTMLCanvasElement | null;
  ctx: CanvasRenderingContext2D | null;
  imageSize: ImageSize;
  aspect: Aspect;
  amountOfRotate: number;
  rotate: number;
  imageResources: Array<ImageResorce>;
}

const _css = "${{{src/index.scss}}}";
const _style = `<style>${_css}</style>`;
const _shadowdomHTML = `
    ${_style}
    <canvas/>
`;
const template = document.createElement("template");
template.id = "RikaaaRoundTable";
template.innerHTML = _shadowdomHTML;
if (self.ShadyCSS) self.ShadyCSS.prepareTemplate(template, "rikaaa-image-line");

export default class RTable extends HTMLElement {
  public state: State = {
    width: 0,
    height: 0,
    canvas: null,
    ctx: null,
    imageSize: { w: 0, h: 0 },
    aspect: { w: 0, h: 0 },
    amountOfRotate: 0,
    rotate: 0,
    imageResources: []
  };

  private mapSize;
  private drag;

  constructor() {
    super();
    if (self.ShadyCSS) self.ShadyCSS.styleElement(this);
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    // drag
    let amoutOfRotateWhenDragStart = 0;
    this.drag = new drag((e, pos, amount): void => {
      let amountOfRotate =
        amount.y / this.state.height / this.state.imageResources.length;
      amountOfRotate += amoutOfRotateWhenDragStart;
      this.setRotate(amountOfRotate);
    });
    this.drag.setDragStartFunc(() => {
      amoutOfRotateWhenDragStart = this.state.amountOfRotate;
    });
    this.drag.addEvent(this);

    this.state.canvas = this.shadowRoot.querySelector("canvas");
    this.state.ctx = this.state.canvas.getContext("2d");
  }

  connectedCallback(): void {
    const { resizeObserverInstance } = mapSizeToCanvas(
      this.state.canvas,
      this,
      this.state
    );
    this.mapSize = resizeObserverInstance;

    RTable.draw(this, this.state);
  }
  disconnectedCallback(): void {
    this.mapSize.unobserve();
    this.drag.removeEvent(this);
  }
  static get observedAttributes(): any {
    return ["size", "srcs"];
  }
  attributeChangedCallback(attr: string, oldval: string, newval: string): void {
    if (attr === "size") {
      const imageSize = newval.split("x").map(str => Number(str));
      this.state.imageSize.w = imageSize[0];
      this.state.imageSize.h = imageSize[1];

      this.state.aspect = calcAspect(imageSize[0], imageSize[1]);
    }

    if (attr === "srcs") {
      const srcs = newval.split(",").map(srcStr => trim(srcStr));
      const load = srcs.map(src => loadImage(src));

      Promise.all(load).then(data => (this.state.imageResources = data));
    }
  }

  /**
   * 0 - 1の値をラジアンに変更する。
   * @param value 自然数
   */
  private static calcRotate(value: number): number {
    const val = value - Math.floor(value);
    return (360 * val * Math.PI) / 180;
  }

  private static calcIndex() {}

  private static calcImgRTablePos(
    poly: Array<Array<number>>
  ): Array<RTablePos> {
    const angles = calcAngle(poly.length);
    return poly.map(
      (pos, index): RTablePos => {
        return {
          pos: { x: pos[0], y: pos[1] },
          angle: angles[index]
        };
      }
    );
  }

  /**
   * メインドローループ
   * @param instance this
   * @param state this.state
   */
  private static draw(instance, state): void {
    const ctx = state.ctx;
    const drawloop = (): void => {
      self.requestAnimationFrame(drawloop);
      ctx.clearRect(0, 0, state.width*2, state.height*2);

      const poly = polygon(state.height, state.imageResources.length);
      const heightFromBase = calcHeightFromBase(
        state.height,
        state.imageResources.length
      );

      ctx.save();
      ctx.scale(2,2);

      // centering
      ctx.save();
      ctx.translate(state.width / 2, state.height/2);
      //

      // //
      // to Left
      ctx.save();
      ctx.translate(state.width / -2 - heightFromBase, 0);
      //
      //
      // rotation
      ctx.save();
      ctx.rotate(state.rotate);



      // draw image round table
      const rtablePos = RTable.calcImgRTablePos(poly);
      rtablePos.forEach((table, index): void => {
        const img = state.imageResources[index].img;
        const x = table.pos.x;
        const y = table.pos.y;
        ctx.save();
        ctx.translate(x, y);

        ctx.rotate(table.angle);
        ctx.save();
        ctx.drawImage(img, 0, 0, state.width, state.height);
        ctx.restore();
        ctx.restore();
      });

      ctx.restore();
      ctx.restore();
      ctx.restore();
      ctx.restore();
    };
    self.requestAnimationFrame(drawloop);
  }

  /**
   * パネルの回転具合を指定する。増加で上から下へ回転する。
   * @param num 自然数
   */
  public setRotate(num: number): void {
    this.state.amountOfRotate = num;
    this.state.rotate = RTable.calcRotate(this.state.amountOfRotate);
  }
}
