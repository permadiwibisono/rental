export default class UnauthorizedError extends Error {
  code: number;

  constructor(message?: string, code?: number) {
    let errCode = 401;
    let errMessage = 'Unauthorized';
    if (message) {
      errMessage = message;
    }
    if (code && Number(code)) {
      errCode = code;
    }
    super(errMessage);
    this.code = errCode;
  }
}
