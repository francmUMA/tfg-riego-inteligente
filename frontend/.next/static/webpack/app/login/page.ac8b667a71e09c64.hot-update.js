"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("app/login/page",{

/***/ "(app-pages-browser)/./src/app/lib/checkEmail.ts":
/*!***********************************!*\
  !*** ./src/app/lib/checkEmail.ts ***!
  \***********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   checkLoginEmail: function() { return /* binding */ checkLoginEmail; },\n/* harmony export */   checkRegisterEmail: function() { return /* binding */ checkRegisterEmail; }\n/* harmony export */ });\n// Devuelve true si el email es válido y falso si está duplicado\nasync function checkRegisterEmail(email) {\n    const re = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\n    if (re.test(email)) {\n        // Comprobar si está duplicado\n        let check = await fetch(\"http://192.168.1.141:3000/api\" + \"/users/email/\" + email);\n        if (check.status === 200) {\n            return 2;\n        }\n        return 0;\n    } else {\n        return 1;\n    }\n}\nasync function checkLoginEmail(email) {\n    const re = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;\n    if (re.test(email)) {\n        // Comprobar si existe\n        let check = await fetch(\"http://192.168.1.141:3000/api\" + \"/users/email/\" + email);\n        if (check.status === 200) {\n            return true;\n        }\n        return false;\n    } else {\n        return false;\n    }\n}\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvbGliL2NoZWNrRW1haWwudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxnRUFBZ0U7QUFDekQsZUFBZUEsbUJBQW1CQyxLQUFhO0lBQ3BELE1BQU1DLEtBQUs7SUFDWCxJQUFJQSxHQUFHQyxJQUFJLENBQUNGLFFBQU87UUFDakIsOEJBQThCO1FBQzlCLElBQUlHLFFBQVEsTUFBTUMsTUFBTUMsK0JBQXNDLEdBQUcsa0JBQWtCTDtRQUNuRixJQUFJRyxNQUFNSyxNQUFNLEtBQUssS0FBSztZQUN0QixPQUFPO1FBQ1g7UUFDQSxPQUFPO0lBQ1QsT0FBTztRQUNMLE9BQU87SUFDVDtBQUNGO0FBRU8sZUFBZUMsZ0JBQWdCVCxLQUFhO0lBQ2pELE1BQU1DLEtBQUs7SUFDWCxJQUFJQSxHQUFHQyxJQUFJLENBQUNGLFFBQU87UUFDakIsc0JBQXNCO1FBQ3RCLElBQUlHLFFBQVEsTUFBTUMsTUFBTUMsK0JBQXNDLEdBQUcsa0JBQWtCTDtRQUNuRixJQUFJRyxNQUFNSyxNQUFNLEtBQUssS0FBSztZQUN0QixPQUFPO1FBQ1g7UUFDQSxPQUFPO0lBQ1QsT0FBTztRQUNMLE9BQU87SUFDVDtBQUNGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3NyYy9hcHAvbGliL2NoZWNrRW1haWwudHM/ODkyMyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBEZXZ1ZWx2ZSB0cnVlIHNpIGVsIGVtYWlsIGVzIHbDoWxpZG8geSBmYWxzbyBzaSBlc3TDoSBkdXBsaWNhZG9cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNoZWNrUmVnaXN0ZXJFbWFpbChlbWFpbDogc3RyaW5nKSB7XHJcbiAgY29uc3QgcmUgPSAvXlteXFxzQF0rQFteXFxzQF0rXFwuW15cXHNAXSskLztcclxuICBpZiAocmUudGVzdChlbWFpbCkpe1xyXG4gICAgLy8gQ29tcHJvYmFyIHNpIGVzdMOhIGR1cGxpY2Fkb1xyXG4gICAgbGV0IGNoZWNrID0gYXdhaXQgZmV0Y2gocHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfR0xPQkFMX0FQSV9VUkwgKyBcIi91c2Vycy9lbWFpbC9cIiArIGVtYWlsKVxyXG4gICAgaWYgKGNoZWNrLnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAgICAgcmV0dXJuIDI7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gMFxyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gMTtcclxuICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjaGVja0xvZ2luRW1haWwoZW1haWw6IHN0cmluZykge1xyXG4gIGNvbnN0IHJlID0gL15bXlxcc0BdK0BbXlxcc0BdK1xcLlteXFxzQF0rJC87XHJcbiAgaWYgKHJlLnRlc3QoZW1haWwpKXtcclxuICAgIC8vIENvbXByb2JhciBzaSBleGlzdGVcclxuICAgIGxldCBjaGVjayA9IGF3YWl0IGZldGNoKHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0dMT0JBTF9BUElfVVJMICsgXCIvdXNlcnMvZW1haWwvXCIgKyBlbWFpbClcclxuICAgIGlmIChjaGVjay5zdGF0dXMgPT09IDIwMCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlXHJcbiAgfSBlbHNlIHtcclxuICAgIHJldHVybiBmYWxzZVxyXG4gIH1cclxufSJdLCJuYW1lcyI6WyJjaGVja1JlZ2lzdGVyRW1haWwiLCJlbWFpbCIsInJlIiwidGVzdCIsImNoZWNrIiwiZmV0Y2giLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfR0xPQkFMX0FQSV9VUkwiLCJzdGF0dXMiLCJjaGVja0xvZ2luRW1haWwiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/lib/checkEmail.ts\n"));

