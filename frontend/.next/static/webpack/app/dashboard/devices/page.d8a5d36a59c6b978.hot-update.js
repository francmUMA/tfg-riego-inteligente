"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/dashboard/devices/page",{

/***/ "(app-pages-browser)/./src/app/lib/devicesInfo.ts":
/*!************************************!*\
  !*** ./src/app/lib/devicesInfo.ts ***!
  \************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getDevices: function() { return /* binding */ getDevices; }\n/* harmony export */ });\nasync function getDevices(token) {\n    let options = {\n        method: \"GET\",\n        headers: {\n            \"Authorization\": \"Bearer \" + token\n        }\n    };\n    let request = await fetch(\"http://192.168.1.133:3000/api/devices\", options);\n    if (request.status == 200) {\n        let response = await request.json();\n        let device = {\n            id: response.id,\n            ip: response.ip,\n            available: response.available,\n            Latitud: response.Latitud,\n            Longitud: response.Longitud,\n            showData: false\n        };\n        return response;\n    } else {\n        return undefined;\n    }\n}\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvbGliL2RldmljZXNJbmZvLnRzIiwibWFwcGluZ3MiOiI7Ozs7QUFBTyxlQUFlQSxXQUFZQyxLQUFhO0lBQzNDLElBQUlDLFVBQVU7UUFDVkMsUUFBUTtRQUNSQyxTQUFTO1lBQ0wsaUJBQWlCLFlBQVlIO1FBQ2pDO0lBQ0o7SUFDQSxJQUFJSSxVQUFVLE1BQU1DLE1BQU0seUNBQXlDSjtJQUNuRSxJQUFJRyxRQUFRRSxNQUFNLElBQUksS0FBSztRQUN2QixJQUFJQyxXQUFXLE1BQU1ILFFBQVFJLElBQUk7UUFDakMsSUFBSUMsU0FBUztZQUNUQyxJQUFJSCxTQUFTRyxFQUFFO1lBQ2ZDLElBQUlKLFNBQVNJLEVBQUU7WUFDZkMsV0FBV0wsU0FBU0ssU0FBUztZQUM3QkMsU0FBU04sU0FBU00sT0FBTztZQUN6QkMsVUFBVVAsU0FBU08sUUFBUTtZQUMzQkMsVUFBVTtRQUNkO1FBQ0EsT0FBT1I7SUFDWCxPQUFPO1FBQ0gsT0FBT1M7SUFDWDtBQUNKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9hcHAvbGliL2RldmljZXNJbmZvLnRzP2VkZjYiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldERldmljZXMgKHRva2VuOiBzdHJpbmcpIHtcbiAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiAnQmVhcmVyICcgKyB0b2tlblxuICAgICAgICB9XG4gICAgfVxuICAgIGxldCByZXF1ZXN0ID0gYXdhaXQgZmV0Y2goXCJodHRwOi8vMTkyLjE2OC4xLjEzMzozMDAwL2FwaS9kZXZpY2VzXCIsIG9wdGlvbnMpXG4gICAgaWYgKHJlcXVlc3Quc3RhdHVzID09IDIwMCkge1xuICAgICAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCByZXF1ZXN0Lmpzb24oKVxuICAgICAgICBsZXQgZGV2aWNlID0ge1xuICAgICAgICAgICAgaWQ6IHJlc3BvbnNlLmlkLFxuICAgICAgICAgICAgaXA6IHJlc3BvbnNlLmlwLFxuICAgICAgICAgICAgYXZhaWxhYmxlOiByZXNwb25zZS5hdmFpbGFibGUsXG4gICAgICAgICAgICBMYXRpdHVkOiByZXNwb25zZS5MYXRpdHVkLFxuICAgICAgICAgICAgTG9uZ2l0dWQ6IHJlc3BvbnNlLkxvbmdpdHVkLFxuICAgICAgICAgICAgc2hvd0RhdGE6IGZhbHNlXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlXG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgIH1cbn0iXSwibmFtZXMiOlsiZ2V0RGV2aWNlcyIsInRva2VuIiwib3B0aW9ucyIsIm1ldGhvZCIsImhlYWRlcnMiLCJyZXF1ZXN0IiwiZmV0Y2giLCJzdGF0dXMiLCJyZXNwb25zZSIsImpzb24iLCJkZXZpY2UiLCJpZCIsImlwIiwiYXZhaWxhYmxlIiwiTGF0aXR1ZCIsIkxvbmdpdHVkIiwic2hvd0RhdGEiLCJ1bmRlZmluZWQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/lib/devicesInfo.ts\n"));

/***/ })

});