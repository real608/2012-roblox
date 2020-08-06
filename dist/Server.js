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
exports.Server = void 0;
const common_1 = require("@tsed/common");
const platform_express_1 = require("@tsed/platform-express");
const bodyParser = require("body-parser");
const compress = require("compression");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const consolidate_1 = require("consolidate");
const ErrorHandle_1 = require("./helpers/ErrorHandle");
const NotFound_1 = require("./middleware/NotFound");
const express_1 = require("express");
require("@tsed/swagger"); // import swagger Ts.ED module
const Config_1 = require("./helpers/Config");
const port = Config_1.default.port || process.env.PORT || 3000;
const rootDir = __dirname;
let Server = class Server {
    /**
     * This method let you configure the express middleware required by your application to works.
     * @returns {Server}
     */
    $beforeRoutesInit() {
        this.app
            .use(platform_express_1.GlobalAcceptMimesMiddleware) // optional
            .use(cookieParser())
            .use(compress({}))
            .use(methodOverride())
            .use(bodyParser.json())
            .use(bodyParser.urlencoded({
            extended: true
        }))
            .use(express_1.static(`${rootDir}/public`));
    }
    $beforeInit() {
        // @ts-ignore
        console.log('[info] starting on port', port);
        this.app.raw.set("views", `${rootDir}/views`);
        this.app.raw.engine("ejs", consolidate_1.ejs);
        this.app.raw.locals.numberFormat = function (x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        };
    }
    $afterRoutesInit() {
        this.app.use(NotFound_1.default);
        this.app.use(ErrorHandle_1.GlobalErrorHandlerMiddleware);
    }
};
__decorate([
    common_1.Inject(),
    __metadata("design:type", common_1.PlatformApplication)
], Server.prototype, "app", void 0);
__decorate([
    common_1.Configuration(),
    __metadata("design:type", Object)
], Server.prototype, "settings", void 0);
Server = __decorate([
    common_1.Configuration({
        rootDir,
        acceptMimes: ["application/json"],
        viewsDir: `${rootDir}/views`,
        mount: {
            "/": `${rootDir}/controllers/web/*.ts`,
            "/api/v1/": `${rootDir}/controllers/api/*.ts`,
        },
        httpsPort: false,
        port,
        logger: {
            logEnd: false,
            logRequest: false,
            logStart: false,
            level: 'off',
        },
        swagger: [
            {
                path: "/docs",
            }
        ]
    })
], Server);
exports.Server = Server;
//# sourceMappingURL=server.js.map