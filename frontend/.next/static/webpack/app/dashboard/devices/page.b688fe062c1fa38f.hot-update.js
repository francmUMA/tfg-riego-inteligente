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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   getDevices: function() { return /* binding */ getDevices; }\n/* harmony export */ });\nasync function getDevices(token) {\n    let options = {\n        method: \"GET\",\n        headers: {\n            \"Authorization\": \"Bearer \" + token\n        }\n    };\n    let request = await fetch(\"http://192.168.1.133:3000/api/devices\", options);\n    if (request.status == 200) {\n        let response = await request.json();\n        response.map((device)=>{\n            let info = {\n                id: response.id,\n                ip: response.ip,\n                available: response.available,\n                Latitud: response.Latitud,\n                Longitud: response.Longitud,\n                showData: false\n            };\n            return info;\n        });\n        return response;\n    } else {\n        return undefined;\n    }\n}\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvbGliL2RldmljZXNJbmZvLnRzIiwibWFwcGluZ3MiOiI7Ozs7QUFBTyxlQUFlQSxXQUFZQyxLQUFhO0lBQzNDLElBQUlDLFVBQVU7UUFDVkMsUUFBUTtRQUNSQyxTQUFTO1lBQ0wsaUJBQWlCLFlBQVlIO1FBQ2pDO0lBQ0o7SUFDQSxJQUFJSSxVQUFVLE1BQU1DLE1BQU0seUNBQXlDSjtJQUNuRSxJQUFJRyxRQUFRRSxNQUFNLElBQUksS0FBSztRQUN2QixJQUFJQyxXQUFXLE1BQU1ILFFBQVFJLElBQUk7UUFDakNELFNBQVNFLEdBQUcsQ0FBQyxDQUFDQztZQUNWLElBQUlDLE9BQU87Z0JBQ1BDLElBQUlMLFNBQVNLLEVBQUU7Z0JBQ2ZDLElBQUlOLFNBQVNNLEVBQUU7Z0JBQ2ZDLFdBQVdQLFNBQVNPLFNBQVM7Z0JBQzdCQyxTQUFTUixTQUFTUSxPQUFPO2dCQUN6QkMsVUFBVVQsU0FBU1MsUUFBUTtnQkFDM0JDLFVBQVU7WUFDZDtZQUNBLE9BQU9OO1FBQ1g7UUFFQSxPQUFPSjtJQUNYLE9BQU87UUFDSCxPQUFPVztJQUNYO0FBQ0oiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2FwcC9saWIvZGV2aWNlc0luZm8udHM/ZWRmNiJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0RGV2aWNlcyAodG9rZW46IHN0cmluZykge1xuICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6ICdCZWFyZXIgJyArIHRva2VuXG4gICAgICAgIH1cbiAgICB9XG4gICAgbGV0IHJlcXVlc3QgPSBhd2FpdCBmZXRjaChcImh0dHA6Ly8xOTIuMTY4LjEuMTMzOjMwMDAvYXBpL2RldmljZXNcIiwgb3B0aW9ucylcbiAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT0gMjAwKSB7XG4gICAgICAgIGxldCByZXNwb25zZSA9IGF3YWl0IHJlcXVlc3QuanNvbigpXG4gICAgICAgIHJlc3BvbnNlLm1hcCgoZGV2aWNlOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGxldCBpbmZvID0ge1xuICAgICAgICAgICAgICAgIGlkOiByZXNwb25zZS5pZCxcbiAgICAgICAgICAgICAgICBpcDogcmVzcG9uc2UuaXAsXG4gICAgICAgICAgICAgICAgYXZhaWxhYmxlOiByZXNwb25zZS5hdmFpbGFibGUsXG4gICAgICAgICAgICAgICAgTGF0aXR1ZDogcmVzcG9uc2UuTGF0aXR1ZCxcbiAgICAgICAgICAgICAgICBMb25naXR1ZDogcmVzcG9uc2UuTG9uZ2l0dWQsXG4gICAgICAgICAgICAgICAgc2hvd0RhdGE6IGZhbHNlXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gaW5mb1xuICAgICAgICB9XG4gICAgICAgIClcbiAgICAgICAgcmV0dXJuIHJlc3BvbnNlXG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZFxuICAgIH1cbn0iXSwibmFtZXMiOlsiZ2V0RGV2aWNlcyIsInRva2VuIiwib3B0aW9ucyIsIm1ldGhvZCIsImhlYWRlcnMiLCJyZXF1ZXN0IiwiZmV0Y2giLCJzdGF0dXMiLCJyZXNwb25zZSIsImpzb24iLCJtYXAiLCJkZXZpY2UiLCJpbmZvIiwiaWQiLCJpcCIsImF2YWlsYWJsZSIsIkxhdGl0dWQiLCJMb25naXR1ZCIsInNob3dEYXRhIiwidW5kZWZpbmVkIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/lib/devicesInfo.ts\n"));

/***/ })

});