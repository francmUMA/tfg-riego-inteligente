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

/***/ "(app-pages-browser)/./src/app/lib/sensorsUtils.ts":
/*!*************************************!*\
  !*** ./src/app/lib/sensorsUtils.ts ***!
  \*************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addSensor: function() { return /* binding */ addSensor; },\n/* harmony export */   checkSensorId: function() { return /* binding */ checkSensorId; },\n/* harmony export */   getSensors: function() { return /* binding */ getSensors; },\n/* harmony export */   updateSensorArea: function() { return /* binding */ updateSensorArea; }\n/* harmony export */ });\nasync function getSensors(device, token) {\n    let options = {\n        method: \"GET\",\n        headers: {\n            \"Authorization\": \"Bearer \" + token\n        }\n    };\n    let request = await fetch(\"http://192.168.1.139:3000/api\" + \"/sensores/\" + device, options);\n    if (request.status === 200) {\n        return await request.json();\n    } else {\n        return [];\n    }\n}\nasync function checkSensorId(sensors, id) {\n    return !sensors.find((sensor)=>sensor.id == id);\n}\nasync function addSensor(id, device, token, type) {\n    let options = {\n        method: \"POST\",\n        headers: {\n            \"Authorization\": \"Bearer \" + token,\n            \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify({\n            id: id,\n            type: type\n        })\n    };\n    let request = await fetch(\"http://192.168.1.139:3000/api\" + \"/sensores/\" + device, options);\n    if (request.status === 200) {\n        return true;\n    } else {\n        return false;\n    }\n}\nasync function updateSensorArea(id, area, token) {\n    let options = {\n        method: \"PUT\",\n        headers: {\n            \"Authorization\": \"Bearer \" + token,\n            \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify({\n            area: area\n        })\n    };\n    let request = await fetch(\"http://192.168.1.139:3000/api\" + \"/sensores/\" + id, options);\n    if (request.status === 200) {\n        return true;\n    } else {\n        return false;\n    }\n}\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvbGliL3NlbnNvcnNVdGlscy50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQU8sZUFBZUEsV0FBV0MsTUFBYyxFQUFFQyxLQUFhO0lBQzFELElBQUlDLFVBQVU7UUFDVkMsUUFBUTtRQUNSQyxTQUFTO1lBQ0wsaUJBQWlCLFlBQVlIO1FBQ2pDO0lBQ0o7SUFDQSxJQUFJSSxVQUFVLE1BQU1DLE1BQU1DLCtCQUFzQyxHQUFHLGVBQWVQLFFBQVFFO0lBQzFGLElBQUlHLFFBQVFLLE1BQU0sS0FBSyxLQUFLO1FBQ3hCLE9BQU8sTUFBTUwsUUFBUU0sSUFBSTtJQUM3QixPQUFPO1FBQ0gsT0FBTyxFQUFFO0lBQ2I7QUFDSjtBQUVPLGVBQWVDLGNBQWNDLE9BQVksRUFBRUMsRUFBVTtJQUN4RCxPQUFPLENBQUVELFFBQVFFLElBQUksQ0FBQyxDQUFDQyxTQUFnQkEsT0FBT0YsRUFBRSxJQUFJQTtBQUN4RDtBQUVPLGVBQWVHLFVBQVVILEVBQVUsRUFBRWQsTUFBYyxFQUFFQyxLQUFhLEVBQUVpQixJQUFZO0lBQ25GLElBQUloQixVQUFVO1FBQ1ZDLFFBQVE7UUFDUkMsU0FBUztZQUNMLGlCQUFpQixZQUFZSDtZQUM3QixnQkFBZ0I7UUFDcEI7UUFDQWtCLE1BQU1DLEtBQUtDLFNBQVMsQ0FBQztZQUFDUCxJQUFJQTtZQUFJSSxNQUFNQTtRQUFJO0lBQzVDO0lBQ0EsSUFBSWIsVUFBVSxNQUFNQyxNQUFNQywrQkFBc0MsR0FBRyxlQUFlUCxRQUFRRTtJQUMxRixJQUFJRyxRQUFRSyxNQUFNLEtBQUssS0FBSztRQUN4QixPQUFPO0lBQ1gsT0FBTztRQUNILE9BQU87SUFDWDtBQUNKO0FBRU8sZUFBZVksaUJBQWlCUixFQUFVLEVBQUVTLElBQVksRUFBRXRCLEtBQWE7SUFDMUUsSUFBSUMsVUFBVTtRQUNWQyxRQUFRO1FBQ1JDLFNBQVM7WUFDTCxpQkFBaUIsWUFBWUg7WUFDN0IsZ0JBQWdCO1FBQ3BCO1FBQ0FrQixNQUFNQyxLQUFLQyxTQUFTLENBQUM7WUFBQ0UsTUFBTUE7UUFBSTtJQUNwQztJQUNBLElBQUlsQixVQUFVLE1BQU1DLE1BQU1DLCtCQUFzQyxHQUFHLGVBQWVPLElBQUlaO0lBQ3RGLElBQUlHLFFBQVFLLE1BQU0sS0FBSyxLQUFLO1FBQ3hCLE9BQU87SUFDWCxPQUFPO1FBQ0gsT0FBTztJQUNYO0FBQ0oiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9fTl9FLy4vc3JjL2FwcC9saWIvc2Vuc29yc1V0aWxzLnRzP2FhYTAiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFNlbnNvcnMoZGV2aWNlOiBzdHJpbmcsIHRva2VuOiBzdHJpbmcpIHtcbiAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiAnQmVhcmVyICcgKyB0b2tlblxuICAgICAgICB9XG4gICAgfVxuICAgIGxldCByZXF1ZXN0ID0gYXdhaXQgZmV0Y2gocHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfR0xPQkFMX0FQSV9VUkwgKyBcIi9zZW5zb3Jlcy9cIiArIGRldmljZSwgb3B0aW9ucylcbiAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICByZXR1cm4gYXdhaXQgcmVxdWVzdC5qc29uKClcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gW11cbiAgICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjaGVja1NlbnNvcklkKHNlbnNvcnM6IGFueSwgaWQ6IHN0cmluZyl7XG4gICAgcmV0dXJuICEoc2Vuc29ycy5maW5kKChzZW5zb3I6IGFueSkgPT4gc2Vuc29yLmlkID09IGlkKSlcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFkZFNlbnNvcihpZDogc3RyaW5nLCBkZXZpY2U6IHN0cmluZywgdG9rZW46IHN0cmluZywgdHlwZTogc3RyaW5nKSB7XG4gICAgbGV0IG9wdGlvbnMgPSB7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6ICdCZWFyZXIgJyArIHRva2VuLFxuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7aWQ6IGlkLCB0eXBlOiB0eXBlfSlcbiAgICB9XG4gICAgbGV0IHJlcXVlc3QgPSBhd2FpdCBmZXRjaChwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19HTE9CQUxfQVBJX1VSTCArIFwiL3NlbnNvcmVzL1wiICsgZGV2aWNlLCBvcHRpb25zKVxuICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgIHJldHVybiB0cnVlXG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlU2Vuc29yQXJlYShpZDogc3RyaW5nLCBhcmVhOiBzdHJpbmcsIHRva2VuOiBzdHJpbmcpIHtcbiAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiAnQmVhcmVyICcgKyB0b2tlbixcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe2FyZWE6IGFyZWF9KVxuICAgIH1cbiAgICBsZXQgcmVxdWVzdCA9IGF3YWl0IGZldGNoKHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0dMT0JBTF9BUElfVVJMICsgXCIvc2Vuc29yZXMvXCIgKyBpZCwgb3B0aW9ucylcbiAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbn0iXSwibmFtZXMiOlsiZ2V0U2Vuc29ycyIsImRldmljZSIsInRva2VuIiwib3B0aW9ucyIsIm1ldGhvZCIsImhlYWRlcnMiLCJyZXF1ZXN0IiwiZmV0Y2giLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfR0xPQkFMX0FQSV9VUkwiLCJzdGF0dXMiLCJqc29uIiwiY2hlY2tTZW5zb3JJZCIsInNlbnNvcnMiLCJpZCIsImZpbmQiLCJzZW5zb3IiLCJhZGRTZW5zb3IiLCJ0eXBlIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJ1cGRhdGVTZW5zb3JBcmVhIiwiYXJlYSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/lib/sensorsUtils.ts\n"));

/***/ })

});