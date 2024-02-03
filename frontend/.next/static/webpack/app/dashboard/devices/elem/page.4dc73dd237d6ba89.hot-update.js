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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Page; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var _src_app_lib_token__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @/src/app/lib/token */ \"(app-pages-browser)/./src/app/lib/token.ts\");\n/* harmony import */ var _barrel_optimize_names_ArrowLeftIcon_ArrowPathIcon_MapPinIcon_PlusCircleIcon_XMarkIcon_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! __barrel_optimize__?names=ArrowLeftIcon,ArrowPathIcon,MapPinIcon,PlusCircleIcon,XMarkIcon!=!@heroicons/react/24/outline */ \"(app-pages-browser)/./node_modules/@heroicons/react/24/outline/esm/ArrowLeftIcon.js\");\n/* harmony import */ var _barrel_optimize_names_ArrowLeftIcon_ArrowPathIcon_MapPinIcon_PlusCircleIcon_XMarkIcon_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! __barrel_optimize__?names=ArrowLeftIcon,ArrowPathIcon,MapPinIcon,PlusCircleIcon,XMarkIcon!=!@heroicons/react/24/outline */ \"(app-pages-browser)/./node_modules/@heroicons/react/24/outline/esm/MapPinIcon.js\");\n/* harmony import */ var _barrel_optimize_names_ArrowLeftIcon_ArrowPathIcon_MapPinIcon_PlusCircleIcon_XMarkIcon_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! __barrel_optimize__?names=ArrowLeftIcon,ArrowPathIcon,MapPinIcon,PlusCircleIcon,XMarkIcon!=!@heroicons/react/24/outline */ \"(app-pages-browser)/./node_modules/@heroicons/react/24/outline/esm/PlusCircleIcon.js\");\n/* harmony import */ var _barrel_optimize_names_ArrowLeftIcon_ArrowPathIcon_MapPinIcon_PlusCircleIcon_XMarkIcon_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! __barrel_optimize__?names=ArrowLeftIcon,ArrowPathIcon,MapPinIcon,PlusCircleIcon,XMarkIcon!=!@heroicons/react/24/outline */ \"(app-pages-browser)/./node_modules/@heroicons/react/24/outline/esm/XMarkIcon.js\");\n/* harmony import */ var _barrel_optimize_names_ArrowLeftIcon_ArrowPathIcon_MapPinIcon_PlusCircleIcon_XMarkIcon_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! __barrel_optimize__?names=ArrowLeftIcon,ArrowPathIcon,MapPinIcon,PlusCircleIcon,XMarkIcon!=!@heroicons/react/24/outline */ \"(app-pages-browser)/./node_modules/@heroicons/react/24/outline/esm/ArrowPathIcon.js\");\n/* harmony import */ var _barrel_optimize_names_WifiIcon_heroicons_react_24_solid__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! __barrel_optimize__?names=WifiIcon!=!@heroicons/react/24/solid */ \"(app-pages-browser)/./node_modules/@heroicons/react/24/solid/esm/WifiIcon.js\");\n/* harmony import */ var cookies_next__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! cookies-next */ \"(app-pages-browser)/./node_modules/cookies-next/lib/index.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/dist/api/navigation.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n\nfunction Page() {\n    _s();\n    const [deviceId, setDeviceId] = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(null);\n    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_3__.useRouter)();\n    (0,react__WEBPACK_IMPORTED_MODULE_4__.useEffect)(()=>{\n        const verifyToken = async (token)=>{\n            let res = await (0,_src_app_lib_token__WEBPACK_IMPORTED_MODULE_1__.checkToken)(token);\n            if (!res) {\n                router.push(\"/login\");\n            }\n        };\n        // Verificar el token de autenticación\n        const token = (0,cookies_next__WEBPACK_IMPORTED_MODULE_2__.getCookie)(\"token\");\n        if (token === undefined) {\n            router.push(\"/login\");\n        }\n        verifyToken(token);\n        // Recuperar el identificador del dispositivo de la URL\n        const url = new URL(window.location.href);\n        let id = url.searchParams.get(\"id\");\n        if (id === null) {\n            router.push(\"/dashboard/devices\");\n        }\n        setDeviceId(id);\n    });\n    // ------------------------------ ROTATION ------------------------------\n    const [rotation, setRotation] = (0,react__WEBPACK_IMPORTED_MODULE_4__.useState)(0);\n    //-----------------------------------------------------------------------\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n        className: \"h-full w-full\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"w-full h-full p-4 flex flex-col gap-3\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"w-full h-12 flex flex-row flex-grow gap-3\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                            className: \"shadow-md rounded-md h-12 w-12 flex justify-center items-center border border-indigo-600 hover:bg-gray-100 duration-150\",\n                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_ArrowLeftIcon_ArrowPathIcon_MapPinIcon_PlusCircleIcon_XMarkIcon_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {\n                                className: \"w-6 text-indigo-600\"\n                            }, void 0, false, {\n                                fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/elem/page.tsx\",\n                                lineNumber: 48,\n                                columnNumber: 25\n                            }, this)\n                        }, void 0, false, {\n                            fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/elem/page.tsx\",\n                            lineNumber: 47,\n                            columnNumber: 21\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"flex gap-3 justify-end flex-grow\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                    className: \"shadow-md rounded-md h-12 w-12 flex justify-center items-center border border-indigo-600 hover:bg-gray-100 duration-150\",\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_ArrowLeftIcon_ArrowPathIcon_MapPinIcon_PlusCircleIcon_XMarkIcon_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {\n                                        className: \"w-6 text-indigo-600\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/elem/page.tsx\",\n                                        lineNumber: 52,\n                                        columnNumber: 29\n                                    }, this)\n                                }, void 0, false, {\n                                    fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/elem/page.tsx\",\n                                    lineNumber: 51,\n                                    columnNumber: 25\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                    className: \"shadow-md rounded-md h-12 w-12 flex justify-center items-center border border-indigo-600 hover:bg-gray-100 duration-150\",\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_ArrowLeftIcon_ArrowPathIcon_MapPinIcon_PlusCircleIcon_XMarkIcon_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n                                        className: \"w-6 text-indigo-600\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/elem/page.tsx\",\n                                        lineNumber: 55,\n                                        columnNumber: 29\n                                    }, this)\n                                }, void 0, false, {\n                                    fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/elem/page.tsx\",\n                                    lineNumber: 54,\n                                    columnNumber: 25\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                    className: \"shadow-md rounded-md h-12 w-12 flex justify-center items-center border hover:bg-gray-50 border-red-500 duration-150\",\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_ArrowLeftIcon_ArrowPathIcon_MapPinIcon_PlusCircleIcon_XMarkIcon_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_8__[\"default\"], {\n                                        className: \"w-6 text-red-500\"\n                                    }, void 0, false, {\n                                        fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/elem/page.tsx\",\n                                        lineNumber: 58,\n                                        columnNumber: 29\n                                    }, this)\n                                }, void 0, false, {\n                                    fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/elem/page.tsx\",\n                                    lineNumber: 57,\n                                    columnNumber: 25\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                    className: \"shadow-md rounded-md h-12 w-12 flex justify-center items-center border border-indigo-600 hover:bg-gray-100 duration-150\",\n                                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_ArrowLeftIcon_ArrowPathIcon_MapPinIcon_PlusCircleIcon_XMarkIcon_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_9__[\"default\"], {\n                                        className: \"w-6 text-indigo-600\",\n                                        style: {\n                                            transition: \"transform 0.7s ease\",\n                                            transform: \"rotate(\".concat(rotation, \"deg)\")\n                                        }\n                                    }, void 0, false, {\n                                        fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/elem/page.tsx\",\n                                        lineNumber: 61,\n                                        columnNumber: 29\n                                    }, this)\n                                }, void 0, false, {\n                                    fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/elem/page.tsx\",\n                                    lineNumber: 60,\n                                    columnNumber: 25\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/elem/page.tsx\",\n                            lineNumber: 50,\n                            columnNumber: 21\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/elem/page.tsx\",\n                    lineNumber: 46,\n                    columnNumber: 17\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"w-full h-full flex flex-col gap-3\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"w-full h-16 flex flex-row gap-3 items-center justify-center\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"w-50 h-full flex flex-row gap-4 px-5 items-center border shadow-md rounded-md\",\n                                    children: [\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_WifiIcon_heroicons_react_24_solid__WEBPACK_IMPORTED_MODULE_10__[\"default\"], {\n                                            className: \"w-8 text-indigo-600\"\n                                        }, void 0, false, {\n                                            fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/elem/page.tsx\",\n                                            lineNumber: 70,\n                                            columnNumber: 29\n                                        }, this),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                            className: \"flex flex-col justify-center\",\n                                            children: [\n                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                                    className: \"text-sm text-slate-400\",\n                                                    children: \"Estado\"\n                                                }, void 0, false, {\n                                                    fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/elem/page.tsx\",\n                                                    lineNumber: 72,\n                                                    columnNumber: 33\n                                                }, this),\n                                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                                                    children: \"Conectado\"\n                                                }, void 0, false, {\n                                                    fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/elem/page.tsx\",\n                                                    lineNumber: 73,\n                                                    columnNumber: 33\n                                                }, this)\n                                            ]\n                                        }, void 0, true, {\n                                            fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/elem/page.tsx\",\n                                            lineNumber: 71,\n                                            columnNumber: 29\n                                        }, this)\n                                    ]\n                                }, void 0, true, {\n                                    fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/elem/page.tsx\",\n                                    lineNumber: 69,\n                                    columnNumber: 25\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"w-56 h-full flex flex-row border shadow-md rounded-md\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/elem/page.tsx\",\n                                    lineNumber: 76,\n                                    columnNumber: 25\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"w-56 h-full flex flex-row border shadow-md rounded-md\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/elem/page.tsx\",\n                                    lineNumber: 79,\n                                    columnNumber: 25\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/elem/page.tsx\",\n                            lineNumber: 68,\n                            columnNumber: 21\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"w-full h-full flex flex-row gap-3 items-center justify-center\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"w-full h-full border shadow-md rounded-md\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/elem/page.tsx\",\n                                    lineNumber: 84,\n                                    columnNumber: 25\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"w-full h-full border shadow-md rounded-md\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/elem/page.tsx\",\n                                    lineNumber: 87,\n                                    columnNumber: 25\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/elem/page.tsx\",\n                            lineNumber: 83,\n                            columnNumber: 21\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"w-full h-full flex flex-row gap-3 items-center justify-center\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"w-full h-full border shadow-md rounded-md\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/elem/page.tsx\",\n                                    lineNumber: 92,\n                                    columnNumber: 25\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"w-full h-full border shadow-md rounded-md\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/elem/page.tsx\",\n                                    lineNumber: 95,\n                                    columnNumber: 25\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/elem/page.tsx\",\n                            lineNumber: 91,\n                            columnNumber: 21\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/elem/page.tsx\",\n                    lineNumber: 67,\n                    columnNumber: 17\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/elem/page.tsx\",\n            lineNumber: 45,\n            columnNumber: 13\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/elem/page.tsx\",\n        lineNumber: 44,\n        columnNumber: 9\n    }, this);\n}\n_s(Page, \"9KC3V8fOz29ddq57teAw9F/GUD0=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_3__.useRouter\n    ];\n});\n_c = Page;\nvar _c;\n$RefreshReg$(_c, \"Page\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvZGFzaGJvYXJkL2RldmljZXMvZWxlbS9wYWdlLnRzeCIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDaUQ7QUFDK0U7QUFDNUU7QUFDWDtBQUNHO0FBQ0E7QUFFN0IsU0FBU1c7O0lBQ3BCLE1BQU0sQ0FBQ0MsVUFBVUMsWUFBWSxHQUFHSCwrQ0FBUUEsQ0FBZ0I7SUFFeEQsTUFBTUksU0FBU04sMERBQVNBO0lBRXhCQyxnREFBU0EsQ0FBQztRQUNOLE1BQU1NLGNBQWMsT0FBT0M7WUFDdkIsSUFBSUMsTUFBTSxNQUFNakIsOERBQVVBLENBQUNnQjtZQUMzQixJQUFJLENBQUNDLEtBQUs7Z0JBQ05ILE9BQU9JLElBQUksQ0FBQztZQUNoQjtRQUNKO1FBRUEsc0NBQXNDO1FBQ3RDLE1BQU1GLFFBQVFULHVEQUFTQSxDQUFDO1FBQ3hCLElBQUlTLFVBQVVHLFdBQVc7WUFDckJMLE9BQU9JLElBQUksQ0FBQztRQUNoQjtRQUNBSCxZQUFZQztRQUdaLHVEQUF1RDtRQUN2RCxNQUFNSSxNQUFNLElBQUlDLElBQUlDLE9BQU9DLFFBQVEsQ0FBQ0MsSUFBSTtRQUN4QyxJQUFJQyxLQUFLTCxJQUFJTSxZQUFZLENBQUNDLEdBQUcsQ0FBQztRQUM5QixJQUFJRixPQUFPLE1BQU07WUFDYlgsT0FBT0ksSUFBSSxDQUFDO1FBQ2hCO1FBQ0FMLFlBQVlZO0lBQ2hCO0lBRUEseUVBQXlFO0lBQ3pFLE1BQU0sQ0FBQ0csVUFBVUMsWUFBWSxHQUFHbkIsK0NBQVFBLENBQUM7SUFDekMseUVBQXlFO0lBRXpFLHFCQUNJLDhEQUFDb0I7UUFBS0MsV0FBVTtrQkFDWiw0RUFBQ0M7WUFBSUQsV0FBVTs7OEJBQ1gsOERBQUNDO29CQUFJRCxXQUFVOztzQ0FDWCw4REFBQ0U7NEJBQU9GLFdBQVk7c0NBQ2hCLDRFQUFDN0IseUpBQWFBO2dDQUFDNkIsV0FBWTs7Ozs7Ozs7Ozs7c0NBRS9CLDhEQUFDQzs0QkFBSUQsV0FBVTs7OENBQ1gsOERBQUNFO29DQUFPRixXQUFZOzhDQUNoQiw0RUFBQzNCLHlKQUFVQTt3Q0FBQzJCLFdBQVk7Ozs7Ozs7Ozs7OzhDQUU1Qiw4REFBQ0U7b0NBQU9GLFdBQVk7OENBQ2hCLDRFQUFDMUIseUpBQWNBO3dDQUFDMEIsV0FBWTs7Ozs7Ozs7Ozs7OENBRWhDLDhEQUFDRTtvQ0FBT0YsV0FBWTs4Q0FDaEIsNEVBQUM1Qix5SkFBU0E7d0NBQUM0QixXQUFZOzs7Ozs7Ozs7Ozs4Q0FFM0IsOERBQUNFO29DQUFPRixXQUFZOzhDQUNoQiw0RUFBQzlCLHlKQUFhQTt3Q0FDZDhCLFdBQVk7d0NBQ1pHLE9BQU87NENBQUVDLFlBQVk7NENBQXVCQyxXQUFXLFVBQW1CLE9BQVRSLFVBQVM7d0NBQUs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzhCQUkzRiw4REFBQ0k7b0JBQUlELFdBQVU7O3NDQUNYLDhEQUFDQzs0QkFBSUQsV0FBVTs7OENBQ1gsOERBQUNDO29DQUFJRCxXQUFVOztzREFDWCw4REFBQ3pCLGlHQUFRQTs0Q0FBQ3lCLFdBQVU7Ozs7OztzREFDcEIsOERBQUNDOzRDQUFJRCxXQUFVOzs4REFDWCw4REFBQ007b0RBQUVOLFdBQVU7OERBQXlCOzs7Ozs7OERBQ3RDLDhEQUFDTTs4REFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7OzhDQUdYLDhEQUFDTDtvQ0FBSUQsV0FBVTs7Ozs7OzhDQUdmLDhEQUFDQztvQ0FBSUQsV0FBVTs7Ozs7Ozs7Ozs7O3NDQUluQiw4REFBQ0M7NEJBQUlELFdBQVU7OzhDQUNYLDhEQUFDQztvQ0FBSUQsV0FBVTs7Ozs7OzhDQUdmLDhEQUFDQztvQ0FBSUQsV0FBVTs7Ozs7Ozs7Ozs7O3NDQUluQiw4REFBQ0M7NEJBQUlELFdBQVU7OzhDQUNYLDhEQUFDQztvQ0FBSUQsV0FBVTs7Ozs7OzhDQUdmLDhEQUFDQztvQ0FBSUQsV0FBVTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFRdkM7R0E5RndCcEI7O1FBR0xILHNEQUFTQTs7O0tBSEpHIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9hcHAvZGFzaGJvYXJkL2RldmljZXMvZWxlbS9wYWdlLnRzeD9lYTQ0Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2UgY2xpZW50J1xuaW1wb3J0IHsgY2hlY2tUb2tlbiB9IGZyb20gXCJAL3NyYy9hcHAvbGliL3Rva2VuXCI7XG5pbXBvcnQgeyBBcnJvd1BhdGhJY29uLCBBcnJvd0xlZnRJY29uLCBYTWFya0ljb24sIE1hcFBpbkljb24sIFBsdXNDaXJjbGVJY29uLCBHbG9iZUFsdEljb24gfSBmcm9tIFwiQGhlcm9pY29ucy9yZWFjdC8yNC9vdXRsaW5lXCI7XG5pbXBvcnQgeyBXaWZpSWNvbiB9IGZyb20gXCJAaGVyb2ljb25zL3JlYWN0LzI0L3NvbGlkXCJcbmltcG9ydCB7IGdldENvb2tpZSB9IGZyb20gXCJjb29raWVzLW5leHRcIjtcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gXCJuZXh0L25hdmlnYXRpb25cIjtcbmltcG9ydCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tIFwicmVhY3RcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUGFnZSgpIHtcbiAgICBjb25zdCBbZGV2aWNlSWQsIHNldERldmljZUlkXSA9IHVzZVN0YXRlPHN0cmluZyB8IG51bGw+KG51bGwpO1xuICAgIFxuICAgIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgY29uc3QgdmVyaWZ5VG9rZW4gPSBhc3luYyAodG9rZW46IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgbGV0IHJlcyA9IGF3YWl0IGNoZWNrVG9rZW4odG9rZW4pXG4gICAgICAgICAgICBpZiAoIXJlcykge1xuICAgICAgICAgICAgICAgIHJvdXRlci5wdXNoKFwiL2xvZ2luXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gVmVyaWZpY2FyIGVsIHRva2VuIGRlIGF1dGVudGljYWNpw7NuXG4gICAgICAgIGNvbnN0IHRva2VuID0gZ2V0Q29va2llKFwidG9rZW5cIik7XG4gICAgICAgIGlmICh0b2tlbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByb3V0ZXIucHVzaChcIi9sb2dpblwiKTtcbiAgICAgICAgfVxuICAgICAgICB2ZXJpZnlUb2tlbih0b2tlbiBhcyBzdHJpbmcpO1xuICAgICAgICBcblxuICAgICAgICAvLyBSZWN1cGVyYXIgZWwgaWRlbnRpZmljYWRvciBkZWwgZGlzcG9zaXRpdm8gZGUgbGEgVVJMXG4gICAgICAgIGNvbnN0IHVybCA9IG5ldyBVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuICAgICAgICBsZXQgaWQgPSB1cmwuc2VhcmNoUGFyYW1zLmdldChcImlkXCIpO1xuICAgICAgICBpZiAoaWQgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJvdXRlci5wdXNoKFwiL2Rhc2hib2FyZC9kZXZpY2VzXCIpO1xuICAgICAgICB9XG4gICAgICAgIHNldERldmljZUlkKGlkKTtcbiAgICB9KVxuXG4gICAgLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tIFJPVEFUSU9OIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICAgIGNvbnN0IFtyb3RhdGlvbiwgc2V0Um90YXRpb25dID0gdXNlU3RhdGUoMCk7XG4gICAgLy8tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuXG4gICAgcmV0dXJuIChcbiAgICAgICAgPG1haW4gY2xhc3NOYW1lPVwiaC1mdWxsIHctZnVsbFwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgaC1mdWxsIHAtNCBmbGV4IGZsZXgtY29sIGdhcC0zXCI+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgaC0xMiBmbGV4IGZsZXgtcm93IGZsZXgtZ3JvdyBnYXAtM1wiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17YHNoYWRvdy1tZCByb3VuZGVkLW1kIGgtMTIgdy0xMiBmbGV4IGp1c3RpZnktY2VudGVyIGl0ZW1zLWNlbnRlciBib3JkZXIgYm9yZGVyLWluZGlnby02MDAgaG92ZXI6YmctZ3JheS0xMDAgZHVyYXRpb24tMTUwYH0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8QXJyb3dMZWZ0SWNvbiBjbGFzc05hbWU9e2B3LTYgdGV4dC1pbmRpZ28tNjAwYH0vPlxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGdhcC0zIGp1c3RpZnktZW5kIGZsZXgtZ3Jvd1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e2BzaGFkb3ctbWQgcm91bmRlZC1tZCBoLTEyIHctMTIgZmxleCBqdXN0aWZ5LWNlbnRlciBpdGVtcy1jZW50ZXIgYm9yZGVyIGJvcmRlci1pbmRpZ28tNjAwIGhvdmVyOmJnLWdyYXktMTAwIGR1cmF0aW9uLTE1MGB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxNYXBQaW5JY29uIGNsYXNzTmFtZT17YHctNiB0ZXh0LWluZGlnby02MDBgfS8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPXtgc2hhZG93LW1kIHJvdW5kZWQtbWQgaC0xMiB3LTEyIGZsZXgganVzdGlmeS1jZW50ZXIgaXRlbXMtY2VudGVyIGJvcmRlciBib3JkZXItaW5kaWdvLTYwMCBob3ZlcjpiZy1ncmF5LTEwMCBkdXJhdGlvbi0xNTBgfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8UGx1c0NpcmNsZUljb24gY2xhc3NOYW1lPXtgdy02IHRleHQtaW5kaWdvLTYwMGB9Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e2BzaGFkb3ctbWQgcm91bmRlZC1tZCBoLTEyIHctMTIgZmxleCBqdXN0aWZ5LWNlbnRlciBpdGVtcy1jZW50ZXIgYm9yZGVyIGhvdmVyOmJnLWdyYXktNTAgYm9yZGVyLXJlZC01MDAgZHVyYXRpb24tMTUwYH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFhNYXJrSWNvbiBjbGFzc05hbWU9e2B3LTYgdGV4dC1yZWQtNTAwYH0vPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT17YHNoYWRvdy1tZCByb3VuZGVkLW1kIGgtMTIgdy0xMiBmbGV4IGp1c3RpZnktY2VudGVyIGl0ZW1zLWNlbnRlciBib3JkZXIgYm9yZGVyLWluZGlnby02MDAgaG92ZXI6YmctZ3JheS0xMDAgZHVyYXRpb24tMTUwYH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPEFycm93UGF0aEljb25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2B3LTYgdGV4dC1pbmRpZ28tNjAwYH0gXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3sgdHJhbnNpdGlvbjogJ3RyYW5zZm9ybSAwLjdzIGVhc2UnLCB0cmFuc2Zvcm06IGByb3RhdGUoJHtyb3RhdGlvbn1kZWcpYH19Lz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBoLWZ1bGwgZmxleCBmbGV4LWNvbCBnYXAtM1wiPlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBoLTE2IGZsZXggZmxleC1yb3cgZ2FwLTMgaXRlbXMtY2VudGVyIGp1c3RpZnktY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctNTAgaC1mdWxsIGZsZXggZmxleC1yb3cgZ2FwLTQgcHgtNSBpdGVtcy1jZW50ZXIgYm9yZGVyIHNoYWRvdy1tZCByb3VuZGVkLW1kXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPFdpZmlJY29uIGNsYXNzTmFtZT1cInctOCB0ZXh0LWluZGlnby02MDBcIj48L1dpZmlJY29uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBqdXN0aWZ5LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJ0ZXh0LXNtIHRleHQtc2xhdGUtNDAwXCI+RXN0YWRvPC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD5Db25lY3RhZG88L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy01NiBoLWZ1bGwgZmxleCBmbGV4LXJvdyBib3JkZXIgc2hhZG93LW1kIHJvdW5kZWQtbWRcIj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctNTYgaC1mdWxsIGZsZXggZmxleC1yb3cgYm9yZGVyIHNoYWRvdy1tZCByb3VuZGVkLW1kXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIGgtZnVsbCBmbGV4IGZsZXgtcm93IGdhcC0zIGl0ZW1zLWNlbnRlciBqdXN0aWZ5LWNlbnRlclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgaC1mdWxsIGJvcmRlciBzaGFkb3ctbWQgcm91bmRlZC1tZFwiPlxuXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIGgtZnVsbCBib3JkZXIgc2hhZG93LW1kIHJvdW5kZWQtbWRcIj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBoLWZ1bGwgZmxleCBmbGV4LXJvdyBnYXAtMyBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIGgtZnVsbCBib3JkZXIgc2hhZG93LW1kIHJvdW5kZWQtbWRcIj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBoLWZ1bGwgYm9yZGVyIHNoYWRvdy1tZCByb3VuZGVkLW1kXCI+XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L21haW4+XG4gICAgKTtcbn0iXSwibmFtZXMiOlsiY2hlY2tUb2tlbiIsIkFycm93UGF0aEljb24iLCJBcnJvd0xlZnRJY29uIiwiWE1hcmtJY29uIiwiTWFwUGluSWNvbiIsIlBsdXNDaXJjbGVJY29uIiwiV2lmaUljb24iLCJnZXRDb29raWUiLCJ1c2VSb3V0ZXIiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsIlBhZ2UiLCJkZXZpY2VJZCIsInNldERldmljZUlkIiwicm91dGVyIiwidmVyaWZ5VG9rZW4iLCJ0b2tlbiIsInJlcyIsInB1c2giLCJ1bmRlZmluZWQiLCJ1cmwiLCJVUkwiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsImhyZWYiLCJpZCIsInNlYXJjaFBhcmFtcyIsImdldCIsInJvdGF0aW9uIiwic2V0Um90YXRpb24iLCJtYWluIiwiY2xhc3NOYW1lIiwiZGl2IiwiYnV0dG9uIiwic3R5bGUiLCJ0cmFuc2l0aW9uIiwidHJhbnNmb3JtIiwicCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/dashboard/devices/elem/page.tsx\n"));

/***/ })

});