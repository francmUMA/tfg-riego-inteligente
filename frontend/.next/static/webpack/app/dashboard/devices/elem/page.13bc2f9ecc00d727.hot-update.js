"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/dashboard/devices/elem/page",{

/***/ "(app-pages-browser)/./src/app/dashboard/devices/elem/page.tsx":
/*!*************************************************!*\
  !*** ./src/app/dashboard/devices/elem/page.tsx ***!
  \*************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Page; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _src_app_lib_token__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/src/app/lib/token */ \"(app-pages-browser)/./src/app/lib/token.ts\");\n/* harmony import */ var cookies_next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cookies-next */ \"(app-pages-browser)/./node_modules/cookies-next/lib/index.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/dist/api/navigation.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\nfunction Page() {\n    _s();\n    const [deviceId, setDeviceId] = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(null);\n    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_3__.useRouter)();\n    (0,react__WEBPACK_IMPORTED_MODULE_4__.useEffect)(()=>{\n        const verifyToken = async (token)=>{\n            let res = await (0,_src_app_lib_token__WEBPACK_IMPORTED_MODULE_1__.checkToken)(token);\n            if (!res) {\n                router.push(\"/login\");\n            }\n        };\n        // Verificar el token de autenticación\n        const token = (0,cookies_next__WEBPACK_IMPORTED_MODULE_2__.getCookie)(\"token\");\n        if (token === undefined) {\n            router.push(\"/login\");\n        }\n        verifyToken(token);\n        // Recuperar el identificador del dispositivo de la URL\n        const url = new URL(window.location.href);\n        let id = url.searchParams.get(\"id\");\n        if (id === null) {\n            router.push(\"/dashboard/devices\");\n        }\n        setDeviceId(id);\n    });\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"w-full h-full grid grid-rows-2\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                            className: \"shadow-md rounded-md h-12 w-12 flex justify-center items-center border hover:bg-gray-100 duration-150\",\n                            children: \"Actualizar\"\n                        }, void 0, false, {\n                            fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/elem/page.tsx\",\n                            lineNumber: 41,\n                            columnNumber: 21\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                            className: \"shadow-md rounded-md h-12 w-12 flex justify-center items-center border hover:bg-gray-100 duration-150\",\n                            children: \"Eliminar\"\n                        }, void 0, false, {\n                            fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/elem/page.tsx\",\n                            lineNumber: 42,\n                            columnNumber: 21\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                            className: \"shadow-md rounded-md h-12 w-12 flex justify-center items-center border hover:bg-gray-100 duration-150\",\n                            children: \"Atras\"\n                        }, void 0, false, {\n                            fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/elem/page.tsx\",\n                            lineNumber: 43,\n                            columnNumber: 21\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/elem/page.tsx\",\n                    lineNumber: 40,\n                    columnNumber: 17\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"w-full h-full bg-green-50\"\n                }, void 0, false, {\n                    fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/elem/page.tsx\",\n                    lineNumber: 45,\n                    columnNumber: 17\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/elem/page.tsx\",\n            lineNumber: 39,\n            columnNumber: 13\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/elem/page.tsx\",\n        lineNumber: 38,\n        columnNumber: 9\n    }, this);\n}\n_s(Page, \"uVmspeFbbkAwnqOY67DXM9xKfZM=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_3__.useRouter\n    ];\n});\n_c = Page;\nvar _c;\n$RefreshReg$(_c, \"Page\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvZGFzaGJvYXJkL2RldmljZXMvZWxlbS9wYWdlLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDaUQ7QUFDUjtBQUNHO0FBQ0E7QUFFN0IsU0FBU0s7O0lBQ3BCLE1BQU0sQ0FBQ0MsVUFBVUMsWUFBWSxHQUFHSCwrQ0FBUUEsQ0FBZ0I7SUFFeEQsTUFBTUksU0FBU04sMERBQVNBO0lBRXhCQyxnREFBU0EsQ0FBQztRQUNOLE1BQU1NLGNBQWMsT0FBT0M7WUFDdkIsSUFBSUMsTUFBTSxNQUFNWCw4REFBVUEsQ0FBQ1U7WUFDM0IsSUFBSSxDQUFDQyxLQUFLO2dCQUNOSCxPQUFPSSxJQUFJLENBQUM7WUFDaEI7UUFDSjtRQUVBLHNDQUFzQztRQUN0QyxNQUFNRixRQUFRVCx1REFBU0EsQ0FBQztRQUN4QixJQUFJUyxVQUFVRyxXQUFXO1lBQ3JCTCxPQUFPSSxJQUFJLENBQUM7UUFDaEI7UUFDQUgsWUFBWUM7UUFHWix1REFBdUQ7UUFDdkQsTUFBTUksTUFBTSxJQUFJQyxJQUFJQyxPQUFPQyxRQUFRLENBQUNDLElBQUk7UUFDeEMsSUFBSUMsS0FBS0wsSUFBSU0sWUFBWSxDQUFDQyxHQUFHLENBQUM7UUFDOUIsSUFBSUYsT0FBTyxNQUFNO1lBQ2JYLE9BQU9JLElBQUksQ0FBQztRQUNoQjtRQUNBTCxZQUFZWTtJQUNoQjtJQUVBLHFCQUNJLDhEQUFDRztrQkFDRyw0RUFBQ0M7WUFBSUMsV0FBVTs7OEJBQ1gsOERBQUNEO29CQUFJQyxXQUFVOztzQ0FDWCw4REFBQ0M7NEJBQU9ELFdBQVk7c0NBQXdHOzs7Ozs7c0NBQzVILDhEQUFDQzs0QkFBT0QsV0FBWTtzQ0FBd0c7Ozs7OztzQ0FDNUgsOERBQUNDOzRCQUFPRCxXQUFZO3NDQUF3Rzs7Ozs7Ozs7Ozs7OzhCQUVoSSw4REFBQ0Q7b0JBQUlDLFdBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBSy9CO0dBM0N3Qm5COztRQUdMSCxzREFBU0E7OztLQUhKRyIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvYXBwL2Rhc2hib2FyZC9kZXZpY2VzL2VsZW0vcGFnZS50c3g/ZWE0NCJdLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGNsaWVudCdcbmltcG9ydCB7IGNoZWNrVG9rZW4gfSBmcm9tIFwiQC9zcmMvYXBwL2xpYi90b2tlblwiO1xuaW1wb3J0IHsgZ2V0Q29va2llIH0gZnJvbSBcImNvb2tpZXMtbmV4dFwiO1xuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSBcIm5leHQvbmF2aWdhdGlvblwiO1xuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBQYWdlKCkge1xuICAgIGNvbnN0IFtkZXZpY2VJZCwgc2V0RGV2aWNlSWRdID0gdXNlU3RhdGU8c3RyaW5nIHwgbnVsbD4obnVsbCk7XG4gICAgXG4gICAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG5cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBjb25zdCB2ZXJpZnlUb2tlbiA9IGFzeW5jICh0b2tlbjogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBsZXQgcmVzID0gYXdhaXQgY2hlY2tUb2tlbih0b2tlbilcbiAgICAgICAgICAgIGlmICghcmVzKSB7XG4gICAgICAgICAgICAgICAgcm91dGVyLnB1c2goXCIvbG9naW5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBWZXJpZmljYXIgZWwgdG9rZW4gZGUgYXV0ZW50aWNhY2nDs25cbiAgICAgICAgY29uc3QgdG9rZW4gPSBnZXRDb29raWUoXCJ0b2tlblwiKTtcbiAgICAgICAgaWYgKHRva2VuID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJvdXRlci5wdXNoKFwiL2xvZ2luXCIpO1xuICAgICAgICB9XG4gICAgICAgIHZlcmlmeVRva2VuKHRva2VuIGFzIHN0cmluZyk7XG4gICAgICAgIFxuXG4gICAgICAgIC8vIFJlY3VwZXJhciBlbCBpZGVudGlmaWNhZG9yIGRlbCBkaXNwb3NpdGl2byBkZSBsYSBVUkxcbiAgICAgICAgY29uc3QgdXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gICAgICAgIGxldCBpZCA9IHVybC5zZWFyY2hQYXJhbXMuZ2V0KFwiaWRcIik7XG4gICAgICAgIGlmIChpZCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcm91dGVyLnB1c2goXCIvZGFzaGJvYXJkL2RldmljZXNcIik7XG4gICAgICAgIH1cbiAgICAgICAgc2V0RGV2aWNlSWQoaWQpO1xuICAgIH0pXG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8bWFpbj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIGgtZnVsbCBncmlkIGdyaWQtcm93cy0yXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e2BzaGFkb3ctbWQgcm91bmRlZC1tZCBoLTEyIHctMTIgZmxleCBqdXN0aWZ5LWNlbnRlciBpdGVtcy1jZW50ZXIgYm9yZGVyIGhvdmVyOmJnLWdyYXktMTAwIGR1cmF0aW9uLTE1MGB9PkFjdHVhbGl6YXI8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e2BzaGFkb3ctbWQgcm91bmRlZC1tZCBoLTEyIHctMTIgZmxleCBqdXN0aWZ5LWNlbnRlciBpdGVtcy1jZW50ZXIgYm9yZGVyIGhvdmVyOmJnLWdyYXktMTAwIGR1cmF0aW9uLTE1MGB9PkVsaW1pbmFyPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtgc2hhZG93LW1kIHJvdW5kZWQtbWQgaC0xMiB3LTEyIGZsZXgganVzdGlmeS1jZW50ZXIgaXRlbXMtY2VudGVyIGJvcmRlciBob3ZlcjpiZy1ncmF5LTEwMCBkdXJhdGlvbi0xNTBgfT5BdHJhczwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIGgtZnVsbCBiZy1ncmVlbi01MFwiPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvbWFpbj5cbiAgICApO1xufSJdLCJuYW1lcyI6WyJjaGVja1Rva2VuIiwiZ2V0Q29va2llIiwidXNlUm91dGVyIiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJQYWdlIiwiZGV2aWNlSWQiLCJzZXREZXZpY2VJZCIsInJvdXRlciIsInZlcmlmeVRva2VuIiwidG9rZW4iLCJyZXMiLCJwdXNoIiwidW5kZWZpbmVkIiwidXJsIiwiVVJMIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwiaWQiLCJzZWFyY2hQYXJhbXMiLCJnZXQiLCJtYWluIiwiZGl2IiwiY2xhc3NOYW1lIiwiYnV0dG9uIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/dashboard/devices/elem/page.tsx\n"));

/***/ })

});