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
exports.ParentsController = void 0;
const common_1 = require("@tsed/common");
const swagger_1 = require("@tsed/swagger");
const base_1 = require("../base");
const vm = require("../../viewmodels");
const middleware = require("../../middleware");
let ParentsController = class ParentsController extends base_1.default {
    BuildersClubFaq() {
        return new vm.Default({});
    }
};
__decorate([
    common_1.Get('/BuildersClub'),
    common_1.Get('/BuildersClub.aspx'),
    swagger_1.Summary('Builders club FAQ'),
    common_1.Render('pages/parents/builders-club.ejs'),
    common_1.Use(middleware.Auth.AuthenticateRequest),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ParentsController.prototype, "BuildersClubFaq", null);
ParentsController = __decorate([
    common_1.Controller('/Parents')
], ParentsController);
exports.ParentsController = ParentsController;
//# sourceMappingURL=Parents.js.map