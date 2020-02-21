import onebang from "./onece";

class Drag {
  private functionWhenDraging: Function;
  private isFunctionWhenDragStart: boolean;
  private isFunctionWhenDragEnd: boolean;
  private dragStartFuncOnec: Function | null;
  private amountOfMouseMovedbyPixel: { x: number; y: number };
  private mousePositionWhenDragStart: { x: number; y: number };
  private targetElement: HTMLElement;
  private dragStartFunctionBinded: Function;
  private dragingFunctionBinded: Function;
  private dragEndFunctionBinded: Function;
  private functionWhenDragStart: Function;
  private functionWhenDragEnd: Function;

  constructor(func) {
    this.functionWhenDraging = func;

    this.isFunctionWhenDragStart = false;
    this.isFunctionWhenDragEnd = false;

    this.dragStartFuncOnec = null;

    this.amountOfMouseMovedbyPixel = {
      x: 0,
      y: 0
    };
  }
  public addEvent(targetElement): void {
    this.targetElement = targetElement;

    this.dragStartFunctionBinded = (e: EventTarget): void => {
      this.dragStartFunction(e);
    };

    this.dragingFunctionBinded = (e: EventTarget): void => {
      Drag.dragingFunction(e, this);
    };

    this.dragEndFunctionBinded = (e: EventTarget): void => {
      Drag.dragEndFunction(e, this);
    };

    Drag.addDragStartEvent(this.targetElement, this.dragStartFunctionBinded);
  }
  public removeEvent(targetElement): void {
    Drag.removeDragStartEvent(targetElement, this.dragStartFunctionBinded);
    Drag.removeDragingEvent(window, this.dragingFunctionBinded);
    Drag.removeDragEndEvent(window, this.dragEndFunctionBinded);
  }
  public setDragStartFunc(func): Drag {
    this.isFunctionWhenDragStart = typeof func === "function" ? true : false;
    this.functionWhenDragStart = func;
    return this;
  }
  public setDragEndFunc(func): Drag {
    this.isFunctionWhenDragEnd = typeof func === "function" ? true : false;
    this.functionWhenDragEnd = func;
    return this;
  }
  public dragStartFunction(e): void {
    e.preventDefault();
    Drag.removeDragStartEvent(this.targetElement, this.dragStartFunctionBinded);
    Drag.addDragingEvent(window, this.dragingFunctionBinded);
    Drag.addDragEndEvent(window, this.dragEndFunctionBinded);

    this.amountOfMouseMovedbyPixel.x = 0;
    this.amountOfMouseMovedbyPixel.y = 0;

    this.mousePositionWhenDragStart = {
      x: e.pageX,
      y: e.pageY
    };

    if (this.isFunctionWhenDragStart)
      this.dragStartFuncOnec = onebang(this.functionWhenDragStart);
  }
  private static dragingFunction(e, instance: Drag): void | boolean {
    const currentMousePosition = {
      x: e.pageX,
      y: e.pageY
    };
    instance.amountOfMouseMovedbyPixel = {
      x: currentMousePosition.x - instance.mousePositionWhenDragStart.x,
      y: currentMousePosition.y - instance.mousePositionWhenDragStart.y
    };

    if (
      instance.amountOfMouseMovedbyPixel.x === 0 &&
      instance.amountOfMouseMovedbyPixel.y === 0
    )
      return false;

    if (instance.dragStartFuncOnec !== null)
      instance.dragStartFuncOnec(
        instance.targetElement,
        instance.mousePositionWhenDragStart
      );

    instance.functionWhenDraging(
      e,
      instance.mousePositionWhenDragStart,
      instance.amountOfMouseMovedbyPixel
    );
  }
  private static dragEndFunction(e, instance: Drag): void | boolean {
    e.preventDefault();
    this.addDragStartEvent(
      instance.targetElement,
      instance.dragStartFunctionBinded
    );
    this.removeDragingEvent(window, instance.dragingFunctionBinded);
    this.removeDragEndEvent(window, instance.dragEndFunctionBinded);

    if (
      instance.amountOfMouseMovedbyPixel.x === 0 &&
      instance.amountOfMouseMovedbyPixel.y === 0
    )
      return false;

    if (instance.isFunctionWhenDragEnd) {
      instance.functionWhenDragEnd(
        instance.targetElement,
        instance.mousePositionWhenDragStart,
        instance.amountOfMouseMovedbyPixel
      );
    }

    if (instance.isFunctionWhenDragStart) {
      instance.dragStartFuncOnec = onebang(instance.functionWhenDragStart);
    }
  }
  private static addDragingEvent(targetElement, func): void {
    targetElement.addEventListener("mousemove", func, false);
    targetElement.addEventListener("touchmove", func, false);
  }
  private static removeDragingEvent(targetElement, func): void {
    targetElement.removeEventListener("mousemove", func, false);
    targetElement.removeEventListener("touchmove", func, false);
  }
  private static addDragStartEvent(targetElement, func): void {
    targetElement.addEventListener("mousedown", func, false);
    targetElement.addEventListener("touchstart", func, false);
  }
  private static removeDragStartEvent(targetElement, func): void {
    targetElement.removeEventListener("mousedown", func, false);
    targetElement.removeEventListener("touchstart", func, false);
  }
  private static addDragEndEvent(targetElement, func): void {
    targetElement.addEventListener("mouseup", func, false);
    targetElement.addEventListener("touchend", func, false);
    targetElement.addEventListener("mouseleave", func, false);
    targetElement.addEventListener("touchleave", func, false);
  }
  private static removeDragEndEvent(targetElement, func): void {
    targetElement.removeEventListener("mouseup", func, false);
    targetElement.removeEventListener("touchend", func, false);
    targetElement.removeEventListener("mouseleave", func, false);
    targetElement.removeEventListener("touchleave", func, false);
  }
}

export default Drag;
