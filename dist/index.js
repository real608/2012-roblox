"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@tsed/common");
const platform_express_1 = require("@tsed/platform-express");
const Server_1 = require("./Server");
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            common_1.$log.debug("Start server...");
            const platform = yield platform_express_1.PlatformExpress.bootstrap(Server_1.Server, {
            // extra settings
            });
            yield platform.listen();
            common_1.$log.debug("Server initialized");
        }
        catch (er) {
            common_1.$log.error(er);
        }
    });
}
bootstrap();
//# sourceMappingURL=index.js.map