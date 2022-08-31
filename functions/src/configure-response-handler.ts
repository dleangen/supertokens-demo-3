import * as express from 'express';

/**
 * The acceptable origins have already been validated by CORS, so we
 * can just go ahead and add the origin to the "Access-Control-Allow-Origin" header.
 */
export const configureResponseHandler = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
  const origin = request.get('origin');
  if (origin) {
    response.set('Access-Control-Allow-Origin', origin);
  }
  return next();
};
