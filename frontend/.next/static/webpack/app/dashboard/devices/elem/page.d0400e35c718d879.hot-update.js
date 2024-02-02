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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Page; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _src_app_lib_token__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/src/app/lib/token */ \"(app-pages-browser)/./src/app/lib/token.ts\");\n/* harmony import */ var cookies_next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cookies-next */ \"(app-pages-browser)/./node_modules/cookies-next/lib/index.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/dist/api/navigation.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\nfunction Page() {\n    _s();\n    const [deviceId, setDeviceId] = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(null);\n    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_3__.useRouter)();\n    (0,react__WEBPACK_IMPORTED_MODULE_4__.useEffect)(()=>{\n        const verifyToken = async (token)=>{\n            let res = await (0,_src_app_lib_token__WEBPACK_IMPORTED_MODULE_1__.checkToken)(token);\n            if (!res) {\n                router.push(\"/login\");\n            }\n        };\n        // Verificar el token de autenticación\n        const token = (0,cookies_next__WEBPACK_IMPORTED_MODULE_2__.getCookie)(\"token\");\n        if (token === undefined) {\n            router.push(\"/login\");\n        }\n        verifyToken(token);\n        // Recuperar el identificador del dispositivo de la URL\n        const url = new URL(window.location.href);\n        let id = url.searchParams.get(\"id\");\n        if (id === null) {\n            router.push(\"/dashboard/devices\");\n        }\n        setDeviceId(id);\n    });\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n        className: \"grid grid-rows-2\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"flex flex-row justify-between bg-red-50\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        className: \"shadow-md rounded-md h-12 w-12 flex justify-center items-center border hover:bg-gray-100 duration-150\",\n                        children: \"Actualizar\"\n                    }, void 0, false, {\n                        fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/elem/page.tsx\",\n                        lineNumber: 40,\n                        columnNumber: 17\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        className: \"shadow-md rounded-md h-12 w-12 flex justify-center items-center border hover:bg-gray-100 duration-150\",\n                        children: \"Eliminar\"\n                    }, void 0, false, {\n                        fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/elem/page.tsx\",\n                        lineNumber: 41,\n                        columnNumber: 17\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        children: \"Atras\"\n                    }, void 0, false, {\n                        fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/elem/page.tsx\",\n                        lineNumber: 42,\n                        columnNumber: 17\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/elem/page.tsx\",\n                lineNumber: 39,\n                columnNumber: 13\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"w-full h-full bg-green-50\"\n            }, void 0, false, {\n                fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/elem/page.tsx\",\n                lineNumber: 45,\n                columnNumber: 13\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/elem/page.tsx\",\n        lineNumber: 38,\n        columnNumber: 9\n    }, this);\n}\n_s(Page, \"uVmspeFbbkAwnqOY67DXM9xKfZM=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_3__.useRouter\n    ];\n});\n_c = Page;\nvar _c;\n$RefreshReg$(_c, \"Page\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvZGFzaGJvYXJkL2RldmljZXMvZWxlbS9wYWdlLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDaUQ7QUFDUjtBQUNHO0FBQ0E7QUFFN0IsU0FBU0s7O0lBQ3BCLE1BQU0sQ0FBQ0MsVUFBVUMsWUFBWSxHQUFHSCwrQ0FBUUEsQ0FBZ0I7SUFFeEQsTUFBTUksU0FBU04sMERBQVNBO0lBRXhCQyxnREFBU0EsQ0FBQztRQUNOLE1BQU1NLGNBQWMsT0FBT0M7WUFDdkIsSUFBSUMsTUFBTSxNQUFNWCw4REFBVUEsQ0FBQ1U7WUFDM0IsSUFBSSxDQUFDQyxLQUFLO2dCQUNOSCxPQUFPSSxJQUFJLENBQUM7WUFDaEI7UUFDSjtRQUVBLHNDQUFzQztRQUN0QyxNQUFNRixRQUFRVCx1REFBU0EsQ0FBQztRQUN4QixJQUFJUyxVQUFVRyxXQUFXO1lBQ3JCTCxPQUFPSSxJQUFJLENBQUM7UUFDaEI7UUFDQUgsWUFBWUM7UUFHWix1REFBdUQ7UUFDdkQsTUFBTUksTUFBTSxJQUFJQyxJQUFJQyxPQUFPQyxRQUFRLENBQUNDLElBQUk7UUFDeEMsSUFBSUMsS0FBS0wsSUFBSU0sWUFBWSxDQUFDQyxHQUFHLENBQUM7UUFDOUIsSUFBSUYsT0FBTyxNQUFNO1lBQ2JYLE9BQU9JLElBQUksQ0FBQztRQUNoQjtRQUNBTCxZQUFZWTtJQUNoQjtJQUVBLHFCQUNJLDhEQUFDRztRQUFLQyxXQUFVOzswQkFDWiw4REFBQ0M7Z0JBQUlELFdBQVU7O2tDQUNYLDhEQUFDRTt3QkFBT0YsV0FBWTtrQ0FBd0c7Ozs7OztrQ0FDNUgsOERBQUNFO3dCQUFPRixXQUFZO2tDQUF3Rzs7Ozs7O2tDQUM1SCw4REFBQ0U7a0NBQU87Ozs7Ozs7Ozs7OzswQkFHWiw4REFBQ0Q7Z0JBQUlELFdBQVU7Ozs7Ozs7Ozs7OztBQU0zQjtHQTVDd0JsQjs7UUFHTEgsc0RBQVNBOzs7S0FISkciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2FwcC9kYXNoYm9hcmQvZGV2aWNlcy9lbGVtL3BhZ2UudHN4P2VhNDQiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBjbGllbnQnXG5pbXBvcnQgeyBjaGVja1Rva2VuIH0gZnJvbSBcIkAvc3JjL2FwcC9saWIvdG9rZW5cIjtcbmltcG9ydCB7IGdldENvb2tpZSB9IGZyb20gXCJjb29raWVzLW5leHRcIjtcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gXCJuZXh0L25hdmlnYXRpb25cIjtcbmltcG9ydCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUGFnZSgpIHtcbiAgICBjb25zdCBbZGV2aWNlSWQsIHNldERldmljZUlkXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuICAgIFxuICAgIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgY29uc3QgdmVyaWZ5VG9rZW4gPSBhc3luYyAodG9rZW46IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgbGV0IHJlcyA9IGF3YWl0IGNoZWNrVG9rZW4odG9rZW4pXG4gICAgICAgICAgICBpZiAoIXJlcykge1xuICAgICAgICAgICAgICAgIHJvdXRlci5wdXNoKFwiL2xvZ2luXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gVmVyaWZpY2FyIGVsIHRva2VuIGRlIGF1dGVudGljYWNpw7NuXG4gICAgICAgIGNvbnN0IHRva2VuID0gZ2V0Q29va2llKFwidG9rZW5cIik7XG4gICAgICAgIGlmICh0b2tlbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByb3V0ZXIucHVzaChcIi9sb2dpblwiKTtcbiAgICAgICAgfVxuICAgICAgICB2ZXJpZnlUb2tlbih0b2tlbiBhcyBzdHJpbmcpO1xuICAgICAgICBcblxuICAgICAgICAvLyBSZWN1cGVyYXIgZWwgaWRlbnRpZmljYWRvciBkZWwgZGlzcG9zaXRpdm8gZGUgbGEgVVJMXG4gICAgICAgIGNvbnN0IHVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICAgICAgICBsZXQgaWQgPSB1cmwuc2VhcmNoUGFyYW1zLmdldChcImlkXCIpO1xuICAgICAgICBpZiAoaWQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJvdXRlci5wdXNoKFwiL2Rhc2hib2FyZC9kZXZpY2VzXCIpO1xuICAgICAgICB9XG4gICAgICAgIHNldERldmljZUlkKGlkKTtcbiAgICB9KVxuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPG1haW4gY2xhc3NOYW1lPVwiZ3JpZCBncmlkLXJvd3MtMlwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtcm93IGp1c3RpZnktYmV0d2VlbiBiZy1yZWQtNTBcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17YHNoYWRvdy1tZCByb3VuZGVkLW1kIGgtMTIgdy0xMiBmbGV4IGp1c3RpZnktY2VudGVyIGl0ZW1zLWNlbnRlciBib3JkZXIgaG92ZXI6YmctZ3JheS0xMDAgZHVyYXRpb24tMTUwYH0+QWN0dWFsaXphcjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtgc2hhZG93LW1kIHJvdW5kZWQtbWQgaC0xMiB3LTEyIGZsZXgganVzdGlmeS1jZW50ZXIgaXRlbXMtY2VudGVyIGJvcmRlciBob3ZlcjpiZy1ncmF5LTEwMCBkdXJhdGlvbi0xNTBgfT5FbGltaW5hcjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDxidXR0b24+QXRyYXM8L2J1dHRvbj5cblxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBoLWZ1bGwgYmctZ3JlZW4tNTBcIj5cblxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPC9tYWluPlxuICAgICk7XG59Il0sIm5hbWVzIjpbImNoZWNrVG9rZW4iLCJnZXRDb29raWUiLCJ1c2VSb3V0ZXIiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsIlBhZ2UiLCJkZXZpY2VJZCIsInNldERldmljZUlkIiwicm91dGVyIiwidmVyaWZ5VG9rZW4iLCJ0b2tlbiIsInJlcyIsInB1c2giLCJ1bmRlZmluZWQiLCJ1cmwiLCJVUkwiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJpZCIsInNlYXJjaFBhcmFtcyIsImdldCIsIm1haW4iLCJjbGFzc05hbWUiLCJkaXYiLCJidXR0b24iXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/dashboard/devices/elem/page.tsx\n"));

/***/ })

});