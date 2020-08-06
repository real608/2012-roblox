import { Middleware, Res, Next, Req } from "@tsed/common";
import * as xss from 'xss';

@Middleware()
export default class NotFoundMiddleware {
    public use(
        @Req() req: Req,
        @Res() res: Res,
        @Next() next: Next,
    ) {
        let filteredUrl = xss.filterXSS(req.url);
        // Json response
        res.status(404).send(`<!DOCTYPE html>
        <html>
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
                <title>Page Not Found</title>
                <style>
                    body {
                        padding: 0 10px;
                        max-width: 1000px;
                        margin:0 auto;
                        display: block;
                        font-family: sans-serif;
                    }
                </style>
            </head>
            <body>
                <h1>404 Not Found</h1>
                <p>A route or static file could not be located for the requested URL:
                <br>
                <br>
                <span style="font-family:monospace;background:#d5d5d5;padding:3px;">${filteredUrl}</span>
                </p>
            </body>
        </html>`).end();
    }
}
