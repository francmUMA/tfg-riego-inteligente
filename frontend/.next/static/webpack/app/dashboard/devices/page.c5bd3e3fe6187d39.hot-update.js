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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Page; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ \"(app-pages-browser)/./node_modules/next/dist/api/link.js\");\n/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/image */ \"(app-pages-browser)/./node_modules/next/dist/api/image.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _lib_devicesInfo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../lib/devicesInfo */ \"(app-pages-browser)/./src/app/lib/devicesInfo.ts\");\n/* harmony import */ var cookies_next__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! cookies-next */ \"(app-pages-browser)/./node_modules/cookies-next/lib/index.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! next/navigation */ \"(app-pages-browser)/./node_modules/next/dist/api/navigation.js\");\n/* harmony import */ var _barrel_optimize_names_EllipsisVerticalIcon_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! __barrel_optimize__?names=EllipsisVerticalIcon!=!@heroicons/react/24/outline */ \"(app-pages-browser)/./node_modules/@heroicons/react/24/outline/esm/EllipsisVerticalIcon.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\n\n\nfunction Page() {\n    _s();\n    const [devices, setDevices] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)([]);\n    const [showDevicesInfo, setShowDevicesInfo] = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)([\n        true\n    ]);\n    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_6__.useRouter)();\n    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{\n        const token = (0,cookies_next__WEBPACK_IMPORTED_MODULE_5__.getCookie)(\"token\");\n        if (token === undefined) router.push(\"/login\");\n        const fetchDevices = async (token)=>{\n            const devices = await (0,_lib_devicesInfo__WEBPACK_IMPORTED_MODULE_4__.getDevices)(token);\n            if (devices === undefined) {\n                console.log(\"No se han obtenido los dispositivos\");\n                setDevices([]);\n            } else {\n                console.log(devices);\n                setDevices(devices);\n            }\n        };\n        fetchDevices(token);\n        // Inicializar estado de los dispositivos\n        let showData = [];\n        for(let i = 0; i < devices.length; i++){\n            showData.push(true);\n        }\n        setShowDevicesInfo(showData);\n        console.log(showDevicesInfo);\n    }, []);\n    const handleDeviceInfoButton = (device)=>{\n        device.showData = !device.showData;\n    };\n    const DeviceInfo = (device)=>{\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"w-full h-full flex justify-center items-center\",\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_image__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n                        className: \"p-1\",\n                        src: \"/rasp-image.png\",\n                        alt: \"\",\n                        width: \"600\",\n                        height: \"0\"\n                    }, void 0, false, {\n                        fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                        lineNumber: 47,\n                        columnNumber: 21\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                    lineNumber: 46,\n                    columnNumber: 17\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                    className: \"p-5 row-span-3 w-full h-full\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                            children: [\n                                \"Ip: \",\n                                device.ip\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                            lineNumber: 50,\n                            columnNumber: 21\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                            children: [\n                                \"Activo: \",\n                                device.available ? \"Si\" : \"No\"\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                            lineNumber: 51,\n                            columnNumber: 21\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                            children: [\n                                \"Latitud: \",\n                                device.Latitud\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                            lineNumber: 52,\n                            columnNumber: 21\n                        }, this),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n                            children: [\n                                \"Longitud: \",\n                                device.Longitud\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                            lineNumber: 53,\n                            columnNumber: 21\n                        }, this)\n                    ]\n                }, void 0, true, {\n                    fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                    lineNumber: 49,\n                    columnNumber: 17\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n            lineNumber: 45,\n            columnNumber: 13\n        }, this);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"pb-3 md:grid grid-cols-3 gap-5 min-w-60 h-16\",\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        className: \"w-full h-full text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150\",\n                        children: \"A\\xf1adir Dispositivo\"\n                    }, void 0, false, {\n                        fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                        lineNumber: 62,\n                        columnNumber: 17\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {}, void 0, false, {\n                        fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                        lineNumber: 63,\n                        columnNumber: 17\n                    }, this),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {}, void 0, false, {\n                        fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                        lineNumber: 64,\n                        columnNumber: 17\n                    }, this)\n                ]\n            }, void 0, true, {\n                fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                lineNumber: 61,\n                columnNumber: 13\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: \"w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5\",\n                children: devices.map((devices, index)=>{\n                    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(next_link__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {\n                        href: \"/dashboard/devices/\",\n                        className: \"bg-gray-50 border w-full h-full min-h-60 min-w-60 max-h-80 rounded-md shadow-md hover:shadow-lg transition duration-200 ease-in-out\",\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"w-full h-full flex justify-center items-center grid grid-cols-2 grid-rows-4\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"w-full h-full row-span-3\",\n                                    children: showDevicesInfo[index] && DeviceInfo(devices)\n                                }, void 0, false, {\n                                    fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                                    lineNumber: 76,\n                                    columnNumber: 33\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                                    className: \"col-span-2 grid grid-cols-5 flex justify-between bg-white w-full h-full border-t rounded-md\",\n                                    children: [\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                                            className: \"col-span-4 p-5 text-2xl\",\n                                            children: [\n                                                \"#\",\n                                                devices.id\n                                            ]\n                                        }, void 0, true, {\n                                            fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                                            lineNumber: 80,\n                                            columnNumber: 37\n                                        }, this),\n                                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                            className: \"border-l flex justify-center items-center rounded-md hover:bg-gray-50\",\n                                            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_barrel_optimize_names_EllipsisVerticalIcon_heroicons_react_24_outline__WEBPACK_IMPORTED_MODULE_7__[\"default\"], {\n                                                className: \"w-1/2 h-1/2\"\n                                            }, void 0, false, {\n                                                fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                                                lineNumber: 83,\n                                                columnNumber: 41\n                                            }, this)\n                                        }, void 0, false, {\n                                            fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                                            lineNumber: 81,\n                                            columnNumber: 37\n                                        }, this)\n                                    ]\n                                }, void 0, true, {\n                                    fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                                    lineNumber: 79,\n                                    columnNumber: 33\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                            lineNumber: 75,\n                            columnNumber: 29\n                        }, this)\n                    }, devices, false, {\n                        fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                        lineNumber: 70,\n                        columnNumber: 25\n                    }, this);\n                })\n            }, void 0, false, {\n                fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n                lineNumber: 66,\n                columnNumber: 13\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/dashboard/devices/page.tsx\",\n        lineNumber: 60,\n        columnNumber: 9\n    }, this);\n}\n_s(Page, \"9YunzLki8k9xHZPZ9IzrFlrcO5M=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_6__.useRouter\n    ];\n});\n_c = Page;\nvar _c;\n$RefreshReg$(_c, \"Page\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvZGFzaGJvYXJkL2RldmljZXMvcGFnZS50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQzRCO0FBQ0U7QUFDYTtBQUNPO0FBQ1Y7QUFDRztBQUN3QjtBQUVwRCxTQUFTUTs7SUFDcEIsTUFBTSxDQUFDQyxTQUFTQyxXQUFXLEdBQUdQLCtDQUFRQSxDQUFDLEVBQUU7SUFDekMsTUFBTSxDQUFDUSxpQkFBaUJDLG1CQUFtQixHQUFHVCwrQ0FBUUEsQ0FBQztRQUFDO0tBQUs7SUFDN0QsTUFBTVUsU0FBU1AsMERBQVNBO0lBRXhCSixnREFBU0EsQ0FBQztRQUNOLE1BQU1ZLFFBQVFULHVEQUFTQSxDQUFDO1FBQ3hCLElBQUlTLFVBQVVDLFdBQVdGLE9BQU9HLElBQUksQ0FBQztRQUNyQyxNQUFNQyxlQUFlLE9BQU9IO1lBQ3hCLE1BQU1MLFVBQVUsTUFBTUwsNERBQVVBLENBQUNVO1lBQ2pDLElBQUlMLFlBQVlNLFdBQVc7Z0JBQ3RCRyxRQUFRQyxHQUFHLENBQUM7Z0JBQ1pULFdBQVcsRUFBRTtZQUNsQixPQUFPO2dCQUNIUSxRQUFRQyxHQUFHLENBQUNWO2dCQUNaQyxXQUFXRDtZQUNmO1FBQ0o7UUFDQVEsYUFBYUg7UUFFYix5Q0FBeUM7UUFDekMsSUFBSU0sV0FBVyxFQUFFO1FBQ2pCLElBQUssSUFBSUMsSUFBSSxHQUFHQSxJQUFJWixRQUFRYSxNQUFNLEVBQUVELElBQUs7WUFDckNELFNBQVNKLElBQUksQ0FBQztRQUNsQjtRQUNBSixtQkFBbUJRO1FBQ25CRixRQUFRQyxHQUFHLENBQUNSO0lBQ2hCLEdBQUcsRUFBRTtJQUVMLE1BQU1ZLHlCQUF5QixDQUFDQztRQUM1QkEsT0FBT0osUUFBUSxHQUFHLENBQUNJLE9BQU9KLFFBQVE7SUFDdEM7SUFFQSxNQUFNSyxhQUFhLENBQUNEO1FBQ2hCLHFCQUNJLDhEQUFDRTs7OEJBQ0csOERBQUNDO29CQUFJQyxXQUFVOzhCQUNYLDRFQUFDM0Isa0RBQUtBO3dCQUFDMkIsV0FBVTt3QkFBTUMsS0FBSTt3QkFBa0JDLEtBQUk7d0JBQUdDLE9BQU07d0JBQU1DLFFBQU87Ozs7Ozs7Ozs7OzhCQUUzRSw4REFBQ0w7b0JBQUlDLFdBQVU7O3NDQUNYLDhEQUFDSzs7Z0NBQUU7Z0NBQUtULE9BQU9VLEVBQUU7Ozs7Ozs7c0NBQ2pCLDhEQUFDRDs7Z0NBQUU7Z0NBQVNULE9BQU9XLFNBQVMsR0FBRyxPQUFPOzs7Ozs7O3NDQUN0Qyw4REFBQ0Y7O2dDQUFFO2dDQUFVVCxPQUFPWSxPQUFPOzs7Ozs7O3NDQUMzQiw4REFBQ0g7O2dDQUFFO2dDQUFXVCxPQUFPYSxRQUFROzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBSTdDO0lBRUEscUJBQ0ksOERBQUNYOzswQkFDRyw4REFBQ0M7Z0JBQUlDLFdBQVU7O2tDQUNYLDhEQUFDVTt3QkFBT1YsV0FBVTtrQ0FBc0g7Ozs7OztrQ0FDeEksOERBQUNEOzs7OztrQ0FDRCw4REFBQ0E7Ozs7Ozs7Ozs7OzBCQUVMLDhEQUFDQTtnQkFBSUMsV0FBVTswQkFFWG5CLFFBQVE4QixHQUFHLENBQUMsQ0FBQzlCLFNBQVMrQjtvQkFDbEIscUJBQ0ksOERBQUN4QyxpREFBSUE7d0JBRUR5QyxNQUFNO3dCQUNOYixXQUFVO2tDQUVWLDRFQUFDRDs0QkFBSUMsV0FBVTs7OENBQ1gsOERBQUNEO29DQUFJQyxXQUFVOzhDQUNWakIsZUFBZSxDQUFDNkIsTUFBTSxJQUFJZixXQUFXaEI7Ozs7Ozs4Q0FFMUMsOERBQUNrQjtvQ0FBSUMsV0FBVTs7c0RBQ1gsOERBQUNjOzRDQUFHZCxXQUFVOztnREFBMEI7Z0RBQUVuQixRQUFRa0MsRUFBRTs7Ozs7OztzREFDcEQsOERBQUNMOzRDQUNHVixXQUFVO3NEQUNWLDRFQUFDckIsOEdBQW9CQTtnREFBQ3FCLFdBQVU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O3VCQVp2Q25COzs7OztnQkFrQmpCOzs7Ozs7Ozs7Ozs7QUFLaEI7R0FwRndCRDs7UUFHTEYsc0RBQVNBOzs7S0FISkUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2FwcC9kYXNoYm9hcmQvZGV2aWNlcy9wYWdlLnRzeD83YzY0Il0sInNvdXJjZXNDb250ZW50IjpbIid1c2UgY2xpZW50J1xuaW1wb3J0IExpbmsgZnJvbSBcIm5leHQvbGlua1wiXG5pbXBvcnQgSW1hZ2UgZnJvbSBcIm5leHQvaW1hZ2VcIlxuaW1wb3J0IHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiXG5pbXBvcnQgeyBnZXREZXZpY2VzIH0gZnJvbSBcIi4uLy4uL2xpYi9kZXZpY2VzSW5mb1wiXG5pbXBvcnQgeyBnZXRDb29raWUgfSBmcm9tIFwiY29va2llcy1uZXh0XCJcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gXCJuZXh0L25hdmlnYXRpb25cIlxuaW1wb3J0IHsgRWxsaXBzaXNWZXJ0aWNhbEljb24gIH0gZnJvbSBcIkBoZXJvaWNvbnMvcmVhY3QvMjQvb3V0bGluZVwiXG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIFBhZ2UoKSB7XG4gICAgY29uc3QgW2RldmljZXMsIHNldERldmljZXNdID0gdXNlU3RhdGUoW10pXG4gICAgY29uc3QgW3Nob3dEZXZpY2VzSW5mbywgc2V0U2hvd0RldmljZXNJbmZvXSA9IHVzZVN0YXRlKFt0cnVlXSlcbiAgICBjb25zdCByb3V0ZXIgPSB1c2VSb3V0ZXIoKVxuXG4gICAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICAgICAgY29uc3QgdG9rZW4gPSBnZXRDb29raWUoXCJ0b2tlblwiKVxuICAgICAgICBpZiAodG9rZW4gPT09IHVuZGVmaW5lZCkgcm91dGVyLnB1c2goXCIvbG9naW5cIilcbiAgICAgICAgY29uc3QgZmV0Y2hEZXZpY2VzID0gYXN5bmMgKHRva2VuOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGRldmljZXMgPSBhd2FpdCBnZXREZXZpY2VzKHRva2VuKVxuICAgICAgICAgICAgaWYgKGRldmljZXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIk5vIHNlIGhhbiBvYnRlbmlkbyBsb3MgZGlzcG9zaXRpdm9zXCIpXG4gICAgICAgICAgICAgICAgIHNldERldmljZXMoW10pXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRldmljZXMpXG4gICAgICAgICAgICAgICAgc2V0RGV2aWNlcyhkZXZpY2VzKVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGZldGNoRGV2aWNlcyh0b2tlbiBhcyBzdHJpbmcpXG5cbiAgICAgICAgLy8gSW5pY2lhbGl6YXIgZXN0YWRvIGRlIGxvcyBkaXNwb3NpdGl2b3NcbiAgICAgICAgbGV0IHNob3dEYXRhID0gW11cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkZXZpY2VzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBzaG93RGF0YS5wdXNoKHRydWUpXG4gICAgICAgIH1cbiAgICAgICAgc2V0U2hvd0RldmljZXNJbmZvKHNob3dEYXRhKVxuICAgICAgICBjb25zb2xlLmxvZyhzaG93RGV2aWNlc0luZm8pXG4gICAgfSwgW10pXG5cbiAgICBjb25zdCBoYW5kbGVEZXZpY2VJbmZvQnV0dG9uID0gKGRldmljZTogYW55KSA9PiB7XG4gICAgICAgIGRldmljZS5zaG93RGF0YSA9ICFkZXZpY2Uuc2hvd0RhdGFcbiAgICB9XG4gICAgXG4gICAgY29uc3QgRGV2aWNlSW5mbyA9IChkZXZpY2U6IGFueSkgPT4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPG1haW4+XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ3LWZ1bGwgaC1mdWxsIGZsZXgganVzdGlmeS1jZW50ZXIgaXRlbXMtY2VudGVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxJbWFnZSBjbGFzc05hbWU9XCJwLTFcIiBzcmM9XCIvcmFzcC1pbWFnZS5wbmdcIiBhbHQ9XCJcIiB3aWR0aD1cIjYwMFwiIGhlaWdodD1cIjBcIj48L0ltYWdlPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicC01IHJvdy1zcGFuLTMgdy1mdWxsIGgtZnVsbFwiPlxuICAgICAgICAgICAgICAgICAgICA8cD5JcDoge2RldmljZS5pcH08L3A+XG4gICAgICAgICAgICAgICAgICAgIDxwPkFjdGl2bzoge2RldmljZS5hdmFpbGFibGUgPyBcIlNpXCIgOiBcIk5vXCJ9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8cD5MYXRpdHVkOiB7ZGV2aWNlLkxhdGl0dWR9PC9wPlxuICAgICAgICAgICAgICAgICAgICA8cD5Mb25naXR1ZDoge2RldmljZS5Mb25naXR1ZH08L3A+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L21haW4+XG4gICAgICAgIClcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgICA8bWFpbj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicGItMyBtZDpncmlkIGdyaWQtY29scy0zIGdhcC01IG1pbi13LTYwIGgtMTZcIj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzTmFtZT1cInctZnVsbCBoLWZ1bGwgdGV4dC13aGl0ZSBmb250LW1lZGl1bSBiZy1pbmRpZ28tNjAwIGhvdmVyOmJnLWluZGlnby01MDAgYWN0aXZlOmJnLWluZGlnby02MDAgcm91bmRlZC1sZyBkdXJhdGlvbi0xNTBcIj5Bw7FhZGlyIERpc3Bvc2l0aXZvPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGRpdj48L2Rpdj5cbiAgICAgICAgICAgICAgICA8ZGl2PjwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInctZnVsbCBoLWZ1bGwgZ3JpZCBncmlkLWNvbHMtMSBzbTpncmlkLWNvbHMtMiBtZDpncmlkLWNvbHMtMSBsZzpncmlkLWNvbHMtMiB4bDpncmlkLWNvbHMtMyBnYXAtNVwiPlxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGRldmljZXMubWFwKChkZXZpY2VzLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICAgICAgPExpbmtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e2RldmljZXN9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaHJlZj17XCIvZGFzaGJvYXJkL2RldmljZXMvXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYmctZ3JheS01MCBib3JkZXIgdy1mdWxsIGgtZnVsbCBtaW4taC02MCBtaW4tdy02MCBtYXgtaC04MCByb3VuZGVkLW1kIHNoYWRvdy1tZCBob3ZlcjpzaGFkb3ctbGcgdHJhbnNpdGlvbiBkdXJhdGlvbi0yMDAgZWFzZS1pbi1vdXRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIGgtZnVsbCBmbGV4IGp1c3RpZnktY2VudGVyIGl0ZW1zLWNlbnRlciBncmlkIGdyaWQtY29scy0yIGdyaWQtcm93cy00XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidy1mdWxsIGgtZnVsbCByb3ctc3Bhbi0zXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7c2hvd0RldmljZXNJbmZvW2luZGV4XSAmJiBEZXZpY2VJbmZvKGRldmljZXMpfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJjb2wtc3Bhbi0yIGdyaWQgZ3JpZC1jb2xzLTUgZmxleCBqdXN0aWZ5LWJldHdlZW4gYmctd2hpdGUgdy1mdWxsIGgtZnVsbCBib3JkZXItdCByb3VuZGVkLW1kXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDEgY2xhc3NOYW1lPVwiY29sLXNwYW4tNCBwLTUgdGV4dC0yeGxcIj4je2RldmljZXMuaWR9PC9oMT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJib3JkZXItbCBmbGV4IGp1c3RpZnktY2VudGVyIGl0ZW1zLWNlbnRlciByb3VuZGVkLW1kIGhvdmVyOmJnLWdyYXktNTBcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8RWxsaXBzaXNWZXJ0aWNhbEljb24gY2xhc3NOYW1lPVwidy0xLzIgaC0xLzJcIi8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L0xpbms+XG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9kaXY+ICAgXG4gICAgICAgIDwvbWFpbj5cbiAgICApXG59Il0sIm5hbWVzIjpbIkxpbmsiLCJJbWFnZSIsInVzZUVmZmVjdCIsInVzZVN0YXRlIiwiZ2V0RGV2aWNlcyIsImdldENvb2tpZSIsInVzZVJvdXRlciIsIkVsbGlwc2lzVmVydGljYWxJY29uIiwiUGFnZSIsImRldmljZXMiLCJzZXREZXZpY2VzIiwic2hvd0RldmljZXNJbmZvIiwic2V0U2hvd0RldmljZXNJbmZvIiwicm91dGVyIiwidG9rZW4iLCJ1bmRlZmluZWQiLCJwdXNoIiwiZmV0Y2hEZXZpY2VzIiwiY29uc29sZSIsImxvZyIsInNob3dEYXRhIiwiaSIsImxlbmd0aCIsImhhbmRsZURldmljZUluZm9CdXR0b24iLCJkZXZpY2UiLCJEZXZpY2VJbmZvIiwibWFpbiIsImRpdiIsImNsYXNzTmFtZSIsInNyYyIsImFsdCIsIndpZHRoIiwiaGVpZ2h0IiwicCIsImlwIiwiYXZhaWxhYmxlIiwiTGF0aXR1ZCIsIkxvbmdpdHVkIiwiYnV0dG9uIiwibWFwIiwiaW5kZXgiLCJocmVmIiwiaDEiLCJpZCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/dashboard/devices/page.tsx\n"));

/***/ })

});