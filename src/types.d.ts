declare namespace Express {
    export interface Request {
        user: TokenPayload
    }
    export interface Response {
        user: any;
    }
}