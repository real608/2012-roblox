import { Middleware, Res, Next, Req } from "@tsed/common";
import * as vm from '../viewmodels';

@Middleware()
export default class NotFoundMiddleware {
    public use(
        @Req() req: Req,
        @Res() res: Res,
        @Next() next: Next,
    ) {
        res.status(404).render('pages/error.ejs', new vm.Default({
            code: 404,
            url: req.url,
        }));
    }
}
