/**
 * @license
 * rikaaa-roundtable.js
 *
 * Generated : 2020-02-22
 * Version : 1.0.0
 * Author : rikaaa.org | Yuki Hata
 * Url : http://rikaaa.org
 *
 *
 * The MIT License (MIT)
 *
 * Copyright 2020 rikaaa.org | Yuki Hata
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

(function () {
    'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    /**
    @license @nocompile
    Copyright (c) 2018 The Polymer Project Authors. All rights reserved.
    This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
    The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
    The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
    Code distributed by Google as part of the polymer project is also
    subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
    */
    (function () {

      (function(){if(void 0===window.Reflect||void 0===window.customElements||window.customElements.polyfillWrapFlushCallback)return;const a=HTMLElement;window.HTMLElement={HTMLElement:function HTMLElement(){return Reflect.construct(a,[],this.constructor)}}.HTMLElement,HTMLElement.prototype=a.prototype,HTMLElement.prototype.constructor=HTMLElement,Object.setPrototypeOf(HTMLElement,a);})();

    }());

    var onebang = (function (func) {
        var _func, allow = true;
        return function () {
            var arg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg[_i] = arguments[_i];
            }
            if (!allow) {
                func = null;
                return false;
            }
            _func = func.apply(this, arg);
            allow = false;
            return _func;
        };
    });

    var debounce = (function (func, interval) {
        var timer = null;
        return function () {
            var arg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg[_i] = arguments[_i];
            }
            clearTimeout(timer);
            timer = setTimeout(function () {
                return func.apply(this, arg);
            }, interval);
        };
    });

    var throttle = (function (func, interval) {
        var req = null;
        var startTime = null;
        var firstFunc = onebang(func);
        var lastFunc = debounce(func, interval);
        var clearFirstFunc = debounce(function () {
            firstFunc = onebang(func);
            startTime = null;
            cancelAnimationFrame(req);
        }, interval);
        return function () {
            var _this = this;
            var arg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg[_i] = arguments[_i];
            }
            firstFunc.apply(this, arg);
            req = requestAnimationFrame(function (timestamp) {
                if (startTime === null)
                    startTime = timestamp;
                var elapsedTime = timestamp - startTime;
                if (elapsedTime >= interval) {
                    startTime = null;
                    cancelAnimationFrame(req);
                    return func.apply(_this, arg);
                }
            });
            clearFirstFunc();
            return lastFunc.apply(this, arg);
        };
    });

    var valueObserver = (function (firstVal, func, option) {
        if (option === void 0) { option = { observValKeyName: 'watch' }; }
        var _func, _firstval = firstVal, _watchKeyName = option.observValKeyName;
        return function (_a) {
            _a = {};
            var originalArgument = [], watchVal = null;
            for (var i = 0; i < arguments.length; i++) {
                if (!(arguments[i]) || !(arguments[i].constructor == Object)) {
                    originalArgument.push(arguments[i]);
                }
                else {
                    watchVal = arguments[i][_watchKeyName];
                    delete arguments[i][_watchKeyName];
                    if (Object.keys(arguments[i]).length > 0) {
                        originalArgument.push(arguments[i]);
                    }
                }
            }
            if (_firstval === watchVal) {
                return false;
            }
            _firstval = watchVal;
            _func = func.apply(this, originalArgument);
            return _func;
        };
    });

    var isDisplay = (function (target) {
        var result = false;
        var style = target.currentStyle || getComputedStyle(target, '');
        result = (style.display === 'none') ? false : true;
        return result;
    });

    var calculateContentRect = (function (target) {
        var style = getComputedStyle(target, '');
        var targetBounding = target.getBoundingClientRect();
        var parser = function (px) { return (px === ' ') ? 0 : parseFloat(px || '0px'); };
        var paddingTop = parser(style.paddingTop);
        var paddingBottom = parser(style.paddingBottom);
        var paddingLeft = parser(style.paddingLeft);
        var paddingRight = parser(style.paddingRight);
        var borderTop = parser(style.borderTopWidth);
        var borderBottom = parser(style.borderBottomWidth);
        var borderLeft = parser(style.borderLeftWidth);
        var borderRight = parser(style.borderRightWidth);
        var paddingHorizon = paddingTop + paddingBottom;
        var paddingVertical = paddingLeft + paddingRight;
        var borderHorizon = borderTop + borderBottom;
        var borderVertical = borderLeft + borderRight;
        var width = targetBounding.width - paddingVertical - borderVertical;
        var height = targetBounding.height - paddingHorizon - borderHorizon;
        var contentRect = (isDisplay(target)) ?
            {
                width: width,
                height: height,
                x: paddingLeft,
                y: paddingTop,
                top: paddingTop,
                left: paddingLeft,
                bottom: paddingTop + height,
                right: paddingLeft + width,
            } :
            {
                width: 0,
                height: 0,
                x: 0,
                y: 0,
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
            };
        return Object.freeze(contentRect);
    });

    if (!Array.prototype.includes) {
        Object.defineProperty(Array.prototype, 'includes', {
            value: function (searchElement, fromIndex) {
                if (this == null) {
                    throw new TypeError('"this" is null or not defined');
                }
                // 1. Let O be ? ToObject(this value).
                var o = Object(this);
                // 2. Let len be ? ToLength(? Get(O, "length")).
                var len = o.length >>> 0;
                // 3. If len is 0, return false.
                if (len === 0) {
                    return false;
                }
                // 4. Let n be ? ToInteger(fromIndex).
                //    (If fromIndex is undefined, this step produces the value 0.)
                var n = fromIndex | 0;
                // 5. If n ≥ 0, then
                //  a. Let k be n.
                // 6. Else n < 0,
                //  a. Let k be len + n.
                //  b. If k < 0, let k be 0.
                var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
                function sameValueZero(x, y) {
                    return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
                }
                // 7. Repeat, while k < len
                while (k < len) {
                    // a. Let elementK be the result of ? Get(O, ! ToString(k)).
                    // b. If SameValueZero(searchElement, elementK) is true, return true.
                    if (sameValueZero(o[k], searchElement)) {
                        return true;
                    }
                    // c. Increase k by 1. 
                    k++;
                }
                // 8. Return false
                return false;
            }
        });
    }

    var Controller = /** @class */ (function () {
        function Controller() {
            this.instanceOfResizeWatcher = [];
            this.targetsAll = [];
            this.mutationObserverConfig = {
                childList: true,
                attributes: true,
                characterData: true,
                subtree: true,
            };
            this.watcher_binded = throttle(Controller.watcher.bind(null, this), Controller.THROTTLE_INTERVAL);
            this.mo = new MutationObserver(this.watcher_binded);
            this.firstCallback = debounce(onebang(function (entriesContaner) {
                entriesContaner.forEach(function (entries) {
                    var callbackArg = entries.entries.map(function (entry) {
                        var isDisplay = Controller.isDisplay(entry.target);
                        if (isDisplay)
                            return Object.freeze({
                                target: entry.target,
                                contentRect: entry.contentRect,
                            });
                    }).filter(function (entry) { return typeof entry !== 'undefined'; });
                    if (callbackArg.length !== 0)
                        entries.callback(callbackArg);
                });
            }), Controller.THROTTLE_INTERVAL);
        }
        Controller.prototype.init = function (instance) {
            this.instanceOfResizeWatcher.push(instance);
        };
        Controller.prototype.observe = function () {
            this.targetsAll = Controller.updateTargetsAll(this);
            if (this.targetsAll.length !== 0)
                Controller.onWatcher(this);
            this.entriesContaner = Controller.calculateEntriesContaner(this.instanceOfResizeWatcher);
            this.firstCallback(this.entriesContaner);
        };
        Controller.prototype.unobserve = function () {
            this.targetsAll = Controller.updateTargetsAll(this);
            this.entriesContaner = Controller.calculateEntriesContaner(this.instanceOfResizeWatcher);
        };
        Controller.prototype.disconnect = function () {
            this.targetsAll = Controller.updateTargetsAll(this);
            this.entriesContaner = Controller.calculateEntriesContaner(this.instanceOfResizeWatcher);
            if (this.targetsAll.length === 0) {
                Controller.offWatcher(this);
            }
        };
        Controller.watcher = function (instances) {
            instances.entriesContaner.forEach(function (entries) {
                var callbackArg = entries.entries.map(function (entry) {
                    var currentContentRect = Controller.calculateContentRect(entry.target);
                    var isResized = entry.valueObserver({ watch: Controller.contentRectWHToStr(currentContentRect) });
                    if (isResized)
                        entry.contentRect = currentContentRect;
                    if (isResized)
                        return Object.freeze({
                            target: entry.target,
                            contentRect: entry.contentRect,
                        });
                }).filter(function (entry) { return typeof entry !== 'undefined'; });
                if (callbackArg.length !== 0)
                    entries.callback(callbackArg);
            });
        };
        Controller.calculateEntriesContaner = function (instances) {
            return instances.map(function (instance) {
                var entries = instance.targets.map(function (target) {
                    var contentRect = Controller.calculateContentRect(target);
                    return {
                        contentRect: contentRect,
                        target: target,
                        valueObserver: valueObserver(Controller.contentRectWHToStr(contentRect), function () { return true; }),
                    };
                });
                instance.entries = entries;
                return instance;
            });
        };
        Controller.contentRectWHToStr = function (contentRect) {
            return "" + contentRect.width + contentRect.height;
        };
        Controller.updateTargetsAll = function (instance) {
            return instance.instanceOfResizeWatcher.map(function (instance) { return instance.targets; }).reduce(function (a, c) { return a.concat(c); }, []);
        };
        Controller.onWatcher = function (instance) {
            instance.mo.disconnect();
            instance.mo.observe(document.getElementsByTagName('html')[0], instance.mutationObserverConfig);
            window.addEventListener('resize', instance.watcher_binded, false);
        };
        Controller.offWatcher = function (instance) {
            instance.mo.disconnect();
            window.removeEventListener('resize', instance.watcher_binded);
        };
        Controller.calculateContentRect = function (target) {
            return calculateContentRect(target);
        };
        Controller.isDisplay = function (target) {
            return isDisplay(target);
        };
        Object.defineProperty(Controller, "THROTTLE_INTERVAL", {
            get: function () {
                return 33;
            },
            enumerable: true,
            configurable: true
        });
        return Controller;
    }());

    var controller = new Controller();
    var rikaaaResizeWatcher = /** @class */ (function () {
        function rikaaaResizeWatcher(callback) {
            this.callback = callback;
            this.targets = [];
            this.entries = [];
            controller.init(this);
        }
        rikaaaResizeWatcher.prototype.observe = function (target) {
            var exist = this.targets.includes(target);
            if (!exist)
                this.targets.push(target);
            controller.observe();
        };
        rikaaaResizeWatcher.prototype.unobserve = function (target) {
            this.targets = this.targets.filter(function (existTarget) { return existTarget !== target; });
            controller.unobserve();
        };
        rikaaaResizeWatcher.prototype.disconnect = function () {
            this.targets = [];
            controller.disconnect();
        };
        rikaaaResizeWatcher.calculateContentRect = function (target) {
            return Controller.calculateContentRect(target);
        };
        rikaaaResizeWatcher.isDisplay = function (target) {
            return Controller.isDisplay(target);
        };
        Object.defineProperty(rikaaaResizeWatcher, "THROTTLE_INTERVAL", {
            get: function () {
                return Controller.THROTTLE_INTERVAL;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(rikaaaResizeWatcher, "CONTROLLER", {
            get: function () {
                return controller;
            },
            enumerable: true,
            configurable: true
        });
        return rikaaaResizeWatcher;
    }());

    if (!self.ResizeObserver && !self.WcRikaaaResizeObserver) {
        Object.defineProperty(self, "WcRikaaaResizeObserver", {
            value: rikaaaResizeWatcher
        });
    }
    var resizeobserver = self.ResizeObserver || self.WcRikaaaResizeObserver;

    /**
     * 第一引数のcanvasを第二引数のElementのサイズを元にstate.aspectのアスペクト比でリサイズする。
     * また、解像度を自動で設定する。
     * @param canvas
     * @param host
     */
    var mapSizeToCanvas = function (canvas, host, state) {
        var w, h, res;
        var ro = new resizeobserver(function (entries) {
            var _a = entries[0].contentRect, width = _a.width, height = _a.height;
            res = window.devicePixelRatio || 1;
            var _w = width;
            var _h = (width / state.aspect.w) * state.aspect.h;
            canvas.width = _w * res;
            canvas.height = _h * res;
            canvas.style.width = _w + "px";
            canvas.style.height = _h + "px";
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

    var calcAspect = function (w, h) {
        return [w, h].reduce(function (a, c, i, array) {
            var result = {};
            var gcd = function (w, h) {
                if (!h)
                    return w;
                else
                    return gcd(h, w % h);
            };
            if (i === 0)
                result.w = c / gcd(array[1], array[0]);
            if (i === 1)
                result.h = c / gcd(array[1], array[0]);
            return Object.assign(a, result);
        }, {});
    };

    /**
     * 辺の長さと超点数を指定して作られる正多角形の各辺から中央までの距離を返す。
     * @param lengthOfASide
     * @param LengthOfVertex
     */
    var calcHeightFromBase = function (lengthOfASide, LengthOfVertex) {
        var sumOfInteriorAngle = 180 * (LengthOfVertex - 2);
        var InteriorAngle = sumOfInteriorAngle / LengthOfVertex;
        var tanOfDeg = Math.tan(((InteriorAngle / 2) * Math.PI) / 180);
        return (tanOfDeg * lengthOfASide) / 2;
    };
    /**
     * 辺の長さと超点数を指定して、正多角形の座標を返す。
     * @param lengthOfASide 変の長さ
     * @param LengthOfVertex 頂点数
     */
    var polygon = function (lengthOfASide, LengthOfVertex) {
        var heigthFromBase = calcHeightFromBase(lengthOfASide, LengthOfVertex);
        var radius = Math.sqrt(Math.pow(lengthOfASide / 2, 2) + Math.pow(heigthFromBase, 2));
        var degOfFix = (360 / LengthOfVertex / 2) * -1;
        return __spread(Array(LengthOfVertex)).map(function (_, v) {
            var deg = (360 / LengthOfVertex) * v + degOfFix, radian = (deg * Math.PI) / 180, posX = radius * Math.cos(radian), posY = radius * Math.sin(radian);
            return [posX, posY];
        });
    };

    /**
     * 第一引数に指定された文字列から余計な空白、開業を削除する。
     * @param string
     */
    var trim = function (string) { return string.replace(/\r?\n?\s?\t?\s/g, ""); };

    /**
     * 指定されたパスの画像が読み込まれたときImageResource型のデータを返すPromiseを返す。
     * @param src 読み込みたい画像パス。
     */
    var loadImage = function (src) {
        return new Promise(function (resolve) {
            var img = new Image();
            var handleLoade = function () {
                resolve({ img: img, src: src });
            };
            img.addEventListener("load", function () {
                handleLoade();
            });
            img.src = src;
        });
    };

    /**
     * 頂点数からRtableに描画される画像の角度(ラジアン)を算出する。
     * @param lengthOfVertex
     */
    var calcRadianFromVertexLen = function (lengthOfVertex) {
        var sumOfInteriorAngle = 180 * (lengthOfVertex - 2);
        var InteriorAngle = sumOfInteriorAngle / lengthOfVertex;
        var valueOfCorrection = ((180 - InteriorAngle) / 2) * 2;
        return __spread(Array(lengthOfVertex)).map(function (_, v) {
            return (valueOfCorrection * v * Math.PI) / 180;
        });
    };

    var onebang$1 = (function (func) {
        var _func, allow = true;
        return function () {
            var arg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg[_i] = arguments[_i];
            }
            if (!allow) {
                func = null;
                return false;
            }
            _func = func.apply.apply(func, __spread([this], arg));
            allow = false;
            return _func;
        };
    });

    var Drag = /** @class */ (function () {
        function Drag(func) {
            this.functionWhenDraging = func;
            this.isFunctionWhenDragStart = false;
            this.isFunctionWhenDragEnd = false;
            this.dragStartFuncOnec = null;
            this.amountOfMouseMovedbyPixel = {
                x: 0,
                y: 0
            };
        }
        Drag.prototype.addEvent = function (targetElement) {
            var _this = this;
            this.targetElement = targetElement;
            this.dragStartFunctionBinded = function (e) {
                _this.dragStartFunction(e);
            };
            this.dragingFunctionBinded = function (e) {
                Drag.dragingFunction(e, _this);
            };
            this.dragEndFunctionBinded = function (e) {
                Drag.dragEndFunction(e, _this);
            };
            Drag.addDragStartEvent(this.targetElement, this.dragStartFunctionBinded);
        };
        Drag.prototype.removeEvent = function (targetElement) {
            Drag.removeDragStartEvent(targetElement, this.dragStartFunctionBinded);
            Drag.removeDragingEvent(window, this.dragingFunctionBinded);
            Drag.removeDragEndEvent(window, this.dragEndFunctionBinded);
        };
        Drag.prototype.setDragStartFunc = function (func) {
            this.isFunctionWhenDragStart = typeof func === "function" ? true : false;
            this.functionWhenDragStart = func;
            return this;
        };
        Drag.prototype.setDragEndFunc = function (func) {
            this.isFunctionWhenDragEnd = typeof func === "function" ? true : false;
            this.functionWhenDragEnd = func;
            return this;
        };
        Drag.prototype.dragStartFunction = function (e) {
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
                this.dragStartFuncOnec = onebang$1(this.functionWhenDragStart);
        };
        Drag.dragingFunction = function (e, instance) {
            var currentMousePosition = {
                x: e.pageX,
                y: e.pageY
            };
            instance.amountOfMouseMovedbyPixel = {
                x: currentMousePosition.x - instance.mousePositionWhenDragStart.x,
                y: currentMousePosition.y - instance.mousePositionWhenDragStart.y
            };
            if (instance.amountOfMouseMovedbyPixel.x === 0 &&
                instance.amountOfMouseMovedbyPixel.y === 0)
                return false;
            if (instance.dragStartFuncOnec !== null)
                instance.dragStartFuncOnec(instance.targetElement, instance.mousePositionWhenDragStart);
            instance.functionWhenDraging(e, instance.mousePositionWhenDragStart, instance.amountOfMouseMovedbyPixel);
        };
        Drag.dragEndFunction = function (e, instance) {
            e.preventDefault();
            this.addDragStartEvent(instance.targetElement, instance.dragStartFunctionBinded);
            this.removeDragingEvent(window, instance.dragingFunctionBinded);
            this.removeDragEndEvent(window, instance.dragEndFunctionBinded);
            if (instance.amountOfMouseMovedbyPixel.x === 0 &&
                instance.amountOfMouseMovedbyPixel.y === 0)
                return false;
            if (instance.isFunctionWhenDragEnd) {
                instance.functionWhenDragEnd(instance.targetElement, instance.mousePositionWhenDragStart, instance.amountOfMouseMovedbyPixel);
            }
            if (instance.isFunctionWhenDragStart) {
                instance.dragStartFuncOnec = onebang$1(instance.functionWhenDragStart);
            }
        };
        Drag.addDragingEvent = function (targetElement, func) {
            targetElement.addEventListener("mousemove", func, false);
            targetElement.addEventListener("touchmove", func, false);
        };
        Drag.removeDragingEvent = function (targetElement, func) {
            targetElement.removeEventListener("mousemove", func, false);
            targetElement.removeEventListener("touchmove", func, false);
        };
        Drag.addDragStartEvent = function (targetElement, func) {
            targetElement.addEventListener("mousedown", func, false);
            targetElement.addEventListener("touchstart", func, false);
        };
        Drag.removeDragStartEvent = function (targetElement, func) {
            targetElement.removeEventListener("mousedown", func, false);
            targetElement.removeEventListener("touchstart", func, false);
        };
        Drag.addDragEndEvent = function (targetElement, func) {
            targetElement.addEventListener("mouseup", func, false);
            targetElement.addEventListener("touchend", func, false);
            targetElement.addEventListener("mouseleave", func, false);
            targetElement.addEventListener("touchleave", func, false);
        };
        Drag.removeDragEndEvent = function (targetElement, func) {
            targetElement.removeEventListener("mouseup", func, false);
            targetElement.removeEventListener("touchend", func, false);
            targetElement.removeEventListener("mouseleave", func, false);
            targetElement.removeEventListener("touchleave", func, false);
        };
        return Drag;
    }());

    var _css = ":host{display:inline-block;width:100%}:host canvas{vertical-align:bottom}";
    var _style = "<style>" + _css + "</style>";
    var _shadowdomHTML = "\n    " + _style + "\n    <canvas/>\n";
    var template = document.createElement("template");
    template.id = "RikaaaRoundTable";
    template.innerHTML = _shadowdomHTML;
    if (self.ShadyCSS)
        self.ShadyCSS.prepareTemplate(template, "rikaaa-image-line");
    var RTable = /** @class */ (function (_super) {
        __extends(RTable, _super);
        function RTable() {
            var _this = _super.call(this) || this;
            _this.state = {
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
            if (self.ShadyCSS)
                self.ShadyCSS.styleElement(_this);
            _this.attachShadow({ mode: "open" });
            _this.shadowRoot.appendChild(template.content.cloneNode(true));
            // drag
            var amoutOfRotateWhenDragStart = 0;
            _this.drag = new Drag(function (e, pos, amount) {
                var amountOfRotate = amount.y / _this.state.height / _this.state.imageResources.length;
                amountOfRotate += amoutOfRotateWhenDragStart;
                _this.setRotate(amountOfRotate);
            });
            _this.drag.setDragStartFunc(function () {
                amoutOfRotateWhenDragStart = _this.state.amountOfRotate;
            });
            _this.drag.addEvent(_this);
            _this.state.canvas = _this.shadowRoot.querySelector("canvas");
            _this.state.ctx = _this.state.canvas.getContext("2d");
            return _this;
        }
        RTable.prototype.connectedCallback = function () {
            var resizeObserverInstance = mapSizeToCanvas(this.state.canvas, this, this.state).resizeObserverInstance;
            this.mapSize = resizeObserverInstance;
            RTable.draw(this, this.state);
        };
        RTable.prototype.disconnectedCallback = function () {
            this.mapSize.unobserve();
            this.drag.removeEvent(this);
        };
        Object.defineProperty(RTable, "observedAttributes", {
            get: function () {
                return ["size", "srcs"];
            },
            enumerable: true,
            configurable: true
        });
        RTable.prototype.attributeChangedCallback = function (attr, oldval, newval) {
            var _this = this;
            if (attr === "size") {
                var imageSize = newval.split("x").map(function (str) { return Number(str); });
                this.state.imageSize.w = imageSize[0];
                this.state.imageSize.h = imageSize[1];
                this.state.aspect = calcAspect(imageSize[0], imageSize[1]);
            }
            if (attr === "srcs") {
                var srcs = newval.split(",").map(function (srcStr) { return trim(srcStr); });
                var load = srcs.map(function (src) { return loadImage(src); });
                Promise.all(load).then(function (data) { return (_this.state.imageResources = data); });
            }
        };
        /**
         * 0 - 1の値をラジアンに変更する。
         * @param value 自然数
         */
        RTable.calcRotate = function (value) {
            var val = value - Math.floor(value);
            return (360 * val * Math.PI) / 180;
        };
        RTable.calcIndex = function () { };
        RTable.calcImgRTablePos = function (poly) {
            var angles = calcRadianFromVertexLen(poly.length);
            return poly.map(function (pos, index) {
                return {
                    pos: { x: pos[0], y: pos[1] },
                    angle: angles[index]
                };
            });
        };
        /**
         * メインドローループ
         * @param instance this
         * @param state this.state
         */
        RTable.draw = function (instance, state) {
            var ctx = state.ctx;
            var drawloop = function () {
                self.requestAnimationFrame(drawloop);
                ctx.clearRect(0, 0, state.width * 2, state.height * 2);
                var poly = polygon(state.height, state.imageResources.length);
                var heightFromBase = calcHeightFromBase(state.height, state.imageResources.length);
                ctx.save();
                ctx.scale(2, 2);
                // centering
                ctx.save();
                ctx.translate(state.width / 2, state.height / 2);
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
                var rtablePos = RTable.calcImgRTablePos(poly);
                rtablePos.forEach(function (table, index) {
                    var img = state.imageResources[index].img;
                    var x = table.pos.x;
                    var y = table.pos.y;
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
        };
        /**
         * パネルの回転具合を指定する。増加で上から下へ回転する。
         * @param num 自然数
         */
        RTable.prototype.setRotate = function (num) {
            this.state.amountOfRotate = num;
            this.state.rotate = RTable.calcRotate(this.state.amountOfRotate);
        };
        return RTable;
    }(HTMLElement));

    customElements.define("rikaaa-roundtable", RTable);

}());
