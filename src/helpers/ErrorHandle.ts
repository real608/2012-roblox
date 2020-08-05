import { Err, Middleware, Req, Res } from "@tsed/common";
import exceptions from './HTTPExceptions';

@Middleware()
export class GlobalErrorHandlerMiddleware extends exceptions {
    use(@Err() e: any, @Req() req: Req, @Res() res: Res) {

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
        res.status(e.status || 500).set('content-type', 'text/plain').send(e.message + '\n' + e.stack).end();
    }
}