/***/ }),

/***/ "(app-pages-browser)/./src/app/lib/checkPassword.ts":
/*!**************************************!*\
  !*** ./src/app/lib/checkPassword.ts ***!
  \**************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ checkPassword; }\n/* harmony export */ });\nasync function checkPassword(password, email) {\n    let data = {\n        email: email,\n        password: password\n    };\n    const response = await fetch(\"http://192.168.1.141:3000/api\" + \"/users/password-check\", {\n        method: \"POST\",\n        headers: {\n            \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify(data)\n    });\n    if (response.status === 200) {\n        return true;\n    } else {\n        return false;\n    }\n}\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvbGliL2NoZWNrUGFzc3dvcmQudHMiLCJtYXBwaW5ncyI6Ijs7OztBQUFlLGVBQWVBLGNBQWNDLFFBQWdCLEVBQUVDLEtBQWE7SUFDdkUsSUFBSUMsT0FBTztRQUNQRCxPQUFPQTtRQUNQRCxVQUFVQTtJQUNkO0lBQ0EsTUFBTUcsV0FBVyxNQUFNQyxNQUFNQywrQkFBc0MsR0FBRyx5QkFBeUI7UUFDM0ZHLFFBQVE7UUFDUkMsU0FBUztZQUNMLGdCQUFnQjtRQUNwQjtRQUNBQyxNQUFNQyxLQUFLQyxTQUFTLENBQUNWO0lBQ3pCO0lBQ0EsSUFBSUMsU0FBU1UsTUFBTSxLQUFLLEtBQUs7UUFDekIsT0FBTztJQUNYLE9BQU87UUFDSCxPQUFPO0lBQ1g7QUFDSiIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvYXBwL2xpYi9jaGVja1Bhc3N3b3JkLnRzPzczODgiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gY2hlY2tQYXNzd29yZChwYXNzd29yZDogc3RyaW5nLCBlbWFpbDogc3RyaW5nKSB7XHJcbiAgICBsZXQgZGF0YSA9IHtcclxuICAgICAgICBlbWFpbDogZW1haWwsXHJcbiAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkXHJcbiAgICB9XHJcbiAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0dMT0JBTF9BUElfVVJMICsgJy91c2Vycy9wYXNzd29yZC1jaGVjaycsIHtcclxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGRhdGEpXHJcbiAgICB9KVxyXG4gICAgaWYgKHJlc3BvbnNlLnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcbn0iXSwibmFtZXMiOlsiY2hlY2tQYXNzd29yZCIsInBhc3N3b3JkIiwiZW1haWwiLCJkYXRhIiwicmVzcG9uc2UiLCJmZXRjaCIsInByb2Nlc3MiLCJlbnYiLCJORVhUX1BVQkxJQ19HTE9CQUxfQVBJX1VSTCIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInN0YXR1cyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/lib/checkPassword.ts\n"));

/***/ }),

