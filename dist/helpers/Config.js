"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const fs_1 = require("fs");
const conf = fs_1.readFileSync(path_1.join(__dirname, '../../config.json')).toString();
exports.default = JSON.parse(conf);
//# sourceMappingURL=Config.js.map