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

/***/ "(app-pages-browser)/./src/app/ui/dashboard/devicesCharts.jsx":
/*!************************************************!*\
  !*** ./src/app/ui/dashboard/devicesCharts.jsx ***!
  \************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ChartComponent: function() { return /* binding */ ChartComponent; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/jsx-dev-runtime.js\");\n/* harmony import */ var lightweight_charts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lightweight-charts */ \"(app-pages-browser)/./node_modules/lightweight-charts/dist/lightweight-charts.development.mjs\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"(app-pages-browser)/./node_modules/next/dist/compiled/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n\nvar _s = $RefreshSig$();\n\n\nconst ChartComponent = (props)=>{\n    _s();\n    const { data, className, colors: { backgroundColor = \"white\", lineColor = \"#2962FF\", textColor = \"black\", areaTopColor = \"#2962FF\", areaBottomColor = \"rgba(41, 98, 255, 0.28)\" } = {} } = props;\n    const chartContainerRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)();\n    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{\n        const chart = (0,lightweight_charts__WEBPACK_IMPORTED_MODULE_1__.createChart)(chartContainerRef.current, {\n            layout: {\n                background: {\n                    type: lightweight_charts__WEBPACK_IMPORTED_MODULE_1__.ColorType.Solid,\n                    color: backgroundColor\n                },\n                textColor\n            },\n            width: 500,\n            height: 300,\n            timeScale: {\n                timeVisible: true,\n                secondsVisible: false\n            }\n        });\n        chart.timeScale().fitContent();\n        const newSeries = chart.addAreaSeries({\n            lineColor,\n            topColor: areaTopColor,\n            bottomColor: areaBottomColor\n        });\n        newSeries.setData(data);\n        return ()=>{\n            chart.remove();\n        };\n    }, [\n        data,\n        backgroundColor,\n        lineColor,\n        textColor,\n        areaTopColor,\n        areaBottomColor\n    ]);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: className,\n        ref: chartContainerRef\n    }, void 0, false, {\n        fileName: \"/Users/dev-francm/Documents/tfg-riego-inteligente/frontend/src/app/ui/dashboard/devicesCharts.jsx\",\n        lineNumber: 47,\n        columnNumber: 3\n    }, undefined);\n};\n_s(ChartComponent, \"ZI1LdXO604IZpmh0kAttG3FSLiA=\");\n_c = ChartComponent;\nvar _c;\n$RefreshReg$(_c, \"ChartComponent\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvdWkvZGFzaGJvYXJkL2RldmljZXNDaGFydHMuanN4IiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBNEQ7QUFDWDtBQUUxQyxNQUFNSyxpQkFBaUJDLENBQUFBOztJQUM3QixNQUFNLEVBQ0xDLElBQUksRUFDRUMsU0FBUyxFQUNmQyxRQUFRLEVBQ1BDLGtCQUFrQixPQUFPLEVBQ3pCQyxZQUFZLFNBQVMsRUFDckJDLFlBQVksT0FBTyxFQUNuQkMsZUFBZSxTQUFTLEVBQ3hCQyxrQkFBa0IseUJBQXlCLEVBQzNDLEdBQUcsQ0FBQyxDQUFDLEVBQ04sR0FBR1I7SUFFSixNQUFNUyxvQkFBb0JYLDZDQUFNQTtJQUVoQ0QsZ0RBQVNBLENBQ1I7UUFDQyxNQUFNYSxRQUFRaEIsK0RBQVdBLENBQUNlLGtCQUFrQkUsT0FBTyxFQUFFO1lBQ3BEQyxRQUFRO2dCQUNQQyxZQUFZO29CQUFFQyxNQUFNbkIseURBQVNBLENBQUNvQixLQUFLO29CQUFFQyxPQUFPWjtnQkFBZ0I7Z0JBQzVERTtZQUNEO1lBQ0FXLE9BQU87WUFDUEMsUUFBUTtZQUNSQyxXQUFXO2dCQUNWQyxhQUFhO2dCQUNiQyxnQkFBZ0I7WUFDakI7UUFDRDtRQUVBWCxNQUFNUyxTQUFTLEdBQUdHLFVBQVU7UUFFNUIsTUFBTUMsWUFBWWIsTUFBTWMsYUFBYSxDQUFDO1lBQUVuQjtZQUFXb0IsVUFBVWxCO1lBQWNtQixhQUFhbEI7UUFBZ0I7UUFDeEdlLFVBQVVJLE9BQU8sQ0FBQzFCO1FBRWxCLE9BQU87WUFDTlMsTUFBTWtCLE1BQU07UUFDYjtJQUNELEdBQ0E7UUFBQzNCO1FBQU1HO1FBQWlCQztRQUFXQztRQUFXQztRQUFjQztLQUFnQjtJQUc3RSxxQkFDQyw4REFBQ3FCO1FBQUkzQixXQUFXQTtRQUNmNEIsS0FBS3JCOzs7Ozs7QUFHUixFQUFFO0dBL0NXVjtLQUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvYXBwL3VpL2Rhc2hib2FyZC9kZXZpY2VzQ2hhcnRzLmpzeD81NTVkIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGNyZWF0ZUNoYXJ0LCBDb2xvclR5cGUgfSBmcm9tICdsaWdodHdlaWdodC1jaGFydHMnO1xuaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlUmVmIH0gZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgY29uc3QgQ2hhcnRDb21wb25lbnQgPSBwcm9wcyA9PiB7XG5cdGNvbnN0IHtcblx0XHRkYXRhLFxuICAgICAgICBjbGFzc05hbWUsXG5cdFx0Y29sb3JzOiB7XG5cdFx0XHRiYWNrZ3JvdW5kQ29sb3IgPSAnd2hpdGUnLFxuXHRcdFx0bGluZUNvbG9yID0gJyMyOTYyRkYnLFxuXHRcdFx0dGV4dENvbG9yID0gJ2JsYWNrJyxcblx0XHRcdGFyZWFUb3BDb2xvciA9ICcjMjk2MkZGJyxcblx0XHRcdGFyZWFCb3R0b21Db2xvciA9ICdyZ2JhKDQxLCA5OCwgMjU1LCAwLjI4KScsXG5cdFx0fSA9IHt9LFxuXHR9ID0gcHJvcHM7XG5cblx0Y29uc3QgY2hhcnRDb250YWluZXJSZWYgPSB1c2VSZWYoKTtcblxuXHR1c2VFZmZlY3QoXG5cdFx0KCkgPT4ge1xuXHRcdFx0Y29uc3QgY2hhcnQgPSBjcmVhdGVDaGFydChjaGFydENvbnRhaW5lclJlZi5jdXJyZW50LCB7XG5cdFx0XHRcdGxheW91dDoge1xuXHRcdFx0XHRcdGJhY2tncm91bmQ6IHsgdHlwZTogQ29sb3JUeXBlLlNvbGlkLCBjb2xvcjogYmFja2dyb3VuZENvbG9yIH0sXG5cdFx0XHRcdFx0dGV4dENvbG9yLFxuXHRcdFx0XHR9LFxuXHRcdFx0XHR3aWR0aDogNTAwLFxuXHRcdFx0XHRoZWlnaHQ6IDMwMCxcblx0XHRcdFx0dGltZVNjYWxlOiB7XG5cdFx0XHRcdFx0dGltZVZpc2libGU6IHRydWUsXG5cdFx0XHRcdFx0c2Vjb25kc1Zpc2libGU6IGZhbHNlLFxuXHRcdFx0XHR9XG5cdFx0XHR9KVxuXG5cdFx0XHRjaGFydC50aW1lU2NhbGUoKS5maXRDb250ZW50KClcblxuXHRcdFx0Y29uc3QgbmV3U2VyaWVzID0gY2hhcnQuYWRkQXJlYVNlcmllcyh7IGxpbmVDb2xvciwgdG9wQ29sb3I6IGFyZWFUb3BDb2xvciwgYm90dG9tQ29sb3I6IGFyZWFCb3R0b21Db2xvciB9KTtcblx0XHRcdG5ld1Nlcmllcy5zZXREYXRhKGRhdGEpO1xuXG5cdFx0XHRyZXR1cm4gKCkgPT4ge1xuXHRcdFx0XHRjaGFydC5yZW1vdmUoKTtcblx0XHRcdH07XG5cdFx0fSxcblx0XHRbZGF0YSwgYmFja2dyb3VuZENvbG9yLCBsaW5lQ29sb3IsIHRleHRDb2xvciwgYXJlYVRvcENvbG9yLCBhcmVhQm90dG9tQ29sb3JdXG5cdCk7XG5cblx0cmV0dXJuIChcblx0XHQ8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lfVxuXHRcdFx0cmVmPXtjaGFydENvbnRhaW5lclJlZn1cblx0XHQvPlxuXHQpO1xufTsiXSwibmFtZXMiOlsiY3JlYXRlQ2hhcnQiLCJDb2xvclR5cGUiLCJSZWFjdCIsInVzZUVmZmVjdCIsInVzZVJlZiIsIkNoYXJ0Q29tcG9uZW50IiwicHJvcHMiLCJkYXRhIiwiY2xhc3NOYW1lIiwiY29sb3JzIiwiYmFja2dyb3VuZENvbG9yIiwibGluZUNvbG9yIiwidGV4dENvbG9yIiwiYXJlYVRvcENvbG9yIiwiYXJlYUJvdHRvbUNvbG9yIiwiY2hhcnRDb250YWluZXJSZWYiLCJjaGFydCIsImN1cnJlbnQiLCJsYXlvdXQiLCJiYWNrZ3JvdW5kIiwidHlwZSIsIlNvbGlkIiwiY29sb3IiLCJ3aWR0aCIsImhlaWdodCIsInRpbWVTY2FsZSIsInRpbWVWaXNpYmxlIiwic2Vjb25kc1Zpc2libGUiLCJmaXRDb250ZW50IiwibmV3U2VyaWVzIiwiYWRkQXJlYVNlcmllcyIsInRvcENvbG9yIiwiYm90dG9tQ29sb3IiLCJzZXREYXRhIiwicmVtb3ZlIiwiZGl2IiwicmVmIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/ui/dashboard/devicesCharts.jsx\n"));

/***/ })

});