/***/ "(app-pages-browser)/./src/app/lib/token.ts":
/*!******************************!*\
  !*** ./src/app/lib/token.ts ***!
  \******************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   checkToken: function() { return /* binding */ checkToken; },\n/* harmony export */   getToken: function() { return /* binding */ getToken; }\n/* harmony export */ });\nasync function getToken(email, password) {\n    let options = {\n        method: \"POST\",\n        headers: {\n            \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify({\n            email: email,\n            password: password\n        })\n    };\n    let request = await fetch(\"http://192.168.1.141:3000/api\" + \"/auth/\", options);\n    if (request.status === 200) {\n        let response = await request.json();\n        return response.token;\n    } else {\n        return undefined;\n    }\n}\nasync function checkToken(token) {\n    let options = {\n        method: \"GET\",\n        headers: {\n            \"Authorization\": \"Bearer \" + token\n        }\n    };\n    let request = await fetch(\"http://192.168.1.141:3000/api\" + \"/auth/check\", options);\n    if (request.status === 200) {\n        return true;\n    } else {\n        return false;\n    }\n}\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwcC1wYWdlcy1icm93c2VyKS8uL3NyYy9hcHAvbGliL3Rva2VuLnRzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQU8sZUFBZUEsU0FBU0MsS0FBYSxFQUFFQyxRQUFnQjtJQUMxRCxJQUFJQyxVQUFVO1FBQ1ZDLFFBQVE7UUFDUkMsU0FBUztZQUNMLGdCQUFnQjtRQUNwQjtRQUNBQyxNQUFNQyxLQUFLQyxTQUFTLENBQUM7WUFBRVAsT0FBT0E7WUFBT0MsVUFBVUE7UUFBUztJQUM1RDtJQUNBLElBQUlPLFVBQVUsTUFBTUMsTUFBTUMsK0JBQXNDLEdBQUcsVUFBVVI7SUFDN0UsSUFBSU0sUUFBUUssTUFBTSxLQUFLLEtBQUs7UUFDeEIsSUFBSUMsV0FBVyxNQUFNTixRQUFRTyxJQUFJO1FBQ2pDLE9BQU9ELFNBQVNFLEtBQUs7SUFDekIsT0FBTztRQUNILE9BQU9DO0lBQ1g7QUFDSjtBQUVPLGVBQWVDLFdBQVdGLEtBQWE7SUFDMUMsSUFBSWQsVUFBVTtRQUNWQyxRQUFRO1FBQ1JDLFNBQVM7WUFDTCxpQkFBaUIsWUFBWVk7UUFDakM7SUFDSjtJQUNBLElBQUlSLFVBQVUsTUFBTUMsTUFBTUMsK0JBQXNDLEdBQUcsZUFBZVI7SUFDbEYsSUFBSU0sUUFBUUssTUFBTSxLQUFLLEtBQUs7UUFDeEIsT0FBTztJQUNYLE9BQU87UUFDSCxPQUFPO0lBQ1g7QUFDSiIsInNvdXJjZXMiOlsid2VicGFjazovL19OX0UvLi9zcmMvYXBwL2xpYi90b2tlbi50cz9mNzgxIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRUb2tlbihlbWFpbDogc3RyaW5nLCBwYXNzd29yZDogc3RyaW5nKSB7XHJcbiAgICBsZXQgb3B0aW9ucyA9IHtcclxuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcclxuICAgICAgICB9LFxyXG4gICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgZW1haWw6IGVtYWlsLCBwYXNzd29yZDogcGFzc3dvcmQgfSlcclxuICAgIH1cclxuICAgIGxldCByZXF1ZXN0ID0gYXdhaXQgZmV0Y2gocHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfR0xPQkFMX0FQSV9VUkwgKyBcIi9hdXRoL1wiLCBvcHRpb25zKVxyXG4gICAgaWYgKHJlcXVlc3Quc3RhdHVzID09PSAyMDApIHtcclxuICAgICAgICBsZXQgcmVzcG9uc2UgPSBhd2FpdCByZXF1ZXN0Lmpzb24oKVxyXG4gICAgICAgIHJldHVybiByZXNwb25zZS50b2tlblxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gdW5kZWZpbmVkXHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjaGVja1Rva2VuKHRva2VuOiBzdHJpbmcpIHtcclxuICAgIGxldCBvcHRpb25zID0ge1xyXG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXHJcbiAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAnQXV0aG9yaXphdGlvbic6ICdCZWFyZXIgJyArIHRva2VuXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgbGV0IHJlcXVlc3QgPSBhd2FpdCBmZXRjaChwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19HTE9CQUxfQVBJX1VSTCArIFwiL2F1dGgvY2hlY2tcIiwgb3B0aW9ucylcclxuICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMjAwKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcbn0iXSwibmFtZXMiOlsiZ2V0VG9rZW4iLCJlbWFpbCIsInBhc3N3b3JkIiwib3B0aW9ucyIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsInJlcXVlc3QiLCJmZXRjaCIsInByb2Nlc3MiLCJlbnYiLCJORVhUX1BVQkxJQ19HTE9CQUxfQVBJX1VSTCIsInN0YXR1cyIsInJlc3BvbnNlIiwianNvbiIsInRva2VuIiwidW5kZWZpbmVkIiwiY2hlY2tUb2tlbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(app-pages-browser)/./src/app/lib/token.ts\n"));

/***/ })

});