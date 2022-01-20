export default class ModelError extends Error {
  code: number;

  constructor(modelName?: string, code?: number) {
    let errCode = 400;
    let errMessage = '`ERR_MODEL`';
    if (code && Number(code)) {
      errCode = code;
      if (errCode === 404) {
        errMessage = '`ERR_MODEL_NOT_FOUND`';
      }
    }
    if (modelName) {
      errMessage = `${errMessage}: \`${modelName}\` could not be found`;
    }
    super(errMessage);
    this.code = errCode;
  }
}
