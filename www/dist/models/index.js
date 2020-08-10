"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Economy = exports.BuildersClub = exports.Users = exports.Catalog = exports.Auth = exports.FilterVars = exports.Error = void 0;
const Auth = require("./Auth");
exports.Auth = Auth;
const Catalog = require("./Catalog");
exports.Catalog = Catalog;
const Users = require("./Users");
exports.Users = Users;
const BuildersClub = require("./BuildersClub");
exports.BuildersClub = BuildersClub;
const Economy = require("./Economy");
exports.Economy = Economy;
const common_1 = require("@tsed/common");
class ErrorDetails {
}
__decorate([
    common_1.Required(),
    __metadata("design:type", String)
], ErrorDetails.prototype, "code", void 0);
class Error {
}
__decorate([
    common_1.Required(),
    __metadata("design:type", Boolean)
], Error.prototype, "success", void 0);
__decorate([
    common_1.Required(),
    __metadata("design:type", ErrorDetails)
], Error.prototype, "error", void 0);
exports.Error = Error;
let okIdTypes = [
    'id',
    'gameid',
    'universeid',
    'placeid',
    'itemid',
    'assetid',
    'productid',
];
exports.FilterVars = (key) => {
    return okIdTypes.includes(key.toLowerCase());
};
//# sourceMappingURL=index.js.map