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
const common_1 = require("@tsed/common");
const crypto_1 = require("crypto");
const csrfCookieName = 'csrf';
const Config_1 = require("../helpers/Config");
const jwt = require("jsonwebtoken");
const makeCsrfCookie = (res) => {
    const str = crypto_1.randomBytes(8).toString('hex');
    const token = jwt.sign({
        csrf: str,
    }, Config_1.default.csrfKey);
    res.cookie(csrfCookieName, token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
    });
    return str;
};
const base_1 = require("./base");
let default_1 = class default_1 extends base_1.default {
    makeTokenAndThrow(res) {
        let token = makeCsrfCookie(res);
        res.set('x-csrf-token', token);
        throw new this.Unauthorized('TokenValidationFailed');
    }
    use(csrf, csrfCookie, res) {
        if (!csrfCookie) {
            return this.makeTokenAndThrow(res);
        }
        let decoded;
        try {
            decoded = jwt.verify(csrfCookie, Config_1.default.csrfKey);
        }
        catch (err) {
            return this.makeTokenAndThrow(res);
        }
        let current = new Date().getTime() / 1000;
        let expiresAt = decoded.iat + 300;
        if (expiresAt < current) {
            console.log('token is expired');
            // re-create token
            return this.makeTokenAndThrow(res);
        }
        if (decoded.csrf !== csrf) {
            console.log(decoded.csrf, 'does not match', csrf);
            res.set('x-csrf-token', decoded.csrf);
            throw new this.Unauthorized('TokenValidationFailed');
        }
        // OK to go
    }
};
__decorate([
    __param(0, common_1.HeaderParams('x-csrf-token', String)),
    __param(1, common_1.Cookies('csrf')),
    __param(2, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], default_1.prototype, "use", null);
default_1 = __decorate([
    common_1.Middleware()
], default_1);
exports.default = default_1;
//# sourceMappingURL=csrf.js.map