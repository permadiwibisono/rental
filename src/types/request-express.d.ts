/// <reference types="express" />
declare namespace Express {
  export interface Request {
    user?: JWTUser;
  }
}
