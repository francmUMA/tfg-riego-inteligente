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

/***/ "(app-pages-browser)/./src/app/dashboard/devices/page.tsx":
/*!********************************************!*\
  !*** ./src/app/dashboard/devices/page.tsx ***!
  \********************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Page; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ \"(app-pages-browser)/./node_modules/next/dist/api/link.js\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/image */ \"(app-pages-browser)/./node_modules/next/dist/api/image.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _lib_devicesInfo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib/devicesInfo */ \"(app-pages-browser)/./src/app/lib/devicesInfo.ts\");\n/* harmony import */ var cookies_next__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! cookies-next */ \"(app-pages-browser)/./node_modules/cookies-next/lib/index.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/dist/api/navigation.js\");\n/* harmony import */ var _barrel_optimize_names_EllipsisVerticalIcon_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! __barrel_optimize__?names=EllipsisVerticalIcon!=!@heroicons/react/24/outline */ \"(app-pages-browser)/./node_modules/@heroicons/react/24/outline/esm/EllipsisVerticalIcon.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\nfunction Page() {\n    _s();\n    const [devices, setDevices] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)([]);\n    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_6__.useRouter)();\n    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{\n        const token = (0,cookies_next__WEBPACK_IMPORTED_MODULE_5__.getCookie)(\"token\");\n        if (token === undefined) router.push(\"/login\");\n        const fetchDevices = async (token)=>{\n            const devices = await (0,_lib_devicesInfo__WEBPACK_IMPORTED_MODULE_4__.getDevices)(token);\n            console.log(devices);\n            if (devices === undefined) {\n                console.log(\"No se han obtenido los dispositivos\");\n                setDevices([]);\n            } else {\n                setDevices(devices);\n            }\n        };\n        fetchDevices(token);\n    }, []);\n    const [showInfo, setShowInfo] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(true);\n    const DeviceInfo = (props)=>{\n        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"w-full h-full flex justify-center items-center\",\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_image__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                        className: \"p-1\",\n                        src: \"/rasp-image.png\",\n                        alt: \"\",\n                        width: \"600\",\n                        height: \"0\"\n                    }, void 0, false, {\n                        fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                        lineNumber: 35,\n                        columnNumber: 17\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                    lineNumber: 34,\n                    columnNumber: 13\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"p-5 row-span-3 w-full h-full\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                            children: [\n                                \"Ip: \",\n                                props.device.ip\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                            lineNumber: 38,\n                            columnNumber: 17\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                            children: [\n                                \"Activo: \",\n                                props.device.available ? \"Si\" : \"No\"\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                            lineNumber: 39,\n                            columnNumber: 17\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                            children: [\n                                \"Latitud: \",\n                                props.device.Latitud\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                            lineNumber: 40,\n                            columnNumber: 17\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                            children: [\n                                \"Longitud: \",\n                                props.device.Longitud\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                            lineNumber: 41,\n                            columnNumber: 17\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                    lineNumber: 37,\n                    columnNumber: 13\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n            lineNumber: 33,\n            columnNumber: 9\n        }, this);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"pb-3 md:grid grid-cols-3 gap-5 min-w-60 h-16\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        className: \"w-full h-full text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150\",\n                        children: \"A\\xf1adir Dispositivo\"\n                    }, void 0, false, {\n                        fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                        lineNumber: 50,\n                        columnNumber: 17\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {}, void 0, false, {\n                        fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                        lineNumber: 51,\n                        columnNumber: 17\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {}, void 0, false, {\n                        fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                        lineNumber: 52,\n                        columnNumber: 17\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                lineNumber: 49,\n                columnNumber: 13\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5\",\n                children: devices.map((devices)=>{\n                    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n                        href: \"/dashboard/devices/\",\n                        className: \"bg-gray-50 border w-full h-full min-h-60 min-w-60 max-h-80 rounded-md shadow-md hover:shadow-lg transition duration-200 ease-in-out\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"w-full h-full flex justify-center items-center grid grid-cols-2 grid-rows-4\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"w-full h-full\"\n                                }, void 0, false, {\n                                    fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                                    lineNumber: 64,\n                                    columnNumber: 33\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"col-span-2 grid grid-cols-5 flex justify-between bg-white w-full h-full border-t rounded-md\",\n                                    children: [\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                                            className: \"col-span-4 p-5 text-2xl\",\n                                            children: [\n                                                \"#\",\n                                                devices.id\n                                            ]\n                                        }, void 0, true, {\n                                            fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                                            lineNumber: 68,\n                                            columnNumber: 37\n                                        }, this),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                            className: \"border-l flex justify-center items-center rounded-md hover:bg-gray-50\",\n                                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_EllipsisVerticalIcon_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n                                                className: \"w-1/2 h-1/2\"\n                                            }, void 0, false, {\n                                                fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                                                lineNumber: 70,\n                                                columnNumber: 41\n                                            }, this)\n                                        }, void 0, false, {\n                                            fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                                            lineNumber: 69,\n                                            columnNumber: 37\n                                        }, this)\n                                    ]\n                                }, void 0, true, {\n                                    fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                                    lineNumber: 67,\n                                    columnNumber: 33\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                            lineNumber: 63,\n                            columnNumber: 29\n                        }, this)\n                    }, devices, false, {\n                        fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                        lineNumber: 58,\n                        columnNumber: 25\n                    }, this);\n                })\n            }, void 0, false, {\n                fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                lineNumber: 54,\n                columnNumber: 13\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n        lineNumber: 48,\n        columnNumber: 9\n    }, this);\n}\n_s(Page, \"x+pGZjCE4nx9T2enx98F4MTj9CQ=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_6__.useRouter\n    ];\n});\n_c = Page;\nvar _c;\n$RefreshReg$(_c, \"Page\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvZGFzaGJvYXJkL2RldmljZXMvcGFnZS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQzRCO0FBQ0U7QUFDYTtBQUNPO0FBQ1Y7QUFDRztBQUN3QjtBQUVwRCxTQUFTUTs7SUFDcEIsTUFBTSxDQUFDQyxTQUFTQyxXQUFXLEdBQUdQLCtDQUFRQSxDQUFDLEVBQUU7SUFDekMsTUFBTVEsU0FBU0wsMERBQVNBO0lBRXhCSixnREFBU0EsQ0FBQztRQUNOLE1BQU1VLFFBQVFQLHVEQUFTQSxDQUFDO1FBQ3hCLElBQUlPLFVBQVVDLFdBQVdGLE9BQU9HLElBQUksQ0FBQztRQUNyQyxNQUFNQyxlQUFlLE9BQU9IO1lBQ3hCLE1BQU1ILFVBQVUsTUFBTUwsNERBQVVBLENBQUNRO1lBQ2pDSSxRQUFRQyxHQUFHLENBQUNSO1lBQ1osSUFBSUEsWUFBWUksV0FBVztnQkFDdEJHLFFBQVFDLEdBQUcsQ0FBQztnQkFDWlAsV0FBVyxFQUFFO1lBQ2xCLE9BQU87Z0JBQ0hBLFdBQVdEO1lBQ2Y7UUFDSjtRQUNBTSxhQUFhSDtJQUNqQixHQUFHLEVBQUU7SUFFTCxNQUFNLENBQUNNLFVBQVVDLFlBQVksR0FBR2hCLCtDQUFRQSxDQUFDO0lBRXpDLE1BQU1pQixhQUFhLENBQUNDO3NCQUNoQiw4REFBQ0M7OzhCQUNHLDhEQUFDQztvQkFBSUMsV0FBVTs4QkFDWCw0RUFBQ3ZCLGtEQUFLQTt3QkFBQ3VCLFdBQVU7d0JBQU1DLEtBQUk7d0JBQWtCQyxLQUFJO3dCQUFHQyxPQUFNO3dCQUFNQyxRQUFPOzs7Ozs7Ozs7Ozs4QkFFM0UsOERBQUNMO29CQUFJQyxXQUFVOztzQ0FDWCw4REFBQ0s7O2dDQUFFO2dDQUFLUixNQUFNUyxNQUFNLENBQUNDLEVBQUU7Ozs7Ozs7c0NBQ3ZCLDhEQUFDRjs7Z0NBQUU7Z0NBQVNSLE1BQU1TLE1BQU0sQ0FBQ0UsU0FBUyxHQUFHLE9BQU87Ozs7Ozs7c0NBQzVDLDhEQUFDSDs7Z0NBQUU7Z0NBQVVSLE1BQU1TLE1BQU0sQ0FBQ0csT0FBTzs7Ozs7OztzQ0FDakMsOERBQUNKOztnQ0FBRTtnQ0FBV1IsTUFBTVMsTUFBTSxDQUFDSSxRQUFROzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBSS9DO0lBRUEscUJBQ0ksOERBQUNaOzswQkFDRyw4REFBQ0M7Z0JBQUlDLFdBQVU7O2tDQUNYLDhEQUFDVzt3QkFBT1gsV0FBVTtrQ0FBc0g7Ozs7OztrQ0FDeEksOERBQUNEOzs7OztrQ0FDRCw4REFBQ0E7Ozs7Ozs7Ozs7OzBCQUVMLDhEQUFDQTtnQkFBSUMsV0FBVTswQkFFWGYsUUFBUTJCLEdBQUcsQ0FBQyxDQUFDM0I7b0JBQ1QscUJBQ0ksOERBQUNULGlEQUFJQTt3QkFFRHFDLE1BQU07d0JBQ05iLFdBQVU7a0NBRVYsNEVBQUNEOzRCQUFJQyxXQUFVOzs4Q0FDWCw4REFBQ0Q7b0NBQUlDLFdBQVU7Ozs7Ozs4Q0FHZiw4REFBQ0Q7b0NBQUlDLFdBQVU7O3NEQUNYLDhEQUFDYzs0Q0FBR2QsV0FBVTs7Z0RBQTBCO2dEQUFFZixRQUFROEIsRUFBRTs7Ozs7OztzREFDcEQsOERBQUNKOzRDQUFPWCxXQUFVO3NEQUNkLDRFQUFDakIsOEdBQW9CQTtnREFBQ2lCLFdBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3VCQVh2Q2Y7Ozs7O2dCQWlCakI7Ozs7Ozs7Ozs7OztBQUtoQjtHQXZFd0JEOztRQUVMRixzREFBU0E7OztLQUZKRSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvYXBwL2Rhc2hib2FyZC9kZXZpY2VzL3BhZ2UudHN4PzdjNjQiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBjbGllbnQnXG5pbXBvcnQgTGluayBmcm9tIFwibmV4dC9saW5rXCJcbmltcG9ydCBJbWFnZSBmcm9tIFwibmV4dC9pbWFnZVwiXG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7IGdldERldmljZXMgfSBmcm9tIFwiLi4vLi4vbGliL2RldmljZXNJbmZvXCJcbmltcG9ydCB7IGdldENvb2tpZSB9IGZyb20gXCJjb29raWVzLW5leHRcIlxuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSBcIm5leHQvbmF2aWdhdGlvblwiXG5pbXBvcnQgeyBFbGxpcHNpc1ZlcnRpY2FsSWNvbiAgfSBmcm9tIFwiQGhlcm9pY29ucy9yZWFjdC8yNC9vdXRsaW5lXCJcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUGFnZSgpIHtcbiAgICBjb25zdCBbZGV2aWNlcywgc2V0RGV2aWNlc10gPSB1c2VTdGF0ZShbXSlcbiAgICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKVxuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgY29uc3QgdG9rZW4gPSBnZXRDb29raWUoXCJ0b2tlblwiKVxuICAgICAgICBpZiAodG9rZW4gPT09IHVuZGVmaW5lZCkgcm91dGVyLnB1c2goXCIvbG9naW5cIilcbiAgICAgICAgY29uc3QgZmV0Y2hEZXZpY2VzID0gYXN5bmMgKHRva2VuOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRldmljZXMgPSBhd2FpdCBnZXREZXZpY2VzKHRva2VuKVxuICAgICAgICAgICAgY29uc29sZS5sb2coZGV2aWNlcylcbiAgICAgICAgICAgIGlmIChkZXZpY2VzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJObyBzZSBoYW4gb2J0ZW5pZG8gbG9zIGRpc3Bvc2l0aXZvc1wiKVxuICAgICAgICAgICAgICAgICBzZXREZXZpY2VzKFtdKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzZXREZXZpY2VzKGRldmljZXMpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZmV0Y2hEZXZpY2VzKHRva2VuIGFzIHN0cmluZylcbiAgICB9LCBbXSlcblxuICAgIGNvbnN0IFtzaG93SW5mbywgc2V0U2hvd0luZm9dID0gdXNlU3RhdGUodHJ1ZSlcbiAgICBcbiAgICBjb25zdCBEZXZpY2VJbmZvID0gKHByb3BzOiBhbnkpID0+IHtcbiAgICAgICAgPG1haW4+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBoLWZ1bGwgZmxleCBqdXN0aWZ5LWNlbnRlciBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICA8SW1hZ2UgY2xhc3NOYW1lPVwicC0xXCIgc3JjPVwiL3Jhc3AtaW1hZ2UucG5nXCIgYWx0PVwiXCIgd2lkdGg9XCI2MDBcIiBoZWlnaHQ9XCIwXCI+PC9JbWFnZT5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTUgcm93LXNwYW4tMyB3LWZ1bGwgaC1mdWxsXCI+XG4gICAgICAgICAgICAgICAgPHA+SXA6IHtwcm9wcy5kZXZpY2UuaXB9PC9wPlxuICAgICAgICAgICAgICAgIDxwPkFjdGl2bzoge3Byb3BzLmRldmljZS5hdmFpbGFibGUgPyBcIlNpXCIgOiBcIk5vXCJ9PC9wPlxuICAgICAgICAgICAgICAgIDxwPkxhdGl0dWQ6IHtwcm9wcy5kZXZpY2UuTGF0aXR1ZH08L3A+XG4gICAgICAgICAgICAgICAgPHA+TG9uZ2l0dWQ6IHtwcm9wcy5kZXZpY2UuTG9uZ2l0dWR9PC9wPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgPC9tYWluPlxuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICAgIDxtYWluPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYi0zIG1kOmdyaWQgZ3JpZC1jb2xzLTMgZ2FwLTUgbWluLXctNjAgaC0xNlwiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwidy1mdWxsIGgtZnVsbCB0ZXh0LXdoaXRlIGZvbnQtbWVkaXVtIGJnLWluZGlnby02MDAgaG92ZXI6YmctaW5kaWdvLTUwMCBhY3RpdmU6YmctaW5kaWdvLTYwMCByb3VuZGVkLWxnIGR1cmF0aW9uLTE1MFwiPkHDsWFkaXIgRGlzcG9zaXRpdm88L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8ZGl2PjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIGgtZnVsbCBncmlkIGdyaWQtY29scy0xIHNtOmdyaWQtY29scy0yIG1kOmdyaWQtY29scy0xIGxnOmdyaWQtY29scy0yIHhsOmdyaWQtY29scy0zIGdhcC01XCI+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZGV2aWNlcy5tYXAoKGRldmljZXMpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxMaW5rXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtkZXZpY2VzfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhyZWY9e1wiL2Rhc2hib2FyZC9kZXZpY2VzL1wifVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cImJnLWdyYXktNTAgYm9yZGVyIHctZnVsbCBoLWZ1bGwgbWluLWgtNjAgbWluLXctNjAgbWF4LWgtODAgcm91bmRlZC1tZCBzaGFkb3ctbWQgaG92ZXI6c2hhZG93LWxnIHRyYW5zaXRpb24gZHVyYXRpb24tMjAwIGVhc2UtaW4tb3V0XCJcbiAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBoLWZ1bGwgZmxleCBqdXN0aWZ5LWNlbnRlciBpdGVtcy1jZW50ZXIgZ3JpZCBncmlkLWNvbHMtMiBncmlkLXJvd3MtNFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBoLWZ1bGxcIj5cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc3Bhbi0yIGdyaWQgZ3JpZC1jb2xzLTUgZmxleCBqdXN0aWZ5LWJldHdlZW4gYmctd2hpdGUgdy1mdWxsIGgtZnVsbCBib3JkZXItdCByb3VuZGVkLW1kXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwiY29sLXNwYW4tNCBwLTUgdGV4dC0yeGxcIj4je2RldmljZXMuaWR9PC9oMT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwiYm9yZGVyLWwgZmxleCBqdXN0aWZ5LWNlbnRlciBpdGVtcy1jZW50ZXIgcm91bmRlZC1tZCBob3ZlcjpiZy1ncmF5LTUwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEVsbGlwc2lzVmVydGljYWxJY29uIGNsYXNzTmFtZT1cInctMS8yIGgtMS8yXCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PiAgIFxuICAgICAgICA8L21haW4+XG4gICAgKVxufSJdLCJuYW1lcyI6WyJMaW5rIiwiSW1hZ2UiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsImdldERldmljZXMiLCJnZXRDb29raWUiLCJ1c2VSb3V0ZXIiLCJFbGxpcHNpc1ZlcnRpY2FsSWNvbiIsIlBhZ2UiLCJkZXZpY2VzIiwic2V0RGV2aWNlcyIsInJvdXRlciIsInRva2VuIiwidW5kZWZpbmVkIiwicHVzaCIsImZldGNoRGV2aWNlcyIsImNvbnNvbGUiLCJsb2ciLCJzaG93SW5mbyIsInNldFNob3dJbmZvIiwiRGV2aWNlSW5mbyIsInByb3BzIiwibWFpbiIsImRpdiIsImNsYXNzTmFtZSIsInNyYyIsImFsdCIsIndpZHRoIiwiaGVpZ2h0IiwicCIsImRldmljZSIsImlwIiwiYXZhaWxhYmxlIiwiTGF0aXR1ZCIsIkxvbmdpdHVkIiwiYnV0dG9uIiwibWFwIiwiaHJlZiIsImgxIiwiaWQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/dashboard/devices/page.tsx\n"));

/***/ })

});