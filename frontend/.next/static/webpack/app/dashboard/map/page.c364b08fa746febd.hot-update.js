"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/dashboard/map/page",{

/***/ "(app-pages-browser)/./src/app/ui/dashboard/map/Polygon.tsx":
/*!**********************************************!*\
  !*** ./src/app/ui/dashboard/map/Polygon.tsx ***!
  \**********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Polygon: function() { return /* binding */ Polygon; }\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _vis_gl_react_google_maps__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @vis.gl/react-google-maps */ \"(app-pages-browser)/./node_modules/@vis.gl/react-google-maps/dist/index.modern.mjs\");\n/* eslint-disable complexity */ var _s = $RefreshSig$(), _s1 = $RefreshSig$();\n\n\nfunction usePolygon(props) {\n    var _useContext;\n    _s();\n    const { onClick, onDrag, onDragStart, onDragEnd, onMouseOver, onMouseOut, onInsertAt, onRemoveAt, onSetAt, encodedPaths, ...polygonOptions } = props;\n    // This is here to avoid triggering the useEffect below when the callbacks change (which happen if the user didn't memoize them)\n    const callbacks = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({});\n    Object.assign(callbacks.current, {\n        onClick,\n        onDrag,\n        onDragStart,\n        onDragEnd,\n        onMouseOver,\n        onMouseOut,\n        onInsertAt,\n        onRemoveAt,\n        onSetAt\n    });\n    const geometryLibrary = (0,_vis_gl_react_google_maps__WEBPACK_IMPORTED_MODULE_1__.useMapsLibrary)(\"geometry\");\n    const polygon = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(new google.maps.Polygon()).current;\n    // update PolygonOptions (note the dependencies aren't properly checked\n    // here, we just assume that setOptions is smart enough to not waste a\n    // lot of time updating values that didn't change)\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>{\n        polygon.setOptions(polygonOptions);\n    }, [\n        polygon,\n        polygonOptions\n    ]);\n    const map = (_useContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_vis_gl_react_google_maps__WEBPACK_IMPORTED_MODULE_1__.GoogleMapsContext)) === null || _useContext === void 0 ? void 0 : _useContext.map;\n    // update the path with the encodedPath\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>{\n        if (!encodedPaths || !geometryLibrary) return;\n        const paths = encodedPaths.map((path)=>{\n            geometryLibrary.encoding.decodePath(path);\n        });\n        console.log(\"paths\", paths);\n        polygon.setPaths(paths);\n    }, [\n        polygon,\n        encodedPaths,\n        geometryLibrary\n    ]);\n    // create polygon instance and add to the map once the map is available\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{\n        if (!map) {\n            if (map === undefined) console.error(\"<Polygon> has to be inside a Map component.\");\n            return;\n        }\n        polygon.setMap(map);\n        return ()=>{\n            polygon.setMap(null);\n        };\n    }, [\n        map\n    ]);\n    // attach and re-attach event-handlers when any of the properties change\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{\n        if (!polygon) return;\n        // Add event listeners\n        const gme = google.maps.event;\n        [\n            [\n                \"click\",\n                \"onClick\"\n            ],\n            [\n                \"drag\",\n                \"onDrag\"\n            ],\n            [\n                \"dragstart\",\n                \"onDragStart\"\n            ],\n            [\n                \"dragend\",\n                \"onDragEnd\"\n            ],\n            [\n                \"mouseover\",\n                \"onMouseOver\"\n            ],\n            [\n                \"mouseout\",\n                \"onMouseOut\"\n            ],\n            [\n                \"insert_at\",\n                \"onInsertAt\"\n            ],\n            [\n                \"remove_at\",\n                \"onRemoveAt\"\n            ],\n            [\n                \"set_at\",\n                \"onSetAt\"\n            ]\n        ].forEach((param)=>{\n            let [eventName, eventCallback] = param;\n            gme.addListener(polygon, eventName, (e)=>{\n                const callback = callbacks.current[eventCallback];\n                if (callback) callback(e);\n            });\n        });\n        return ()=>{\n            gme.clearInstanceListeners(polygon);\n        };\n    }, [\n        polygon\n    ]);\n    return polygon;\n}\n_s(usePolygon, \"jkpe9Xt8YAGWjv5JIpEoHi+UnBg=\", false, function() {\n    return [\n        _vis_gl_react_google_maps__WEBPACK_IMPORTED_MODULE_1__.useMapsLibrary\n    ];\n});\n/**\r\n   * Component to render a Google Maps polygon on a map\r\n   */ const Polygon = /*#__PURE__*/ _s1((0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(_c = _s1((props, ref)=>{\n    _s1();\n    const polygon = usePolygon(props);\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useImperativeHandle)(ref, ()=>polygon, []);\n    return null;\n}, \"QWUCSrBMx89ht59aEXvivlYV9ck=\", false, function() {\n    return [\n        usePolygon\n    ];\n})), \"QWUCSrBMx89ht59aEXvivlYV9ck=\", false, function() {\n    return [\n        usePolygon\n    ];\n});\n_c1 = Polygon;\nvar _c, _c1;\n$RefreshReg$(_c, \"Polygon$forwardRef\");\n$RefreshReg$(_c1, \"Polygon\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvdWkvZGFzaGJvYXJkL21hcC9Qb2x5Z29uLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsNkJBQTZCO0FBUVo7QUFFNkQ7QUE2QjVFLFNBQVNRLFdBQVdDLEtBQW1CO1FBc0N6QlI7O0lBckNaLE1BQU0sRUFDSlMsT0FBTyxFQUNQQyxNQUFNLEVBQ05DLFdBQVcsRUFDWEMsU0FBUyxFQUNUQyxXQUFXLEVBQ1hDLFVBQVUsRUFDVkMsVUFBVSxFQUNWQyxVQUFVLEVBQ1ZDLE9BQU8sRUFDUEMsWUFBWSxFQUNaLEdBQUdDLGdCQUNKLEdBQUdYO0lBQ0osZ0lBQWdJO0lBQ2hJLE1BQU1ZLFlBQVloQiw2Q0FBTUEsQ0FBdUMsQ0FBQztJQUNoRWlCLE9BQU9DLE1BQU0sQ0FBQ0YsVUFBVUcsT0FBTyxFQUFFO1FBQy9CZDtRQUNBQztRQUNBQztRQUNBQztRQUNBQztRQUNBQztRQUNBQztRQUNBQztRQUNBQztJQUNGO0lBRUEsTUFBTU8sa0JBQWtCbEIseUVBQWNBLENBQUM7SUFFdkMsTUFBTW1CLFVBQVVyQiw2Q0FBTUEsQ0FBQyxJQUFJc0IsT0FBT0MsSUFBSSxDQUFDQyxPQUFPLElBQUlMLE9BQU87SUFDekQsdUVBQXVFO0lBQ3ZFLHNFQUFzRTtJQUN0RSxrREFBa0Q7SUFDbERwQiw4Q0FBT0EsQ0FBQztRQUNOc0IsUUFBUUksVUFBVSxDQUFDVjtJQUNyQixHQUFHO1FBQUNNO1FBQVNOO0tBQWU7SUFFNUIsTUFBTVcsT0FBTTlCLGNBQUFBLGlEQUFVQSxDQUFDSyx3RUFBaUJBLGVBQTVCTCxrQ0FBQUEsWUFBK0I4QixHQUFHO0lBRTlDLHVDQUF1QztJQUN2QzNCLDhDQUFPQSxDQUFDO1FBQ04sSUFBSSxDQUFDZSxnQkFBZ0IsQ0FBQ00saUJBQWlCO1FBQ3ZDLE1BQU1PLFFBQVFiLGFBQWFZLEdBQUcsQ0FBQ0UsQ0FBQUE7WUFDN0JSLGdCQUFnQlMsUUFBUSxDQUFDQyxVQUFVLENBQUNGO1FBQUs7UUFFM0NHLFFBQVFDLEdBQUcsQ0FBQyxTQUFTTDtRQUNyQk4sUUFBUVksUUFBUSxDQUFDTjtJQUNuQixHQUFHO1FBQUNOO1FBQVNQO1FBQWNNO0tBQWdCO0lBRTNDLHVFQUF1RTtJQUN2RXZCLGdEQUFTQSxDQUFDO1FBQ1IsSUFBSSxDQUFDNkIsS0FBSztZQUNSLElBQUlBLFFBQVFRLFdBQ1ZILFFBQVFJLEtBQUssQ0FBQztZQUVoQjtRQUNGO1FBRUFkLFFBQVFlLE1BQU0sQ0FBQ1Y7UUFFZixPQUFPO1lBQ0xMLFFBQVFlLE1BQU0sQ0FBQztRQUNqQjtJQUNGLEdBQUc7UUFBQ1Y7S0FBSTtJQUVSLHdFQUF3RTtJQUN4RTdCLGdEQUFTQSxDQUFDO1FBQ1IsSUFBSSxDQUFDd0IsU0FBUztRQUVkLHNCQUFzQjtRQUN0QixNQUFNZ0IsTUFBTWYsT0FBT0MsSUFBSSxDQUFDZSxLQUFLO1FBQzdCO1lBQ0U7Z0JBQUM7Z0JBQVM7YUFBVTtZQUNwQjtnQkFBQztnQkFBUTthQUFTO1lBQ2xCO2dCQUFDO2dCQUFhO2FBQWM7WUFDNUI7Z0JBQUM7Z0JBQVc7YUFBWTtZQUN4QjtnQkFBQztnQkFBYTthQUFjO1lBQzVCO2dCQUFDO2dCQUFZO2FBQWE7WUFDMUI7Z0JBQUM7Z0JBQWE7YUFBYTtZQUMzQjtnQkFBQztnQkFBYTthQUFhO1lBQzNCO2dCQUFDO2dCQUFVO2FBQVU7U0FDdEIsQ0FBQ0MsT0FBTyxDQUFDO2dCQUFDLENBQUNDLFdBQVdDLGNBQWM7WUFDbkNKLElBQUlLLFdBQVcsQ0FBQ3JCLFNBQVNtQixXQUFXLENBQUNHO2dCQUNuQyxNQUFNQyxXQUFXNUIsVUFBVUcsT0FBTyxDQUFDc0IsY0FBYztnQkFDakQsSUFBSUcsVUFBVUEsU0FBU0Q7WUFDekI7UUFDRjtRQUVBLE9BQU87WUFDTE4sSUFBSVEsc0JBQXNCLENBQUN4QjtRQUM3QjtJQUNGLEdBQUc7UUFBQ0E7S0FBUTtJQUVaLE9BQU9BO0FBQ1Q7R0EvRlNsQjs7UUE0QmlCRCxxRUFBY0E7OztBQXFFeEM7O0dBRUMsR0FDTSxNQUFNc0Isd0JBQVU3QixJQUFBQSxpREFBVUEsVUFBQyxDQUFDUyxPQUFxQjBDOztJQUN0RCxNQUFNekIsVUFBVWxCLFdBQVdDO0lBRTNCTiwwREFBbUJBLENBQUNnRCxLQUFLLElBQU16QixTQUFTLEVBQUU7SUFFMUMsT0FBTztBQUNUOztRQUxrQmxCOzs7O1FBQUFBOztHQUtmIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9hcHAvdWkvZGFzaGJvYXJkL21hcC9Qb2x5Z29uLnRzeD83ZjJhIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIGNvbXBsZXhpdHkgKi9cclxuaW1wb3J0IHtcclxuICAgIGZvcndhcmRSZWYsXHJcbiAgICB1c2VDb250ZXh0LFxyXG4gICAgdXNlRWZmZWN0LFxyXG4gICAgdXNlSW1wZXJhdGl2ZUhhbmRsZSxcclxuICAgIHVzZU1lbW8sXHJcbiAgICB1c2VSZWZcclxuICB9IGZyb20gJ3JlYWN0JztcclxuICBcclxuICBpbXBvcnQge0dvb2dsZU1hcHNDb250ZXh0LCB1c2VNYXBzTGlicmFyeX0gZnJvbSAnQHZpcy5nbC9yZWFjdC1nb29nbGUtbWFwcyc7XHJcbiAgXHJcbiAgaW1wb3J0IHR5cGUge1JlZn0gZnJvbSAncmVhY3QnO1xyXG4gIFxyXG4gIHR5cGUgUG9seWdvbkV2ZW50UHJvcHMgPSB7XHJcbiAgICBvbkNsaWNrPzogKGU6IGdvb2dsZS5tYXBzLk1hcE1vdXNlRXZlbnQpID0+IHZvaWQ7XHJcbiAgICBvbkRyYWc/OiAoZTogZ29vZ2xlLm1hcHMuTWFwTW91c2VFdmVudCkgPT4gdm9pZDtcclxuICAgIG9uRHJhZ1N0YXJ0PzogKGU6IGdvb2dsZS5tYXBzLk1hcE1vdXNlRXZlbnQpID0+IHZvaWQ7XHJcbiAgICBvbkRyYWdFbmQ/OiAoZTogZ29vZ2xlLm1hcHMuTWFwTW91c2VFdmVudCkgPT4gdm9pZDtcclxuICAgIG9uTW91c2VPdmVyPzogKGU6IGdvb2dsZS5tYXBzLk1hcE1vdXNlRXZlbnQpID0+IHZvaWQ7XHJcbiAgICBvbk1vdXNlT3V0PzogKGU6IGdvb2dsZS5tYXBzLk1hcE1vdXNlRXZlbnQpID0+IHZvaWQ7XHJcbiAgICBvbkluc2VydEF0PzogKGU6IGFueSkgPT4gdm9pZDtcclxuICAgIG9uUmVtb3ZlQXQ/OiAoZTogYW55KSA9PiB2b2lkO1xyXG4gICAgb25TZXRBdD86ICgpID0+IHZvaWQ7XHJcbiAgfTtcclxuICBcclxuICB0eXBlIFBvbHlnb25DdXN0b21Qcm9wcyA9IHtcclxuICAgIC8qKlxyXG4gICAgICogdGhpcyBpcyBhbiBlbmNvZGVkIHN0cmluZyBmb3IgdGhlIHBhdGgsIHdpbGwgIGJlIGRlY29kZWQgYW5kIHVzZWQgYXMgYSBwYXRoXHJcbiAgICAgKi9cclxuICAgIGVuY29kZWRQYXRocz86IHN0cmluZ1tdO1xyXG4gIH07XHJcbiAgXHJcbiAgZXhwb3J0IHR5cGUgUG9seWdvblByb3BzID0gZ29vZ2xlLm1hcHMuUG9seWdvbk9wdGlvbnMgJlxyXG4gICAgUG9seWdvbkV2ZW50UHJvcHMgJlxyXG4gICAgUG9seWdvbkN1c3RvbVByb3BzO1xyXG4gIFxyXG4gIGV4cG9ydCB0eXBlIFBvbHlnb25SZWYgPSBSZWY8Z29vZ2xlLm1hcHMuUG9seWdvbiB8IG51bGw+O1xyXG4gIFxyXG4gIGZ1bmN0aW9uIHVzZVBvbHlnb24ocHJvcHM6IFBvbHlnb25Qcm9wcykge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBvbkNsaWNrLFxyXG4gICAgICBvbkRyYWcsXHJcbiAgICAgIG9uRHJhZ1N0YXJ0LFxyXG4gICAgICBvbkRyYWdFbmQsXHJcbiAgICAgIG9uTW91c2VPdmVyLFxyXG4gICAgICBvbk1vdXNlT3V0LFxyXG4gICAgICBvbkluc2VydEF0LFxyXG4gICAgICBvblJlbW92ZUF0LFxyXG4gICAgICBvblNldEF0LFxyXG4gICAgICBlbmNvZGVkUGF0aHMsXHJcbiAgICAgIC4uLnBvbHlnb25PcHRpb25zXHJcbiAgICB9ID0gcHJvcHM7XHJcbiAgICAvLyBUaGlzIGlzIGhlcmUgdG8gYXZvaWQgdHJpZ2dlcmluZyB0aGUgdXNlRWZmZWN0IGJlbG93IHdoZW4gdGhlIGNhbGxiYWNrcyBjaGFuZ2UgKHdoaWNoIGhhcHBlbiBpZiB0aGUgdXNlciBkaWRuJ3QgbWVtb2l6ZSB0aGVtKVxyXG4gICAgY29uc3QgY2FsbGJhY2tzID0gdXNlUmVmPFJlY29yZDxzdHJpbmcsIChlOiB1bmtub3duKSA9PiB2b2lkPj4oe30pO1xyXG4gICAgT2JqZWN0LmFzc2lnbihjYWxsYmFja3MuY3VycmVudCwge1xyXG4gICAgICBvbkNsaWNrLFxyXG4gICAgICBvbkRyYWcsXHJcbiAgICAgIG9uRHJhZ1N0YXJ0LFxyXG4gICAgICBvbkRyYWdFbmQsXHJcbiAgICAgIG9uTW91c2VPdmVyLFxyXG4gICAgICBvbk1vdXNlT3V0LFxyXG4gICAgICBvbkluc2VydEF0LFxyXG4gICAgICBvblJlbW92ZUF0LFxyXG4gICAgICBvblNldEF0XHJcbiAgICB9KTtcclxuICBcclxuICAgIGNvbnN0IGdlb21ldHJ5TGlicmFyeSA9IHVzZU1hcHNMaWJyYXJ5KCdnZW9tZXRyeScpO1xyXG4gIFxyXG4gICAgY29uc3QgcG9seWdvbiA9IHVzZVJlZihuZXcgZ29vZ2xlLm1hcHMuUG9seWdvbigpKS5jdXJyZW50O1xyXG4gICAgLy8gdXBkYXRlIFBvbHlnb25PcHRpb25zIChub3RlIHRoZSBkZXBlbmRlbmNpZXMgYXJlbid0IHByb3Blcmx5IGNoZWNrZWRcclxuICAgIC8vIGhlcmUsIHdlIGp1c3QgYXNzdW1lIHRoYXQgc2V0T3B0aW9ucyBpcyBzbWFydCBlbm91Z2ggdG8gbm90IHdhc3RlIGFcclxuICAgIC8vIGxvdCBvZiB0aW1lIHVwZGF0aW5nIHZhbHVlcyB0aGF0IGRpZG4ndCBjaGFuZ2UpXHJcbiAgICB1c2VNZW1vKCgpID0+IHtcclxuICAgICAgcG9seWdvbi5zZXRPcHRpb25zKHBvbHlnb25PcHRpb25zKTtcclxuICAgIH0sIFtwb2x5Z29uLCBwb2x5Z29uT3B0aW9uc10pO1xyXG4gIFxyXG4gICAgY29uc3QgbWFwID0gdXNlQ29udGV4dChHb29nbGVNYXBzQ29udGV4dCk/Lm1hcDtcclxuICBcclxuICAgIC8vIHVwZGF0ZSB0aGUgcGF0aCB3aXRoIHRoZSBlbmNvZGVkUGF0aFxyXG4gICAgdXNlTWVtbygoKSA9PiB7XHJcbiAgICAgIGlmICghZW5jb2RlZFBhdGhzIHx8ICFnZW9tZXRyeUxpYnJhcnkpIHJldHVybjtcclxuICAgICAgY29uc3QgcGF0aHMgPSBlbmNvZGVkUGF0aHMubWFwKHBhdGggPT57XHJcbiAgICAgICAgZ2VvbWV0cnlMaWJyYXJ5LmVuY29kaW5nLmRlY29kZVBhdGgocGF0aCl9XHJcbiAgICAgICk7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdwYXRocycsIHBhdGhzKTtcclxuICAgICAgcG9seWdvbi5zZXRQYXRocyhwYXRocyk7XHJcbiAgICB9LCBbcG9seWdvbiwgZW5jb2RlZFBhdGhzLCBnZW9tZXRyeUxpYnJhcnldKTtcclxuICBcclxuICAgIC8vIGNyZWF0ZSBwb2x5Z29uIGluc3RhbmNlIGFuZCBhZGQgdG8gdGhlIG1hcCBvbmNlIHRoZSBtYXAgaXMgYXZhaWxhYmxlXHJcbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgICBpZiAoIW1hcCkge1xyXG4gICAgICAgIGlmIChtYXAgPT09IHVuZGVmaW5lZClcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJzxQb2x5Z29uPiBoYXMgdG8gYmUgaW5zaWRlIGEgTWFwIGNvbXBvbmVudC4nKTtcclxuICBcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICBcclxuICAgICAgcG9seWdvbi5zZXRNYXAobWFwKTtcclxuICBcclxuICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICBwb2x5Z29uLnNldE1hcChudWxsKTtcclxuICAgICAgfTtcclxuICAgIH0sIFttYXBdKTtcclxuICBcclxuICAgIC8vIGF0dGFjaCBhbmQgcmUtYXR0YWNoIGV2ZW50LWhhbmRsZXJzIHdoZW4gYW55IG9mIHRoZSBwcm9wZXJ0aWVzIGNoYW5nZVxyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgaWYgKCFwb2x5Z29uKSByZXR1cm47XHJcbiAgXHJcbiAgICAgIC8vIEFkZCBldmVudCBsaXN0ZW5lcnNcclxuICAgICAgY29uc3QgZ21lID0gZ29vZ2xlLm1hcHMuZXZlbnQ7XHJcbiAgICAgIFtcclxuICAgICAgICBbJ2NsaWNrJywgJ29uQ2xpY2snXSxcclxuICAgICAgICBbJ2RyYWcnLCAnb25EcmFnJ10sXHJcbiAgICAgICAgWydkcmFnc3RhcnQnLCAnb25EcmFnU3RhcnQnXSxcclxuICAgICAgICBbJ2RyYWdlbmQnLCAnb25EcmFnRW5kJ10sXHJcbiAgICAgICAgWydtb3VzZW92ZXInLCAnb25Nb3VzZU92ZXInXSxcclxuICAgICAgICBbJ21vdXNlb3V0JywgJ29uTW91c2VPdXQnXSxcclxuICAgICAgICBbJ2luc2VydF9hdCcsICdvbkluc2VydEF0J10sXHJcbiAgICAgICAgWydyZW1vdmVfYXQnLCAnb25SZW1vdmVBdCddLFxyXG4gICAgICAgIFsnc2V0X2F0JywgJ29uU2V0QXQnXVxyXG4gICAgICBdLmZvckVhY2goKFtldmVudE5hbWUsIGV2ZW50Q2FsbGJhY2tdKSA9PiB7XHJcbiAgICAgICAgZ21lLmFkZExpc3RlbmVyKHBvbHlnb24sIGV2ZW50TmFtZSwgKGU6IGdvb2dsZS5tYXBzLk1hcE1vdXNlRXZlbnQpID0+IHtcclxuICAgICAgICAgIGNvbnN0IGNhbGxiYWNrID0gY2FsbGJhY2tzLmN1cnJlbnRbZXZlbnRDYWxsYmFja107XHJcbiAgICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKGUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICB9KTtcclxuICBcclxuICAgICAgcmV0dXJuICgpID0+IHtcclxuICAgICAgICBnbWUuY2xlYXJJbnN0YW5jZUxpc3RlbmVycyhwb2x5Z29uKTtcclxuICAgICAgfTtcclxuICAgIH0sIFtwb2x5Z29uXSk7XHJcbiAgXHJcbiAgICByZXR1cm4gcG9seWdvbjtcclxuICB9XHJcbiAgXHJcbiAgLyoqXHJcbiAgICogQ29tcG9uZW50IHRvIHJlbmRlciBhIEdvb2dsZSBNYXBzIHBvbHlnb24gb24gYSBtYXBcclxuICAgKi9cclxuICBleHBvcnQgY29uc3QgUG9seWdvbiA9IGZvcndhcmRSZWYoKHByb3BzOiBQb2x5Z29uUHJvcHMsIHJlZjogUG9seWdvblJlZikgPT4ge1xyXG4gICAgY29uc3QgcG9seWdvbiA9IHVzZVBvbHlnb24ocHJvcHMpO1xyXG4gIFxyXG4gICAgdXNlSW1wZXJhdGl2ZUhhbmRsZShyZWYsICgpID0+IHBvbHlnb24sIFtdKTtcclxuICBcclxuICAgIHJldHVybiBudWxsO1xyXG4gIH0pOyJdLCJuYW1lcyI6WyJmb3J3YXJkUmVmIiwidXNlQ29udGV4dCIsInVzZUVmZmVjdCIsInVzZUltcGVyYXRpdmVIYW5kbGUiLCJ1c2VNZW1vIiwidXNlUmVmIiwiR29vZ2xlTWFwc0NvbnRleHQiLCJ1c2VNYXBzTGlicmFyeSIsInVzZVBvbHlnb24iLCJwcm9wcyIsIm9uQ2xpY2siLCJvbkRyYWciLCJvbkRyYWdTdGFydCIsIm9uRHJhZ0VuZCIsIm9uTW91c2VPdmVyIiwib25Nb3VzZU91dCIsIm9uSW5zZXJ0QXQiLCJvblJlbW92ZUF0Iiwib25TZXRBdCIsImVuY29kZWRQYXRocyIsInBvbHlnb25PcHRpb25zIiwiY2FsbGJhY2tzIiwiT2JqZWN0IiwiYXNzaWduIiwiY3VycmVudCIsImdlb21ldHJ5TGlicmFyeSIsInBvbHlnb24iLCJnb29nbGUiLCJtYXBzIiwiUG9seWdvbiIsInNldE9wdGlvbnMiLCJtYXAiLCJwYXRocyIsInBhdGgiLCJlbmNvZGluZyIsImRlY29kZVBhdGgiLCJjb25zb2xlIiwibG9nIiwic2V0UGF0aHMiLCJ1bmRlZmluZWQiLCJlcnJvciIsInNldE1hcCIsImdtZSIsImV2ZW50IiwiZm9yRWFjaCIsImV2ZW50TmFtZSIsImV2ZW50Q2FsbGJhY2siLCJhZGRMaXN0ZW5lciIsImUiLCJjYWxsYmFjayIsImNsZWFySW5zdGFuY2VMaXN0ZW5lcnMiLCJyZWYiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/ui/dashboard/map/Polygon.tsx\n"));

/***/ })

});