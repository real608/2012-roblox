"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ps = void 0;
const ioredis_1 = require("ioredis");
const Config_1 = require("./Config");
const redis = new ioredis_1.default(Config_1.default.redis); // uses defaults unless given configuration object
exports.default = redis;
exports.ps = () => {
    return new ioredis_1.default(Config_1.default.redis);
};
//# sourceMappingURL=Redis.js.map