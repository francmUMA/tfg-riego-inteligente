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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Page; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var cookies_next__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! cookies-next */ \"(app-pages-browser)/./node_modules/cookies-next/lib/index.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/dist/api/navigation.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\nfunction Page() {\n    _s();\n    const [deviceId, setDeviceId] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(null);\n    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{\n        const verifyToken = async (token)=>{};\n        // Verificar el token de autenticación\n        const token = (0,cookies_next__WEBPACK_IMPORTED_MODULE_1__.getCookie)(\"token\");\n        if (token === undefined) {\n            router.push(\"/login\");\n        }\n        // Recuperar el identificador del dispositivo de la URL\n        const url = new URL(window.location.href);\n        let id = url.searchParams.get(\"id\");\n        if (id === null) {\n            router.push(\"/dashboard/devices\");\n        }\n        setDeviceId(id);\n    });\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n            children: [\n                \"Device \",\n                deviceId,\n                \" page\"\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/elem/page.tsx\",\n            lineNumber: 34,\n            columnNumber: 9\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/elem/page.tsx\",\n        lineNumber: 33,\n        columnNumber: 9\n    }, this);\n}\n_s(Page, \"uVmspeFbbkAwnqOY67DXM9xKfZM=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter\n    ];\n});\n_c = Page;\nvar _c;\n$RefreshReg$(_c, \"Page\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvZGFzaGJvYXJkL2RldmljZXMvZWxlbS9wYWdlLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUN5QztBQUNHO0FBQ0E7QUFFN0IsU0FBU0k7O0lBQ3BCLE1BQU0sQ0FBQ0MsVUFBVUMsWUFBWSxHQUFHSCwrQ0FBUUEsQ0FBZ0I7SUFFeEQsTUFBTUksU0FBU04sMERBQVNBO0lBRXhCQyxnREFBU0EsQ0FBQztRQUNOLE1BQU1NLGNBQWMsT0FBT0MsU0FFM0I7UUFHQSxzQ0FBc0M7UUFDdEMsTUFBTUEsUUFBUVQsdURBQVNBLENBQUM7UUFDeEIsSUFBSVMsVUFBVUMsV0FBVztZQUNyQkgsT0FBT0ksSUFBSSxDQUFDO1FBQ2hCO1FBR0EsdURBQXVEO1FBQ3ZELE1BQU1DLE1BQU0sSUFBSUMsSUFBSUMsT0FBT0MsUUFBUSxDQUFDQyxJQUFJO1FBQ3hDLElBQUlDLEtBQUtMLElBQUlNLFlBQVksQ0FBQ0MsR0FBRyxDQUFDO1FBQzlCLElBQUlGLE9BQU8sTUFBTTtZQUNiVixPQUFPSSxJQUFJLENBQUM7UUFDaEI7UUFDQUwsWUFBWVc7SUFDaEI7SUFDQSxxQkFDSSw4REFBQ0c7a0JBQ0QsNEVBQUNDOztnQkFBRztnQkFBUWhCO2dCQUFTOzs7Ozs7Ozs7Ozs7QUFHN0I7R0EvQndCRDs7UUFHTEgsc0RBQVNBOzs7S0FISkciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2FwcC9kYXNoYm9hcmQvZGV2aWNlcy9lbGVtL3BhZ2UudHN4P2VhNDQiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBjbGllbnQnXG5pbXBvcnQgeyBnZXRDb29raWUgfSBmcm9tIFwiY29va2llcy1uZXh0XCI7XG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tIFwibmV4dC9uYXZpZ2F0aW9uXCI7XG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFBhZ2UoKSB7XG4gICAgY29uc3QgW2RldmljZUlkLCBzZXREZXZpY2VJZF0gPSB1c2VTdGF0ZTxzdHJpbmcgfCBudWxsPihudWxsKTtcbiAgICBcbiAgICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKTtcblxuICAgIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHZlcmlmeVRva2VuID0gYXN5bmMgKHRva2VuOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG5cblxuICAgICAgICAvLyBWZXJpZmljYXIgZWwgdG9rZW4gZGUgYXV0ZW50aWNhY2nDs25cbiAgICAgICAgY29uc3QgdG9rZW4gPSBnZXRDb29raWUoXCJ0b2tlblwiKTtcbiAgICAgICAgaWYgKHRva2VuID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJvdXRlci5wdXNoKFwiL2xvZ2luXCIpO1xuICAgICAgICB9XG4gICAgICAgIFxuXG4gICAgICAgIC8vIFJlY3VwZXJhciBlbCBpZGVudGlmaWNhZG9yIGRlbCBkaXNwb3NpdGl2byBkZSBsYSBVUkxcbiAgICAgICAgY29uc3QgdXJsID0gbmV3IFVSTCh3aW5kb3cubG9jYXRpb24uaHJlZik7XG4gICAgICAgIGxldCBpZCA9IHVybC5zZWFyY2hQYXJhbXMuZ2V0KFwiaWRcIik7XG4gICAgICAgIGlmIChpZCA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcm91dGVyLnB1c2goXCIvZGFzaGJvYXJkL2RldmljZXNcIik7XG4gICAgICAgIH1cbiAgICAgICAgc2V0RGV2aWNlSWQoaWQpO1xuICAgIH0pXG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdj5cbiAgICAgICAgPGgxPkRldmljZSB7ZGV2aWNlSWR9IHBhZ2U8L2gxPlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufSJdLCJuYW1lcyI6WyJnZXRDb29raWUiLCJ1c2VSb3V0ZXIiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsIlBhZ2UiLCJkZXZpY2VJZCIsInNldERldmljZUlkIiwicm91dGVyIiwidmVyaWZ5VG9rZW4iLCJ0b2tlbiIsInVuZGVmaW5lZCIsInB1c2giLCJ1cmwiLCJVUkwiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJpZCIsInNlYXJjaFBhcmFtcyIsImdldCIsImRpdiIsImgxIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/dashboard/devices/elem/page.tsx\n"));

/***/ })

});