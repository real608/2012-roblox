import {
    NotFound,
    Unauthorized,
    Conflict,
    BadRequest,
} from 'ts-httpexceptions';

export default class HttpExceptions {
    public NotFound = NotFound;
    public Unauthorized = Unauthorized;
    public Conflict = Conflict;
    public BadRequest = BadRequest;
}