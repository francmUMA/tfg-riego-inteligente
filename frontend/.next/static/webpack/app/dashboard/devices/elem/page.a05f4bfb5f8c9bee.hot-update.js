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

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addSensor: function() { return /* binding */ addSensor; },\n/* harmony export */   checkSensorId: function() { return /* binding */ checkSensorId; },\n/* harmony export */   getSensors: function() { return /* binding */ getSensors; },\n/* harmony export */   updateSensorArea: function() { return /* binding */ updateSensorArea; },\n/* harmony export */   updateSensorPin: function() { return /* binding */ updateSensorPin; }\n/* harmony export */ });\nasync function getSensors(device, token) {\n    let options = {\n        method: \"GET\",\n        headers: {\n            \"Authorization\": \"Bearer \" + token\n        }\n    };\n    let request = await fetch(\"http://192.168.1.139:3000/api\" + \"/sensores/\" + device, options);\n    if (request.status === 200) {\n        return await request.json();\n    } else {\n        return [];\n    }\n}\nasync function checkSensorId(sensors, id) {\n    return !sensors.find((sensor)=>sensor.id == id);\n}\nasync function addSensor(id, device, token, type) {\n    let options = {\n        method: \"POST\",\n        headers: {\n            \"Authorization\": \"Bearer \" + token,\n            \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify({\n            id: id,\n            type: type\n        })\n    };\n    let request = await fetch(\"http://192.168.1.139:3000/api\" + \"/sensores/\" + device, options);\n    if (request.status === 200) {\n        return true;\n    } else {\n        return false;\n    }\n}\nasync function updateSensorArea(id, area, token) {\n    let options = {\n        method: \"PUT\",\n        headers: {\n            \"Authorization\": \"Bearer \" + token,\n            \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify({\n            id: id,\n            area: area\n        })\n    };\n    let request = await fetch(\"http://192.168.1.139:3000/api\" + \"/sensores/area\", options);\n    if (request.status === 200) {\n        return true;\n    } else {\n        return false;\n    }\n}\nasync function updateSensorPin(id, pin, token) {\n    let options = {\n        method: \"PUT\",\n        headers: {\n            \"Authorization\": \"Bearer \" + token,\n            \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify({\n            id: id,\n            device_pin: pin\n        })\n    };\n    let request = await fetch(\"http://192.168.1.139:3000/api\" + \"/sensores/pin\", options);\n    if (request.status === 200) {\n        return true;\n    } else {\n        return false;\n    }\n}\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvbGliL3NlbnNvcnNVdGlscy50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQVNPLGVBQWVBLFdBQVdDLE1BQWMsRUFBRUMsS0FBYTtJQUMxRCxJQUFJQyxVQUFVO1FBQ1ZDLFFBQVE7UUFDUkMsU0FBUztZQUNMLGlCQUFpQixZQUFZSDtRQUNqQztJQUNKO0lBQ0EsSUFBSUksVUFBVSxNQUFNQyxNQUFNQywrQkFBc0MsR0FBRyxlQUFlUCxRQUFRRTtJQUMxRixJQUFJRyxRQUFRSyxNQUFNLEtBQUssS0FBSztRQUN4QixPQUFPLE1BQU1MLFFBQVFNLElBQUk7SUFDN0IsT0FBTztRQUNILE9BQU8sRUFBRTtJQUNiO0FBQ0o7QUFFTyxlQUFlQyxjQUFjQyxPQUFZLEVBQUVDLEVBQVU7SUFDeEQsT0FBTyxDQUFFRCxRQUFRRSxJQUFJLENBQUMsQ0FBQ0MsU0FBZ0JBLE9BQU9GLEVBQUUsSUFBSUE7QUFDeEQ7QUFFTyxlQUFlRyxVQUFVSCxFQUFVLEVBQUVkLE1BQWMsRUFBRUMsS0FBYSxFQUFFaUIsSUFBWTtJQUNuRixJQUFJaEIsVUFBVTtRQUNWQyxRQUFRO1FBQ1JDLFNBQVM7WUFDTCxpQkFBaUIsWUFBWUg7WUFDN0IsZ0JBQWdCO1FBQ3BCO1FBQ0FrQixNQUFNQyxLQUFLQyxTQUFTLENBQUM7WUFBQ1AsSUFBSUE7WUFBSUksTUFBTUE7UUFBSTtJQUM1QztJQUNBLElBQUliLFVBQVUsTUFBTUMsTUFBTUMsK0JBQXNDLEdBQUcsZUFBZVAsUUFBUUU7SUFDMUYsSUFBSUcsUUFBUUssTUFBTSxLQUFLLEtBQUs7UUFDeEIsT0FBTztJQUNYLE9BQU87UUFDSCxPQUFPO0lBQ1g7QUFDSjtBQUVPLGVBQWVZLGlCQUFpQlIsRUFBVSxFQUFFUyxJQUFZLEVBQUV0QixLQUFhO0lBQzFFLElBQUlDLFVBQVU7UUFDVkMsUUFBUTtRQUNSQyxTQUFTO1lBQ0wsaUJBQWlCLFlBQVlIO1lBQzdCLGdCQUFnQjtRQUNwQjtRQUNBa0IsTUFBTUMsS0FBS0MsU0FBUyxDQUFDO1lBQUNQLElBQUlBO1lBQUlTLE1BQU1BO1FBQUk7SUFDNUM7SUFDQSxJQUFJbEIsVUFBVSxNQUFNQyxNQUFNQywrQkFBc0MsR0FBRyxrQkFBa0JMO0lBQ3JGLElBQUlHLFFBQVFLLE1BQU0sS0FBSyxLQUFLO1FBQ3hCLE9BQU87SUFDWCxPQUFPO1FBQ0gsT0FBTztJQUNYO0FBQ0o7QUFFTyxlQUFlYyxnQkFBZ0JWLEVBQVUsRUFBRVcsR0FBVyxFQUFFeEIsS0FBYTtJQUN4RSxJQUFJQyxVQUFVO1FBQ1ZDLFFBQVE7UUFDUkMsU0FBUztZQUNMLGlCQUFpQixZQUFZSDtZQUM3QixnQkFBZ0I7UUFDcEI7UUFDQWtCLE1BQU1DLEtBQUtDLFNBQVMsQ0FBQztZQUFDUCxJQUFJQTtZQUFJWSxZQUFZRDtRQUFHO0lBQ2pEO0lBQ0EsSUFBSXBCLFVBQVUsTUFBTUMsTUFBTUMsK0JBQXNDLEdBQUcsaUJBQWlCTDtJQUNwRixJQUFJRyxRQUFRSyxNQUFNLEtBQUssS0FBSztRQUN4QixPQUFPO0lBQ1gsT0FBTztRQUNILE9BQU87SUFDWDtBQUNKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9hcHAvbGliL3NlbnNvcnNVdGlscy50cz9hYWEwIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBpbnRlcmZhY2UgU2Vuc29yIHtcbiAgICBpZDogc3RyaW5nLFxuICAgIHR5cGU6IHN0cmluZyxcbiAgICBkZXZpY2U6IG51bWJlclxuICAgIGRldmljZV9waW46IG51bWJlcixcbiAgICBhcmVhOiBudW1iZXJcblxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0U2Vuc29ycyhkZXZpY2U6IHN0cmluZywgdG9rZW46IHN0cmluZykge1xuICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6ICdCZWFyZXIgJyArIHRva2VuXG4gICAgICAgIH1cbiAgICB9XG4gICAgbGV0IHJlcXVlc3QgPSBhd2FpdCBmZXRjaChwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19HTE9CQUxfQVBJX1VSTCArIFwiL3NlbnNvcmVzL1wiICsgZGV2aWNlLCBvcHRpb25zKVxuICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMjAwKSB7XG4gICAgICAgIHJldHVybiBhd2FpdCByZXF1ZXN0Lmpzb24oKVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBbXVxuICAgIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNoZWNrU2Vuc29ySWQoc2Vuc29yczogYW55LCBpZDogc3RyaW5nKXtcbiAgICByZXR1cm4gIShzZW5zb3JzLmZpbmQoKHNlbnNvcjogYW55KSA9PiBzZW5zb3IuaWQgPT0gaWQpKVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkU2Vuc29yKGlkOiBzdHJpbmcsIGRldmljZTogc3RyaW5nLCB0b2tlbjogc3RyaW5nLCB0eXBlOiBzdHJpbmcpIHtcbiAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogJ0JlYXJlciAnICsgdG9rZW4sXG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtpZDogaWQsIHR5cGU6IHR5cGV9KVxuICAgIH1cbiAgICBsZXQgcmVxdWVzdCA9IGF3YWl0IGZldGNoKHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0dMT0JBTF9BUElfVVJMICsgXCIvc2Vuc29yZXMvXCIgKyBkZXZpY2UsIG9wdGlvbnMpXG4gICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVTZW5zb3JBcmVhKGlkOiBzdHJpbmcsIGFyZWE6IG51bWJlciwgdG9rZW46IHN0cmluZykge1xuICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6ICdCZWFyZXIgJyArIHRva2VuLFxuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7aWQ6IGlkLCBhcmVhOiBhcmVhfSlcbiAgICB9XG4gICAgbGV0IHJlcXVlc3QgPSBhd2FpdCBmZXRjaChwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19HTE9CQUxfQVBJX1VSTCArIFwiL3NlbnNvcmVzL2FyZWFcIiwgb3B0aW9ucylcbiAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVNlbnNvclBpbihpZDogc3RyaW5nLCBwaW46IG51bWJlciwgdG9rZW46IHN0cmluZykge1xuICAgIGxldCBvcHRpb25zID0ge1xuICAgICAgICBtZXRob2Q6ICdQVVQnLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6ICdCZWFyZXIgJyArIHRva2VuLFxuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJ1xuICAgICAgICB9LFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7aWQ6IGlkLCBkZXZpY2VfcGluOiBwaW59KVxuICAgIH1cbiAgICBsZXQgcmVxdWVzdCA9IGF3YWl0IGZldGNoKHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0dMT0JBTF9BUElfVVJMICsgXCIvc2Vuc29yZXMvcGluXCIsIG9wdGlvbnMpXG4gICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSAyMDApIHtcbiAgICAgICAgcmV0dXJuIHRydWVcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gZmFsc2VcbiAgICB9XG59Il0sIm5hbWVzIjpbImdldFNlbnNvcnMiLCJkZXZpY2UiLCJ0b2tlbiIsIm9wdGlvbnMiLCJtZXRob2QiLCJoZWFkZXJzIiwicmVxdWVzdCIsImZldGNoIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX0dMT0JBTF9BUElfVVJMIiwic3RhdHVzIiwianNvbiIsImNoZWNrU2Vuc29ySWQiLCJzZW5zb3JzIiwiaWQiLCJmaW5kIiwic2Vuc29yIiwiYWRkU2Vuc29yIiwidHlwZSIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwidXBkYXRlU2Vuc29yQXJlYSIsImFyZWEiLCJ1cGRhdGVTZW5zb3JQaW4iLCJwaW4iLCJkZXZpY2VfcGluIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/lib/sensorsUtils.ts\n"));

/***/ })

});