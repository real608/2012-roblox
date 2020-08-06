import { Configuration, Inject, PlatformApplication } from "@tsed/common";
import { GlobalAcceptMimesMiddleware } from "@tsed/platform-express";
import * as bodyParser from "body-parser";
import * as compress from "compression";
import * as cookieParser from "cookie-parser";
import * as methodOverride from "method-override";
import { ejs } from "consolidate";
import { GlobalErrorHandlerMiddleware } from './helpers/ErrorHandle';
import NotFoundMiddleware from './middleware/NotFound';
import { static as eStatic } from 'express';
import "@tsed/swagger"; // import swagger Ts.ED module

import config from './helpers/Config';
const port = config.port || process.env.PORT || 3000;

const rootDir = __dirname;
@Configuration({
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
export class Server {
    @Inject()
    // @ts-ignore
    app: PlatformApplication;

    @Configuration()
    // @ts-ignore
    settings: Configuration;

    /**
     * This method let you configure the express middleware required by your application to works.
     * @returns {Server}
     */
    public $beforeRoutesInit(): void | Promise<any> {
        this.app
            .use(GlobalAcceptMimesMiddleware) // optional
            .use(cookieParser())
            .use(compress({}))
            .use(methodOverride())
            .use(bodyParser.json())
            .use(bodyParser.urlencoded({
                extended: true
            }))
            .use(eStatic(`${rootDir}/public`))
    }

    $beforeInit() {
        // @ts-ignore
        console.log('[info] starting on port', port);
        this.app.raw.set("views", `${rootDir}/views`);
        this.app.raw.engine("ejs", ejs);
        this.app.raw.locals.numberFormat = function (x: number) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        }
    }

    $afterRoutesInit() {
        this.app.use(NotFoundMiddleware);
        this.app.use(GlobalErrorHandlerMiddleware);
    }
}
