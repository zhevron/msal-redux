"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("msal/lib-commonjs/User");
var IMsalUser = /** @class */ (function (_super) {
    __extends(IMsalUser, _super);
    function IMsalUser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IMsalUser.prototype.hasRole = function (role) {
        return this.roles.indexOf(role) > -1;
    };
    return IMsalUser;
}(User_1.User));
exports.IMsalUser = IMsalUser;
//# sourceMappingURL=Types.js.map