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

/***/ "(app-pages-browser)/./src/app/lib/actuadorUtils.ts":
/*!**************************************!*\
  !*** ./src/app/lib/actuadorUtils.ts ***!
  \**************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addActuador: function() { return /* binding */ addActuador; },\n/* harmony export */   checkActuador: function() { return /* binding */ checkActuador; },\n/* harmony export */   getActuadores: function() { return /* binding */ getActuadores; },\n/* harmony export */   updateActuadorArea: function() { return /* binding */ updateActuadorArea; },\n/* harmony export */   updateActuadorMode: function() { return /* binding */ updateActuadorMode; }\n/* harmony export */ });\nfunction checkActuador(actuadores, id) {\n    return !actuadores.find((actuador)=>actuador.id == id);\n}\nasync function getActuadores(device, token) {\n    let options = {\n        method: \"GET\",\n        headers: {\n            \"Authorization\": \"Bearer \" + token\n        }\n    };\n    console.log(options);\n    let response = await fetch(\"http://192.168.1.139:3000/api\" + \"/actuadores/\" + device, options);\n    if (response.status === 200) {\n        return await response.json();\n    } else {\n        return [];\n    }\n}\nasync function addActuador(id, device, token) {\n    let options = {\n        method: \"POST\",\n        headers: {\n            \"Authorization\": \"Bearer \" + token,\n            \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify({\n            id: id\n        })\n    };\n    let request = await fetch(\"http://192.168.1.139:3000/api\" + \"/actuadores/\" + device, options);\n    if (request.status === 200) {\n        return true;\n    } else {\n        return false;\n    }\n}\nasync function updateActuadorMode(id, mode, token) {\n    let options = {\n        method: \"PUT\",\n        headers: {\n            \"Authorization\": \"Bearer \" + token,\n            \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify({\n            id: id,\n            mode: mode\n        })\n    };\n    let request = await fetch(\"http://192.168.1.139:3000/api\" + \"/actuadores/mode\", options);\n    if (request.status === 200) {\n        return true;\n    } else {\n        return false;\n    }\n}\nasync function updateActuadorArea(id, area, token) {\n    let options = {\n        method: \"PUT\",\n        headers: {\n            \"Authorization\": \"Bearer \" + token,\n            \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify({\n            id: id,\n            area: area\n        })\n    };\n    let request = await fetch(\"http://192.168.1.139:3000/api\" + \"/actuadores/area\", options);\n    if (request.status === 200) {\n        return true;\n    } else {\n        return false;\n    }\n}\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvbGliL2FjdHVhZG9yVXRpbHMudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBTyxTQUFTQSxjQUFjQyxVQUFlLEVBQUVDLEVBQVU7SUFDckQsT0FBTyxDQUFFRCxXQUFXRSxJQUFJLENBQUMsQ0FBQ0MsV0FBa0JBLFNBQVNGLEVBQUUsSUFBSUE7QUFDL0Q7QUFFTyxlQUFlRyxjQUFjQyxNQUFjLEVBQUVDLEtBQWE7SUFDN0QsSUFBSUMsVUFBVTtRQUNWQyxRQUFRO1FBQ1JDLFNBQVM7WUFDTCxpQkFBaUIsWUFBWUg7UUFDakM7SUFDSjtJQUNBSSxRQUFRQyxHQUFHLENBQUNKO0lBQ1osSUFBSUssV0FBVyxNQUFNQyxNQUFNQywrQkFBc0MsR0FBRyxpQkFBaUJULFFBQVFFO0lBQzdGLElBQUlLLFNBQVNLLE1BQU0sS0FBSyxLQUFLO1FBQ3pCLE9BQU8sTUFBTUwsU0FBU00sSUFBSTtJQUM5QixPQUFPO1FBQ0gsT0FBTyxFQUFFO0lBQ2I7QUFDSjtBQUVPLGVBQWVDLFlBQVlsQixFQUFVLEVBQUVJLE1BQWMsRUFBRUMsS0FBYTtJQUN2RSxJQUFJQyxVQUFVO1FBQ1ZDLFFBQVE7UUFDUkMsU0FBUztZQUNMLGlCQUFpQixZQUFZSDtZQUM3QixnQkFBZ0I7UUFDcEI7UUFDQWMsTUFBTUMsS0FBS0MsU0FBUyxDQUFDO1lBQUNyQixJQUFJQTtRQUFFO0lBQ2hDO0lBQ0EsSUFBSXNCLFVBQVUsTUFBTVYsTUFBTUMsK0JBQXNDLEdBQUcsaUJBQWlCVCxRQUFRRTtJQUM1RixJQUFJZ0IsUUFBUU4sTUFBTSxLQUFLLEtBQUs7UUFDeEIsT0FBTztJQUNYLE9BQU87UUFDSCxPQUFPO0lBQ1g7QUFDSjtBQUVPLGVBQWVPLG1CQUFtQnZCLEVBQVUsRUFBRXdCLElBQVksRUFBRW5CLEtBQWE7SUFDNUUsSUFBSUMsVUFBVTtRQUNWQyxRQUFRO1FBQ1JDLFNBQVM7WUFDTCxpQkFBaUIsWUFBWUg7WUFDN0IsZ0JBQWdCO1FBQ3BCO1FBQ0FjLE1BQU1DLEtBQUtDLFNBQVMsQ0FBQztZQUFDckIsSUFBSUE7WUFBSXdCLE1BQU1BO1FBQUk7SUFDNUM7SUFDQSxJQUFJRixVQUFVLE1BQU1WLE1BQU1DLCtCQUFzQyxHQUFHLG9CQUFvQlA7SUFDdkYsSUFBSWdCLFFBQVFOLE1BQU0sS0FBSyxLQUFLO1FBQ3hCLE9BQU87SUFDWCxPQUFPO1FBQ0gsT0FBTztJQUNYO0FBQ0o7QUFFTyxlQUFlUyxtQkFBbUJ6QixFQUFVLEVBQUUwQixJQUFZLEVBQUVyQixLQUFhO0lBQzVFLElBQUlDLFVBQVU7UUFDVkMsUUFBUTtRQUNSQyxTQUFTO1lBQ0wsaUJBQWlCLFlBQVlIO1lBQzdCLGdCQUFnQjtRQUNwQjtRQUNBYyxNQUFNQyxLQUFLQyxTQUFTLENBQUM7WUFBQ3JCLElBQUlBO1lBQUkwQixNQUFNQTtRQUFJO0lBQzVDO0lBQ0EsSUFBSUosVUFBVSxNQUFNVixNQUFNQywrQkFBc0MsR0FBRyxvQkFBb0JQO0lBQ3ZGLElBQUlnQixRQUFRTixNQUFNLEtBQUssS0FBSztRQUN4QixPQUFPO0lBQ1gsT0FBTztRQUNILE9BQU87SUFDWDtBQUNKIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9hcHAvbGliL2FjdHVhZG9yVXRpbHMudHM/NzRiOSJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gY2hlY2tBY3R1YWRvcihhY3R1YWRvcmVzOiBhbnksIGlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gIShhY3R1YWRvcmVzLmZpbmQoKGFjdHVhZG9yOiBhbnkpID0+IGFjdHVhZG9yLmlkID09IGlkKSlcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldEFjdHVhZG9yZXMoZGV2aWNlOiBzdHJpbmcsIHRva2VuOiBzdHJpbmcpIHtcbiAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiAnQmVhcmVyICcgKyB0b2tlblxuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKG9wdGlvbnMpXG4gICAgbGV0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2gocHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfR0xPQkFMX0FQSV9VUkwgKyBcIi9hY3R1YWRvcmVzL1wiICsgZGV2aWNlLCBvcHRpb25zKVxuICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICByZXR1cm4gYXdhaXQgcmVzcG9uc2UuanNvbigpXG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFtdXG4gICAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkQWN0dWFkb3IoaWQ6IHN0cmluZywgZGV2aWNlOiBzdHJpbmcsIHRva2VuOiBzdHJpbmcpIHtcbiAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICdBdXRob3JpemF0aW9uJzogJ0JlYXJlciAnICsgdG9rZW4sXG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nXG4gICAgICAgIH0sXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtpZDogaWR9KVxuICAgIH1cbiAgICBsZXQgcmVxdWVzdCA9IGF3YWl0IGZldGNoKHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0dMT0JBTF9BUElfVVJMICsgXCIvYWN0dWFkb3Jlcy9cIiArIGRldmljZSwgb3B0aW9ucylcbiAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUFjdHVhZG9yTW9kZShpZDogc3RyaW5nLCBtb2RlOiBudW1iZXIsIHRva2VuOiBzdHJpbmcpIHtcbiAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiAnQmVhcmVyICcgKyB0b2tlbixcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe2lkOiBpZCwgbW9kZTogbW9kZX0pXG4gICAgfVxuICAgIGxldCByZXF1ZXN0ID0gYXdhaXQgZmV0Y2gocHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfR0xPQkFMX0FQSV9VUkwgKyBcIi9hY3R1YWRvcmVzL21vZGVcIiwgb3B0aW9ucylcbiAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUFjdHVhZG9yQXJlYShpZDogc3RyaW5nLCBhcmVhOiBudW1iZXIsIHRva2VuOiBzdHJpbmcpIHtcbiAgICBsZXQgb3B0aW9ucyA9IHtcbiAgICAgICAgbWV0aG9kOiAnUFVUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgJ0F1dGhvcml6YXRpb24nOiAnQmVhcmVyICcgKyB0b2tlbixcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgfSxcbiAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe2lkOiBpZCwgYXJlYTogYXJlYX0pXG4gICAgfVxuICAgIGxldCByZXF1ZXN0ID0gYXdhaXQgZmV0Y2gocHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfR0xPQkFMX0FQSV9VUkwgKyBcIi9hY3R1YWRvcmVzL2FyZWFcIiwgb3B0aW9ucylcbiAgICBpZiAocmVxdWVzdC5zdGF0dXMgPT09IDIwMCkge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZVxuICAgIH1cbn0iXSwibmFtZXMiOlsiY2hlY2tBY3R1YWRvciIsImFjdHVhZG9yZXMiLCJpZCIsImZpbmQiLCJhY3R1YWRvciIsImdldEFjdHVhZG9yZXMiLCJkZXZpY2UiLCJ0b2tlbiIsIm9wdGlvbnMiLCJtZXRob2QiLCJoZWFkZXJzIiwiY29uc29sZSIsImxvZyIsInJlc3BvbnNlIiwiZmV0Y2giLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfR0xPQkFMX0FQSV9VUkwiLCJzdGF0dXMiLCJqc29uIiwiYWRkQWN0dWFkb3IiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInJlcXVlc3QiLCJ1cGRhdGVBY3R1YWRvck1vZGUiLCJtb2RlIiwidXBkYXRlQWN0dWFkb3JBcmVhIiwiYXJlYSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/lib/actuadorUtils.ts\n"));

/***/ })

});