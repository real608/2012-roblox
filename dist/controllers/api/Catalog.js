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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogController = void 0;
const common_1 = require("@tsed/common");
const swagger_1 = require("@tsed/swagger");
const base_1 = require("../base");
const _ = require("lodash");
let CatalogController = class CatalogController extends base_1.default {
    similar(assetTypeId) {
        return this.Catalog.getSimilar(undefined, assetTypeId, 6).then(d => { return _.chunk(d, 3); });
    }
};
__decorate([
    common_1.Get('/similar/:assetTypeId'),
    swagger_1.Summary('Get similar items'),
    __param(0, common_1.Required()),
    __param(0, common_1.PathParams('assetTypeId', Number)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CatalogController.prototype, "similar", null);
CatalogController = __decorate([
    common_1.Controller('/catalog')
], CatalogController);
exports.CatalogController = CatalogController;
//# sourceMappingURL=Catalog.js.map