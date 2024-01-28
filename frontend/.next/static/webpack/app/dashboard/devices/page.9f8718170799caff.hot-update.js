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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Page; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ \"(app-pages-browser)/./node_modules/next/dist/api/link.js\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/image */ \"(app-pages-browser)/./node_modules/next/dist/api/image.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _lib_devicesInfo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib/devicesInfo */ \"(app-pages-browser)/./src/app/lib/devicesInfo.ts\");\n/* harmony import */ var cookies_next__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! cookies-next */ \"(app-pages-browser)/./node_modules/cookies-next/lib/index.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/dist/api/navigation.js\");\n/* harmony import */ var _barrel_optimize_names_EllipsisVerticalIcon_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! __barrel_optimize__?names=EllipsisVerticalIcon!=!@heroicons/react/24/outline */ \"(app-pages-browser)/./node_modules/@heroicons/react/24/outline/esm/EllipsisVerticalIcon.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\nfunction Page() {\n    _s();\n    const [devices, setDevices] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)([]);\n    const [showDevicesInfo, setShowDevicesInfo] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)([]);\n    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_6__.useRouter)();\n    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{\n        const token = (0,cookies_next__WEBPACK_IMPORTED_MODULE_5__.getCookie)(\"token\");\n        if (token === undefined) router.push(\"/login\");\n        const fetchDevices = async (token)=>{\n            const devices = await (0,_lib_devicesInfo__WEBPACK_IMPORTED_MODULE_4__.getDevices)(token);\n            if (devices === undefined) {\n                console.log(\"No se han obtenido los dispositivos\");\n                setDevices([]);\n            } else {\n                setDevices(devices);\n                setShowDevicesInfo(devices.map(()=>true));\n            }\n        };\n        fetchDevices(token);\n    }, []);\n    const handleDeviceInfoButton = (device_index)=>{\n        setShowDevicesInfo(showDevicesInfo.map((show, index)=>{\n            console.log(index);\n            if (index == device_index) {\n                console.log(show);\n                return !show;\n            } else return show;\n        }));\n        console.log(showDevicesInfo);\n    };\n    const DeviceInfo = (device)=>{\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"w-full h-full flex justify-center items-center\",\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_image__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                        className: \"p-1\",\n                        src: \"/rasp-image.png\",\n                        alt: \"\",\n                        width: \"600\",\n                        height: \"0\"\n                    }, void 0, false, {\n                        fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                        lineNumber: 48,\n                        columnNumber: 21\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                    lineNumber: 47,\n                    columnNumber: 17\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"p-5 row-span-3 w-full h-full\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                            children: [\n                                \"Ip: \",\n                                device.ip\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                            lineNumber: 51,\n                            columnNumber: 21\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                            children: [\n                                \"Activo: \",\n                                device.available ? \"Si\" : \"No\"\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                            lineNumber: 52,\n                            columnNumber: 21\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                            children: [\n                                \"Latitud: \",\n                                device.Latitud\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                            lineNumber: 53,\n                            columnNumber: 21\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                            children: [\n                                \"Longitud: \",\n                                device.Longitud\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                            lineNumber: 54,\n                            columnNumber: 21\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                    lineNumber: 50,\n                    columnNumber: 17\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n            lineNumber: 46,\n            columnNumber: 13\n        }, this);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"pb-3 md:grid grid-cols-3 gap-5 min-w-60 h-16\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        className: \"w-full h-full text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150\",\n                        children: \"A\\xf1adir Dispositivo\"\n                    }, void 0, false, {\n                        fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                        lineNumber: 63,\n                        columnNumber: 17\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {}, void 0, false, {\n                        fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                        lineNumber: 64,\n                        columnNumber: 17\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {}, void 0, false, {\n                        fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                        lineNumber: 65,\n                        columnNumber: 17\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                lineNumber: 62,\n                columnNumber: 13\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5\",\n                children: devices.map((devices, index)=>{\n                    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n                        href: \"/dashboard/devices/\",\n                        className: \"bg-gray-50 border w-full h-full min-h-60 min-w-60 max-h-80 rounded-md shadow-md hover:shadow-lg transition duration-200 ease-in-out\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"w-full h-full flex justify-center items-center grid grid-cols-2 grid-rows-4\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"w-full h-full row-span-3\",\n                                    children: showDevicesInfo[index] && DeviceInfo(devices)\n                                }, void 0, false, {\n                                    fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                                    lineNumber: 77,\n                                    columnNumber: 33\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"col-span-2 grid grid-cols-5 flex justify-between bg-white w-full h-full border-t rounded-md\",\n                                    children: [\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                                            className: \"col-span-4 p-5 text-2xl\",\n                                            children: [\n                                                \"#\",\n                                                devices.id\n                                            ]\n                                        }, void 0, true, {\n                                            fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                                            lineNumber: 81,\n                                            columnNumber: 37\n                                        }, this),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                            onClick: (index)=>handleDeviceInfoButton(index),\n                                            className: \"border-l flex justify-center items-center rounded-md hover:bg-gray-50\",\n                                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_EllipsisVerticalIcon_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n                                                className: \"w-1/2 h-1/2\"\n                                            }, void 0, false, {\n                                                fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                                                lineNumber: 85,\n                                                columnNumber: 41\n                                            }, this)\n                                        }, void 0, false, {\n                                            fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                                            lineNumber: 82,\n                                            columnNumber: 37\n                                        }, this)\n                                    ]\n                                }, void 0, true, {\n                                    fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                                    lineNumber: 80,\n                                    columnNumber: 33\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                            lineNumber: 76,\n                            columnNumber: 29\n                        }, this)\n                    }, devices, false, {\n                        fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                        lineNumber: 71,\n                        columnNumber: 25\n                    }, this);\n                })\n            }, void 0, false, {\n                fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                lineNumber: 67,\n                columnNumber: 13\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n        lineNumber: 61,\n        columnNumber: 9\n    }, this);\n}\n_s(Page, \"78njISXMTYUcA0cnJ6Ri1g4RpDg=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_6__.useRouter\n    ];\n});\n_c = Page;\nvar _c;\n$RefreshReg$(_c, \"Page\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvZGFzaGJvYXJkL2RldmljZXMvcGFnZS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQzRCO0FBQ0U7QUFDYTtBQUNPO0FBQ1Y7QUFDRztBQUN3QjtBQUVwRCxTQUFTUTs7SUFDcEIsTUFBTSxDQUFDQyxTQUFTQyxXQUFXLEdBQUdQLCtDQUFRQSxDQUFDLEVBQUU7SUFDekMsTUFBTSxDQUFDUSxpQkFBaUJDLG1CQUFtQixHQUFHVCwrQ0FBUUEsQ0FBaUIsRUFBRTtJQUN6RSxNQUFNVSxTQUFTUCwwREFBU0E7SUFFeEJKLGdEQUFTQSxDQUFDO1FBQ04sTUFBTVksUUFBUVQsdURBQVNBLENBQUM7UUFDeEIsSUFBSVMsVUFBVUMsV0FBV0YsT0FBT0csSUFBSSxDQUFDO1FBQ3JDLE1BQU1DLGVBQWUsT0FBT0g7WUFDeEIsTUFBTUwsVUFBVSxNQUFNTCw0REFBVUEsQ0FBQ1U7WUFDakMsSUFBSUwsWUFBWU0sV0FBVztnQkFDdEJHLFFBQVFDLEdBQUcsQ0FBQztnQkFDWlQsV0FBVyxFQUFFO1lBQ2xCLE9BQU87Z0JBQ0hBLFdBQVdEO2dCQUNYRyxtQkFBbUJILFFBQVFXLEdBQUcsQ0FBQyxJQUFNO1lBQ3pDO1FBQ0o7UUFDQUgsYUFBYUg7SUFDakIsR0FBRyxFQUFFO0lBRUwsTUFBTU8seUJBQXlCLENBQUNDO1FBQzVCVixtQkFBbUJELGdCQUFnQlMsR0FBRyxDQUFDLENBQUNHLE1BQU1DO1lBQzFDTixRQUFRQyxHQUFHLENBQUNLO1lBQ1osSUFBSUEsU0FBU0YsY0FBYztnQkFDdkJKLFFBQVFDLEdBQUcsQ0FBQ0k7Z0JBQ1osT0FBTyxDQUFDQTtZQUNaLE9BQ0ssT0FBT0E7UUFDaEI7UUFFQUwsUUFBUUMsR0FBRyxDQUFDUjtJQUNoQjtJQUVBLE1BQU1jLGFBQWEsQ0FBQ0M7UUFDaEIscUJBQ0ksOERBQUNDOzs4QkFDRyw4REFBQ0M7b0JBQUlDLFdBQVU7OEJBQ1gsNEVBQUM1QixrREFBS0E7d0JBQUM0QixXQUFVO3dCQUFNQyxLQUFJO3dCQUFrQkMsS0FBSTt3QkFBR0MsT0FBTTt3QkFBTUMsUUFBTzs7Ozs7Ozs7Ozs7OEJBRTNFLDhEQUFDTDtvQkFBSUMsV0FBVTs7c0NBQ1gsOERBQUNLOztnQ0FBRTtnQ0FBS1IsT0FBT1MsRUFBRTs7Ozs7OztzQ0FDakIsOERBQUNEOztnQ0FBRTtnQ0FBU1IsT0FBT1UsU0FBUyxHQUFHLE9BQU87Ozs7Ozs7c0NBQ3RDLDhEQUFDRjs7Z0NBQUU7Z0NBQVVSLE9BQU9XLE9BQU87Ozs7Ozs7c0NBQzNCLDhEQUFDSDs7Z0NBQUU7Z0NBQVdSLE9BQU9ZLFFBQVE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFJN0M7SUFFQSxxQkFDSSw4REFBQ1g7OzBCQUNHLDhEQUFDQztnQkFBSUMsV0FBVTs7a0NBQ1gsOERBQUNVO3dCQUFPVixXQUFVO2tDQUFzSDs7Ozs7O2tDQUN4SSw4REFBQ0Q7Ozs7O2tDQUNELDhEQUFDQTs7Ozs7Ozs7Ozs7MEJBRUwsOERBQUNBO2dCQUFJQyxXQUFVOzBCQUVYcEIsUUFBUVcsR0FBRyxDQUFDLENBQUNYLFNBQVNlO29CQUNsQixxQkFDSSw4REFBQ3hCLGlEQUFJQTt3QkFFRHdDLE1BQU07d0JBQ05YLFdBQVU7a0NBRVYsNEVBQUNEOzRCQUFJQyxXQUFVOzs4Q0FDWCw4REFBQ0Q7b0NBQUlDLFdBQVU7OENBQ1ZsQixlQUFlLENBQUNhLE1BQU0sSUFBSUMsV0FBV2hCOzs7Ozs7OENBRTFDLDhEQUFDbUI7b0NBQUlDLFdBQVU7O3NEQUNYLDhEQUFDWTs0Q0FBR1osV0FBVTs7Z0RBQTBCO2dEQUFFcEIsUUFBUWlDLEVBQUU7Ozs7Ozs7c0RBQ3BELDhEQUFDSDs0Q0FDR0ksU0FBUyxDQUFDbkIsUUFBVUgsdUJBQXVCRzs0Q0FDM0NLLFdBQVU7c0RBQ1YsNEVBQUN0Qiw4R0FBb0JBO2dEQUFDc0IsV0FBVTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7dUJBYnZDcEI7Ozs7O2dCQW1CakI7Ozs7Ozs7Ozs7OztBQUtoQjtHQXRGd0JEOztRQUdMRixzREFBU0E7OztLQUhKRSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvYXBwL2Rhc2hib2FyZC9kZXZpY2VzL3BhZ2UudHN4PzdjNjQiXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBjbGllbnQnXG5pbXBvcnQgTGluayBmcm9tIFwibmV4dC9saW5rXCJcbmltcG9ydCBJbWFnZSBmcm9tIFwibmV4dC9pbWFnZVwiXG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCJcbmltcG9ydCB7IGdldERldmljZXMgfSBmcm9tIFwiLi4vLi4vbGliL2RldmljZXNJbmZvXCJcbmltcG9ydCB7IGdldENvb2tpZSB9IGZyb20gXCJjb29raWVzLW5leHRcIlxuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSBcIm5leHQvbmF2aWdhdGlvblwiXG5pbXBvcnQgeyBFbGxpcHNpc1ZlcnRpY2FsSWNvbiAgfSBmcm9tIFwiQGhlcm9pY29ucy9yZWFjdC8yNC9vdXRsaW5lXCJcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gUGFnZSgpIHtcbiAgICBjb25zdCBbZGV2aWNlcywgc2V0RGV2aWNlc10gPSB1c2VTdGF0ZShbXSlcbiAgICBjb25zdCBbc2hvd0RldmljZXNJbmZvLCBzZXRTaG93RGV2aWNlc0luZm9dID0gdXNlU3RhdGU8QXJyYXk8Ym9vbGVhbj4+KFtdKVxuICAgIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpXG5cbiAgICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgICAgICBjb25zdCB0b2tlbiA9IGdldENvb2tpZShcInRva2VuXCIpXG4gICAgICAgIGlmICh0b2tlbiA9PT0gdW5kZWZpbmVkKSByb3V0ZXIucHVzaChcIi9sb2dpblwiKVxuICAgICAgICBjb25zdCBmZXRjaERldmljZXMgPSBhc3luYyAodG9rZW46IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgY29uc3QgZGV2aWNlcyA9IGF3YWl0IGdldERldmljZXModG9rZW4pXG4gICAgICAgICAgICBpZiAoZGV2aWNlcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiTm8gc2UgaGFuIG9idGVuaWRvIGxvcyBkaXNwb3NpdGl2b3NcIilcbiAgICAgICAgICAgICAgICAgc2V0RGV2aWNlcyhbXSlcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2V0RGV2aWNlcyhkZXZpY2VzKVxuICAgICAgICAgICAgICAgIHNldFNob3dEZXZpY2VzSW5mbyhkZXZpY2VzLm1hcCgoKSA9PiB0cnVlKSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmZXRjaERldmljZXModG9rZW4gYXMgc3RyaW5nKVxuICAgIH0sIFtdKVxuXG4gICAgY29uc3QgaGFuZGxlRGV2aWNlSW5mb0J1dHRvbiA9IChkZXZpY2VfaW5kZXg6IGFueSkgPT4ge1xuICAgICAgICBzZXRTaG93RGV2aWNlc0luZm8oc2hvd0RldmljZXNJbmZvLm1hcCgoc2hvdywgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGluZGV4KVxuICAgICAgICAgICAgaWYgKGluZGV4ID09IGRldmljZV9pbmRleCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHNob3cpXG4gICAgICAgICAgICAgICAgcmV0dXJuICFzaG93XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHJldHVybiBzaG93XG4gICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgICAgY29uc29sZS5sb2coc2hvd0RldmljZXNJbmZvKVxuICAgIH1cbiAgICBcbiAgICBjb25zdCBEZXZpY2VJbmZvID0gKGRldmljZTogYW55KSA9PiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8bWFpbj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBoLWZ1bGwgZmxleCBqdXN0aWZ5LWNlbnRlciBpdGVtcy1jZW50ZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPEltYWdlIGNsYXNzTmFtZT1cInAtMVwiIHNyYz1cIi9yYXNwLWltYWdlLnBuZ1wiIGFsdD1cIlwiIHdpZHRoPVwiNjAwXCIgaGVpZ2h0PVwiMFwiPjwvSW1hZ2U+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwLTUgcm93LXNwYW4tMyB3LWZ1bGwgaC1mdWxsXCI+XG4gICAgICAgICAgICAgICAgICAgIDxwPklwOiB7ZGV2aWNlLmlwfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgPHA+QWN0aXZvOiB7ZGV2aWNlLmF2YWlsYWJsZSA/IFwiU2lcIiA6IFwiTm9cIn08L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwPkxhdGl0dWQ6IHtkZXZpY2UuTGF0aXR1ZH08L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwPkxvbmdpdHVkOiB7ZGV2aWNlLkxvbmdpdHVkfTwvcD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvbWFpbj5cbiAgICAgICAgKVxuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICAgIDxtYWluPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwYi0zIG1kOmdyaWQgZ3JpZC1jb2xzLTMgZ2FwLTUgbWluLXctNjAgaC0xNlwiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3NOYW1lPVwidy1mdWxsIGgtZnVsbCB0ZXh0LXdoaXRlIGZvbnQtbWVkaXVtIGJnLWluZGlnby02MDAgaG92ZXI6YmctaW5kaWdvLTUwMCBhY3RpdmU6YmctaW5kaWdvLTYwMCByb3VuZGVkLWxnIGR1cmF0aW9uLTE1MFwiPkHDsWFkaXIgRGlzcG9zaXRpdm88L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8ZGl2PjwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXY+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIGgtZnVsbCBncmlkIGdyaWQtY29scy0xIHNtOmdyaWQtY29scy0yIG1kOmdyaWQtY29scy0xIGxnOmdyaWQtY29scy0yIHhsOmdyaWQtY29scy0zIGdhcC01XCI+XG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZGV2aWNlcy5tYXAoKGRldmljZXMsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8TGlua1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGtleT17ZGV2aWNlc31cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBocmVmPXtcIi9kYXNoYm9hcmQvZGV2aWNlcy9cIn1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJiZy1ncmF5LTUwIGJvcmRlciB3LWZ1bGwgaC1mdWxsIG1pbi1oLTYwIG1pbi13LTYwIG1heC1oLTgwIHJvdW5kZWQtbWQgc2hhZG93LW1kIGhvdmVyOnNoYWRvdy1sZyB0cmFuc2l0aW9uIGR1cmF0aW9uLTIwMCBlYXNlLWluLW91dFwiXG4gICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgaC1mdWxsIGZsZXgganVzdGlmeS1jZW50ZXIgaXRlbXMtY2VudGVyIGdyaWQgZ3JpZC1jb2xzLTIgZ3JpZC1yb3dzLTRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgaC1mdWxsIHJvdy1zcGFuLTNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtzaG93RGV2aWNlc0luZm9baW5kZXhdICYmIERldmljZUluZm8oZGV2aWNlcyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbC1zcGFuLTIgZ3JpZCBncmlkLWNvbHMtNSBmbGV4IGp1c3RpZnktYmV0d2VlbiBiZy13aGl0ZSB3LWZ1bGwgaC1mdWxsIGJvcmRlci10IHJvdW5kZWQtbWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMSBjbGFzc05hbWU9XCJjb2wtc3Bhbi00IHAtNSB0ZXh0LTJ4bFwiPiN7ZGV2aWNlcy5pZH08L2gxPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhpbmRleCkgPT4gaGFuZGxlRGV2aWNlSW5mb0J1dHRvbihpbmRleCl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYm9yZGVyLWwgZmxleCBqdXN0aWZ5LWNlbnRlciBpdGVtcy1jZW50ZXIgcm91bmRlZC1tZCBob3ZlcjpiZy1ncmF5LTUwXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPEVsbGlwc2lzVmVydGljYWxJY29uIGNsYXNzTmFtZT1cInctMS8yIGgtMS8yXCIvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9MaW5rPlxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIDwvZGl2PiAgIFxuICAgICAgICA8L21haW4+XG4gICAgKVxufSJdLCJuYW1lcyI6WyJMaW5rIiwiSW1hZ2UiLCJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsImdldERldmljZXMiLCJnZXRDb29raWUiLCJ1c2VSb3V0ZXIiLCJFbGxpcHNpc1ZlcnRpY2FsSWNvbiIsIlBhZ2UiLCJkZXZpY2VzIiwic2V0RGV2aWNlcyIsInNob3dEZXZpY2VzSW5mbyIsInNldFNob3dEZXZpY2VzSW5mbyIsInJvdXRlciIsInRva2VuIiwidW5kZWZpbmVkIiwicHVzaCIsImZldGNoRGV2aWNlcyIsImNvbnNvbGUiLCJsb2ciLCJtYXAiLCJoYW5kbGVEZXZpY2VJbmZvQnV0dG9uIiwiZGV2aWNlX2luZGV4Iiwic2hvdyIsImluZGV4IiwiRGV2aWNlSW5mbyIsImRldmljZSIsIm1haW4iLCJkaXYiLCJjbGFzc05hbWUiLCJzcmMiLCJhbHQiLCJ3aWR0aCIsImhlaWdodCIsInAiLCJpcCIsImF2YWlsYWJsZSIsIkxhdGl0dWQiLCJMb25naXR1ZCIsImJ1dHRvbiIsImhyZWYiLCJoMSIsImlkIiwib25DbGljayJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/dashboard/devices/page.tsx\n"));

/***/ })

});