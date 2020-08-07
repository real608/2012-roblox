import { Err, Middleware, Req, Res, Next } from "@tsed/common";
import exceptions from './HTTPExceptions';
import * as vm from '../viewmodels';

@Middleware()
export class GlobalErrorHandlerMiddleware extends exceptions {
    /**
     * Error handler
     * @param e Error object
     * @param req Express request object
     * @param res Express response object
     */
    public use(
        @Err() e: any,
        @Req() req: Req,
        @Res() res: Res,
        @Next() next: Next,
    ) {

        if (e.message === 'LogoutRequired') {
            return res.redirect('/My/Home.aspx');
        } else if (e.message === 'LoginRequired') {
            return res.redirect(302, '/Login/Default.aspx');
        }

        let code = 'InternalServerError';
        if (e.isAxiosError && e.response) {
            let s = e.response.status;
            if (s === 404) {
                code = 'NotFound';
            } else if (s === 403) {
                code = 'Forbidden';
            } else if (s === 401) {
                code = 'Unauthorized';
            } else if (s === 400) {
                code = 'BadRequest';
            } else if (s === 409) {
                code = 'Conflict';
            } else {
                console.error('[error]', s, e.response.statusText, e.response.data, e.config.url);
            }
            console.log('[error] ' + req.method + ' ' + req.url, s, e.response.data);
            return res.status(s || 500).json({
                success: false,
                error: {
                    code,
                }
            }).end();
        }
        if (
            e instanceof this.BadRequest ||
            e instanceof this.Unauthorized ||
            e instanceof this.NotFound ||
            e instanceof this.Conflict
        ) {
            return res.status(e.status).json({
                success: false,
                error: {
                    code: e.message,
                }
            })
        }

        res.status(e.status || 500)
        res.render('pages/error.ejs', new vm.Default({
            code: 500,
            url: req.url,
            error: e,
        }), (err, html) => {
            if (err) {
                console.error(err);
                let msg = 'Internal server error';
                if (process.env.NODE_ENV !== 'production') {
                    msg = 'Render Error in ErrorHandle.ts. Original stack below:\n\n' + e.stack;
                }
                res.set('content-type', 'text/plain').send(msg).end();
            } else {
                res.send(html).end();
            }
        });
    }
}
