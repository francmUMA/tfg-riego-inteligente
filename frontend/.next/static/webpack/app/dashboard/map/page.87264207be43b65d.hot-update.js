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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   Polygon: function() { return /* binding */ Polygon; }\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _vis_gl_react_google_maps__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @vis.gl/react-google-maps */ \"(app-pages-browser)/./node_modules/@vis.gl/react-google-maps/dist/index.modern.mjs\");\n/* eslint-disable complexity */ var _s = $RefreshSig$(), _s1 = $RefreshSig$();\n\n\nfunction usePolygon(props) {\n    var _useContext;\n    _s();\n    const { onClick, onDrag, onDragStart, onDragEnd, onMouseOver, onMouseOut, encodedPaths, ...polygonOptions } = props;\n    // This is here to avoid triggering the useEffect below when the callbacks change (which happen if the user didn't memoize them)\n    const callbacks = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)({});\n    Object.assign(callbacks.current, {\n        onClick,\n        onDrag,\n        onDragStart,\n        onDragEnd,\n        onMouseOver,\n        onMouseOut\n    });\n    const geometryLibrary = (0,_vis_gl_react_google_maps__WEBPACK_IMPORTED_MODULE_1__.useMapsLibrary)(\"geometry\");\n    const polygon = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(new google.maps.Polygon()).current;\n    // update PolygonOptions (note the dependencies aren't properly checked\n    // here, we just assume that setOptions is smart enough to not waste a\n    // lot of time updating values that didn't change)\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>{\n        polygon.setOptions(polygonOptions);\n    }, [\n        polygon,\n        polygonOptions\n    ]);\n    const map = (_useContext = (0,react__WEBPACK_IMPORTED_MODULE_0__.useContext)(_vis_gl_react_google_maps__WEBPACK_IMPORTED_MODULE_1__.GoogleMapsContext)) === null || _useContext === void 0 ? void 0 : _useContext.map;\n    // update the path with the encodedPath\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useMemo)(()=>{\n        if (!encodedPaths || !geometryLibrary) return;\n        const paths = encodedPaths.map((path)=>{\n            geometryLibrary.encoding.decodePath(path);\n        });\n        console.log(\"paths\", paths);\n        polygon.setPaths(paths);\n    }, [\n        polygon,\n        encodedPaths,\n        geometryLibrary\n    ]);\n    // create polygon instance and add to the map once the map is available\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{\n        if (!map) {\n            if (map === undefined) console.error(\"<Polygon> has to be inside a Map component.\");\n            return;\n        }\n        polygon.setMap(map);\n        return ()=>{\n            polygon.setMap(null);\n        };\n    }, [\n        map\n    ]);\n    // attach and re-attach event-handlers when any of the properties change\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{\n        if (!polygon) return;\n        // Add event listeners\n        const gme = google.maps.event;\n        [\n            [\n                \"click\",\n                \"onClick\"\n            ],\n            [\n                \"drag\",\n                \"onDrag\"\n            ],\n            [\n                \"dragstart\",\n                \"onDragStart\"\n            ],\n            [\n                \"dragend\",\n                \"onDragEnd\"\n            ],\n            [\n                \"mouseover\",\n                \"onMouseOver\"\n            ],\n            [\n                \"mouseout\",\n                \"onMouseOut\"\n            ]\n        ].forEach((param)=>{\n            let [eventName, eventCallback] = param;\n            gme.addListener(polygon, eventName, (e)=>{\n                const callback = callbacks.current[eventCallback];\n                if (callback) callback(e);\n            });\n        });\n        return ()=>{\n            gme.clearInstanceListeners(polygon);\n        };\n    }, [\n        polygon\n    ]);\n    return polygon;\n}\n_s(usePolygon, \"jkpe9Xt8YAGWjv5JIpEoHi+UnBg=\", false, function() {\n    return [\n        _vis_gl_react_google_maps__WEBPACK_IMPORTED_MODULE_1__.useMapsLibrary\n    ];\n});\n/**\r\n   * Component to render a Google Maps polygon on a map\r\n   */ const Polygon = /*#__PURE__*/ _s1((0,react__WEBPACK_IMPORTED_MODULE_0__.forwardRef)(_c = _s1((props, ref)=>{\n    _s1();\n    const polygon = usePolygon(props);\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useImperativeHandle)(ref, ()=>polygon, []);\n    return null;\n}, \"QWUCSrBMx89ht59aEXvivlYV9ck=\", false, function() {\n    return [\n        usePolygon\n    ];\n})), \"QWUCSrBMx89ht59aEXvivlYV9ck=\", false, function() {\n    return [\n        usePolygon\n    ];\n});\n_c1 = Polygon;\nvar _c, _c1;\n$RefreshReg$(_c, \"Polygon$forwardRef\");\n$RefreshReg$(_c1, \"Polygon\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvdWkvZGFzaGJvYXJkL21hcC9Qb2x5Z29uLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsNkJBQTZCO0FBUVo7QUFFNkQ7QUEwQjVFLFNBQVNRLFdBQVdDLEtBQW1CO1FBZ0N6QlI7O0lBL0JaLE1BQU0sRUFDSlMsT0FBTyxFQUNQQyxNQUFNLEVBQ05DLFdBQVcsRUFDWEMsU0FBUyxFQUNUQyxXQUFXLEVBQ1hDLFVBQVUsRUFDVkMsWUFBWSxFQUNaLEdBQUdDLGdCQUNKLEdBQUdSO0lBQ0osZ0lBQWdJO0lBQ2hJLE1BQU1TLFlBQVliLDZDQUFNQSxDQUF1QyxDQUFDO0lBQ2hFYyxPQUFPQyxNQUFNLENBQUNGLFVBQVVHLE9BQU8sRUFBRTtRQUMvQlg7UUFDQUM7UUFDQUM7UUFDQUM7UUFDQUM7UUFDQUM7SUFDRjtJQUVBLE1BQU1PLGtCQUFrQmYseUVBQWNBLENBQUM7SUFFdkMsTUFBTWdCLFVBQVVsQiw2Q0FBTUEsQ0FBQyxJQUFJbUIsT0FBT0MsSUFBSSxDQUFDQyxPQUFPLElBQUlMLE9BQU87SUFDekQsdUVBQXVFO0lBQ3ZFLHNFQUFzRTtJQUN0RSxrREFBa0Q7SUFDbERqQiw4Q0FBT0EsQ0FBQztRQUNObUIsUUFBUUksVUFBVSxDQUFDVjtJQUNyQixHQUFHO1FBQUNNO1FBQVNOO0tBQWU7SUFFNUIsTUFBTVcsT0FBTTNCLGNBQUFBLGlEQUFVQSxDQUFDSyx3RUFBaUJBLGVBQTVCTCxrQ0FBQUEsWUFBK0IyQixHQUFHO0lBRTlDLHVDQUF1QztJQUN2Q3hCLDhDQUFPQSxDQUFDO1FBQ04sSUFBSSxDQUFDWSxnQkFBZ0IsQ0FBQ00saUJBQWlCO1FBQ3ZDLE1BQU1PLFFBQVFiLGFBQWFZLEdBQUcsQ0FBQ0UsQ0FBQUE7WUFDN0JSLGdCQUFnQlMsUUFBUSxDQUFDQyxVQUFVLENBQUNGO1FBQUs7UUFFM0NHLFFBQVFDLEdBQUcsQ0FBQyxTQUFTTDtRQUNyQk4sUUFBUVksUUFBUSxDQUFDTjtJQUNuQixHQUFHO1FBQUNOO1FBQVNQO1FBQWNNO0tBQWdCO0lBRTNDLHVFQUF1RTtJQUN2RXBCLGdEQUFTQSxDQUFDO1FBQ1IsSUFBSSxDQUFDMEIsS0FBSztZQUNSLElBQUlBLFFBQVFRLFdBQ1ZILFFBQVFJLEtBQUssQ0FBQztZQUVoQjtRQUNGO1FBRUFkLFFBQVFlLE1BQU0sQ0FBQ1Y7UUFFZixPQUFPO1lBQ0xMLFFBQVFlLE1BQU0sQ0FBQztRQUNqQjtJQUNGLEdBQUc7UUFBQ1Y7S0FBSTtJQUVSLHdFQUF3RTtJQUN4RTFCLGdEQUFTQSxDQUFDO1FBQ1IsSUFBSSxDQUFDcUIsU0FBUztRQUVkLHNCQUFzQjtRQUN0QixNQUFNZ0IsTUFBTWYsT0FBT0MsSUFBSSxDQUFDZSxLQUFLO1FBQzdCO1lBQ0U7Z0JBQUM7Z0JBQVM7YUFBVTtZQUNwQjtnQkFBQztnQkFBUTthQUFTO1lBQ2xCO2dCQUFDO2dCQUFhO2FBQWM7WUFDNUI7Z0JBQUM7Z0JBQVc7YUFBWTtZQUN4QjtnQkFBQztnQkFBYTthQUFjO1lBQzVCO2dCQUFDO2dCQUFZO2FBQWE7U0FDM0IsQ0FBQ0MsT0FBTyxDQUFDO2dCQUFDLENBQUNDLFdBQVdDLGNBQWM7WUFDbkNKLElBQUlLLFdBQVcsQ0FBQ3JCLFNBQVNtQixXQUFXLENBQUNHO2dCQUNuQyxNQUFNQyxXQUFXNUIsVUFBVUcsT0FBTyxDQUFDc0IsY0FBYztnQkFDakQsSUFBSUcsVUFBVUEsU0FBU0Q7WUFDekI7UUFDRjtRQUVBLE9BQU87WUFDTE4sSUFBSVEsc0JBQXNCLENBQUN4QjtRQUM3QjtJQUNGLEdBQUc7UUFBQ0E7S0FBUTtJQUVaLE9BQU9BO0FBQ1Q7R0F0RlNmOztRQXNCaUJELHFFQUFjQTs7O0FBa0V4Qzs7R0FFQyxHQUNNLE1BQU1tQix3QkFBVTFCLElBQUFBLGlEQUFVQSxVQUFDLENBQUNTLE9BQXFCdUM7O0lBQ3RELE1BQU16QixVQUFVZixXQUFXQztJQUUzQk4sMERBQW1CQSxDQUFDNkMsS0FBSyxJQUFNekIsU0FBUyxFQUFFO0lBRTFDLE9BQU87QUFDVDs7UUFMa0JmOzs7O1FBQUFBOztHQUtmIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9hcHAvdWkvZGFzaGJvYXJkL21hcC9Qb2x5Z29uLnRzeD83ZjJhIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIGNvbXBsZXhpdHkgKi9cclxuaW1wb3J0IHtcclxuICAgIGZvcndhcmRSZWYsXHJcbiAgICB1c2VDb250ZXh0LFxyXG4gICAgdXNlRWZmZWN0LFxyXG4gICAgdXNlSW1wZXJhdGl2ZUhhbmRsZSxcclxuICAgIHVzZU1lbW8sXHJcbiAgICB1c2VSZWZcclxuICB9IGZyb20gJ3JlYWN0JztcclxuICBcclxuICBpbXBvcnQge0dvb2dsZU1hcHNDb250ZXh0LCB1c2VNYXBzTGlicmFyeX0gZnJvbSAnQHZpcy5nbC9yZWFjdC1nb29nbGUtbWFwcyc7XHJcbiAgXHJcbiAgaW1wb3J0IHR5cGUge1JlZn0gZnJvbSAncmVhY3QnO1xyXG4gIFxyXG4gIHR5cGUgUG9seWdvbkV2ZW50UHJvcHMgPSB7XHJcbiAgICBvbkNsaWNrPzogKGU6IGdvb2dsZS5tYXBzLk1hcE1vdXNlRXZlbnQpID0+IHZvaWQ7XHJcbiAgICBvbkRyYWc/OiAoZTogZ29vZ2xlLm1hcHMuTWFwTW91c2VFdmVudCkgPT4gdm9pZDtcclxuICAgIG9uRHJhZ1N0YXJ0PzogKGU6IGdvb2dsZS5tYXBzLk1hcE1vdXNlRXZlbnQpID0+IHZvaWQ7XHJcbiAgICBvbkRyYWdFbmQ/OiAoZTogZ29vZ2xlLm1hcHMuTWFwTW91c2VFdmVudCkgPT4gdm9pZDtcclxuICAgIG9uTW91c2VPdmVyPzogKGU6IGdvb2dsZS5tYXBzLk1hcE1vdXNlRXZlbnQpID0+IHZvaWQ7XHJcbiAgICBvbk1vdXNlT3V0PzogKHBvbHlnb24sIGU6IGdvb2dsZS5tYXBzLk1hcE1vdXNlRXZlbnQpID0+IHZvaWQ7XHJcbiAgfTtcclxuICBcclxuICB0eXBlIFBvbHlnb25DdXN0b21Qcm9wcyA9IHtcclxuICAgIC8qKlxyXG4gICAgICogdGhpcyBpcyBhbiBlbmNvZGVkIHN0cmluZyBmb3IgdGhlIHBhdGgsIHdpbGwgIGJlIGRlY29kZWQgYW5kIHVzZWQgYXMgYSBwYXRoXHJcbiAgICAgKi9cclxuICAgIGVuY29kZWRQYXRocz86IHN0cmluZ1tdO1xyXG4gIH07XHJcbiAgXHJcbiAgZXhwb3J0IHR5cGUgUG9seWdvblByb3BzID0gZ29vZ2xlLm1hcHMuUG9seWdvbk9wdGlvbnMgJlxyXG4gICAgUG9seWdvbkV2ZW50UHJvcHMgJlxyXG4gICAgUG9seWdvbkN1c3RvbVByb3BzO1xyXG4gIFxyXG4gIGV4cG9ydCB0eXBlIFBvbHlnb25SZWYgPSBSZWY8Z29vZ2xlLm1hcHMuUG9seWdvbiB8IG51bGw+O1xyXG4gIFxyXG4gIGZ1bmN0aW9uIHVzZVBvbHlnb24ocHJvcHM6IFBvbHlnb25Qcm9wcykge1xyXG4gICAgY29uc3Qge1xyXG4gICAgICBvbkNsaWNrLFxyXG4gICAgICBvbkRyYWcsXHJcbiAgICAgIG9uRHJhZ1N0YXJ0LFxyXG4gICAgICBvbkRyYWdFbmQsXHJcbiAgICAgIG9uTW91c2VPdmVyLFxyXG4gICAgICBvbk1vdXNlT3V0LFxyXG4gICAgICBlbmNvZGVkUGF0aHMsXHJcbiAgICAgIC4uLnBvbHlnb25PcHRpb25zXHJcbiAgICB9ID0gcHJvcHM7XHJcbiAgICAvLyBUaGlzIGlzIGhlcmUgdG8gYXZvaWQgdHJpZ2dlcmluZyB0aGUgdXNlRWZmZWN0IGJlbG93IHdoZW4gdGhlIGNhbGxiYWNrcyBjaGFuZ2UgKHdoaWNoIGhhcHBlbiBpZiB0aGUgdXNlciBkaWRuJ3QgbWVtb2l6ZSB0aGVtKVxyXG4gICAgY29uc3QgY2FsbGJhY2tzID0gdXNlUmVmPFJlY29yZDxzdHJpbmcsIChlOiB1bmtub3duKSA9PiB2b2lkPj4oe30pO1xyXG4gICAgT2JqZWN0LmFzc2lnbihjYWxsYmFja3MuY3VycmVudCwge1xyXG4gICAgICBvbkNsaWNrLFxyXG4gICAgICBvbkRyYWcsXHJcbiAgICAgIG9uRHJhZ1N0YXJ0LFxyXG4gICAgICBvbkRyYWdFbmQsXHJcbiAgICAgIG9uTW91c2VPdmVyLFxyXG4gICAgICBvbk1vdXNlT3V0LFxyXG4gICAgfSk7XHJcbiAgXHJcbiAgICBjb25zdCBnZW9tZXRyeUxpYnJhcnkgPSB1c2VNYXBzTGlicmFyeSgnZ2VvbWV0cnknKTtcclxuICBcclxuICAgIGNvbnN0IHBvbHlnb24gPSB1c2VSZWYobmV3IGdvb2dsZS5tYXBzLlBvbHlnb24oKSkuY3VycmVudDtcclxuICAgIC8vIHVwZGF0ZSBQb2x5Z29uT3B0aW9ucyAobm90ZSB0aGUgZGVwZW5kZW5jaWVzIGFyZW4ndCBwcm9wZXJseSBjaGVja2VkXHJcbiAgICAvLyBoZXJlLCB3ZSBqdXN0IGFzc3VtZSB0aGF0IHNldE9wdGlvbnMgaXMgc21hcnQgZW5vdWdoIHRvIG5vdCB3YXN0ZSBhXHJcbiAgICAvLyBsb3Qgb2YgdGltZSB1cGRhdGluZyB2YWx1ZXMgdGhhdCBkaWRuJ3QgY2hhbmdlKVxyXG4gICAgdXNlTWVtbygoKSA9PiB7XHJcbiAgICAgIHBvbHlnb24uc2V0T3B0aW9ucyhwb2x5Z29uT3B0aW9ucyk7XHJcbiAgICB9LCBbcG9seWdvbiwgcG9seWdvbk9wdGlvbnNdKTtcclxuICBcclxuICAgIGNvbnN0IG1hcCA9IHVzZUNvbnRleHQoR29vZ2xlTWFwc0NvbnRleHQpPy5tYXA7XHJcbiAgXHJcbiAgICAvLyB1cGRhdGUgdGhlIHBhdGggd2l0aCB0aGUgZW5jb2RlZFBhdGhcclxuICAgIHVzZU1lbW8oKCkgPT4ge1xyXG4gICAgICBpZiAoIWVuY29kZWRQYXRocyB8fCAhZ2VvbWV0cnlMaWJyYXJ5KSByZXR1cm47XHJcbiAgICAgIGNvbnN0IHBhdGhzID0gZW5jb2RlZFBhdGhzLm1hcChwYXRoID0+e1xyXG4gICAgICAgIGdlb21ldHJ5TGlicmFyeS5lbmNvZGluZy5kZWNvZGVQYXRoKHBhdGgpfVxyXG4gICAgICApO1xyXG4gICAgICBjb25zb2xlLmxvZygncGF0aHMnLCBwYXRocyk7XHJcbiAgICAgIHBvbHlnb24uc2V0UGF0aHMocGF0aHMpO1xyXG4gICAgfSwgW3BvbHlnb24sIGVuY29kZWRQYXRocywgZ2VvbWV0cnlMaWJyYXJ5XSk7XHJcbiAgXHJcbiAgICAvLyBjcmVhdGUgcG9seWdvbiBpbnN0YW5jZSBhbmQgYWRkIHRvIHRoZSBtYXAgb25jZSB0aGUgbWFwIGlzIGF2YWlsYWJsZVxyXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcclxuICAgICAgaWYgKCFtYXApIHtcclxuICAgICAgICBpZiAobWFwID09PSB1bmRlZmluZWQpXHJcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCc8UG9seWdvbj4gaGFzIHRvIGJlIGluc2lkZSBhIE1hcCBjb21wb25lbnQuJyk7XHJcbiAgXHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgXHJcbiAgICAgIHBvbHlnb24uc2V0TWFwKG1hcCk7XHJcbiAgXHJcbiAgICAgIHJldHVybiAoKSA9PiB7XHJcbiAgICAgICAgcG9seWdvbi5zZXRNYXAobnVsbCk7XHJcbiAgICAgIH07XHJcbiAgICB9LCBbbWFwXSk7XHJcbiAgXHJcbiAgICAvLyBhdHRhY2ggYW5kIHJlLWF0dGFjaCBldmVudC1oYW5kbGVycyB3aGVuIGFueSBvZiB0aGUgcHJvcGVydGllcyBjaGFuZ2VcclxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICAgIGlmICghcG9seWdvbikgcmV0dXJuO1xyXG4gIFxyXG4gICAgICAvLyBBZGQgZXZlbnQgbGlzdGVuZXJzXHJcbiAgICAgIGNvbnN0IGdtZSA9IGdvb2dsZS5tYXBzLmV2ZW50O1xyXG4gICAgICBbXHJcbiAgICAgICAgWydjbGljaycsICdvbkNsaWNrJ10sXHJcbiAgICAgICAgWydkcmFnJywgJ29uRHJhZyddLFxyXG4gICAgICAgIFsnZHJhZ3N0YXJ0JywgJ29uRHJhZ1N0YXJ0J10sXHJcbiAgICAgICAgWydkcmFnZW5kJywgJ29uRHJhZ0VuZCddLFxyXG4gICAgICAgIFsnbW91c2VvdmVyJywgJ29uTW91c2VPdmVyJ10sXHJcbiAgICAgICAgWydtb3VzZW91dCcsICdvbk1vdXNlT3V0J10sXHJcbiAgICAgIF0uZm9yRWFjaCgoW2V2ZW50TmFtZSwgZXZlbnRDYWxsYmFja10pID0+IHtcclxuICAgICAgICBnbWUuYWRkTGlzdGVuZXIocG9seWdvbiwgZXZlbnROYW1lLCAoZTogZ29vZ2xlLm1hcHMuTWFwTW91c2VFdmVudCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgY2FsbGJhY2sgPSBjYWxsYmFja3MuY3VycmVudFtldmVudENhbGxiYWNrXTtcclxuICAgICAgICAgIGlmIChjYWxsYmFjaykgY2FsbGJhY2soZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0pO1xyXG4gIFxyXG4gICAgICByZXR1cm4gKCkgPT4ge1xyXG4gICAgICAgIGdtZS5jbGVhckluc3RhbmNlTGlzdGVuZXJzKHBvbHlnb24pO1xyXG4gICAgICB9O1xyXG4gICAgfSwgW3BvbHlnb25dKTtcclxuICBcclxuICAgIHJldHVybiBwb2x5Z29uO1xyXG4gIH1cclxuICBcclxuICAvKipcclxuICAgKiBDb21wb25lbnQgdG8gcmVuZGVyIGEgR29vZ2xlIE1hcHMgcG9seWdvbiBvbiBhIG1hcFxyXG4gICAqL1xyXG4gIGV4cG9ydCBjb25zdCBQb2x5Z29uID0gZm9yd2FyZFJlZigocHJvcHM6IFBvbHlnb25Qcm9wcywgcmVmOiBQb2x5Z29uUmVmKSA9PiB7XHJcbiAgICBjb25zdCBwb2x5Z29uID0gdXNlUG9seWdvbihwcm9wcyk7XHJcbiAgXHJcbiAgICB1c2VJbXBlcmF0aXZlSGFuZGxlKHJlZiwgKCkgPT4gcG9seWdvbiwgW10pO1xyXG4gIFxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfSk7Il0sIm5hbWVzIjpbImZvcndhcmRSZWYiLCJ1c2VDb250ZXh0IiwidXNlRWZmZWN0IiwidXNlSW1wZXJhdGl2ZUhhbmRsZSIsInVzZU1lbW8iLCJ1c2VSZWYiLCJHb29nbGVNYXBzQ29udGV4dCIsInVzZU1hcHNMaWJyYXJ5IiwidXNlUG9seWdvbiIsInByb3BzIiwib25DbGljayIsIm9uRHJhZyIsIm9uRHJhZ1N0YXJ0Iiwib25EcmFnRW5kIiwib25Nb3VzZU92ZXIiLCJvbk1vdXNlT3V0IiwiZW5jb2RlZFBhdGhzIiwicG9seWdvbk9wdGlvbnMiLCJjYWxsYmFja3MiLCJPYmplY3QiLCJhc3NpZ24iLCJjdXJyZW50IiwiZ2VvbWV0cnlMaWJyYXJ5IiwicG9seWdvbiIsImdvb2dsZSIsIm1hcHMiLCJQb2x5Z29uIiwic2V0T3B0aW9ucyIsIm1hcCIsInBhdGhzIiwicGF0aCIsImVuY29kaW5nIiwiZGVjb2RlUGF0aCIsImNvbnNvbGUiLCJsb2ciLCJzZXRQYXRocyIsInVuZGVmaW5lZCIsImVycm9yIiwic2V0TWFwIiwiZ21lIiwiZXZlbnQiLCJmb3JFYWNoIiwiZXZlbnROYW1lIiwiZXZlbnRDYWxsYmFjayIsImFkZExpc3RlbmVyIiwiZSIsImNhbGxiYWNrIiwiY2xlYXJJbnN0YW5jZUxpc3RlbmVycyIsInJlZiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/ui/dashboard/map/Polygon.tsx\n"));

/***/ })

});