import {websitePort as localhostPort} from '../config';
import * as express from 'express';

export const configureResponseHandler = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
  // When accessing via localhost, need to add a CORS header.
  response.set('Access-Control-Allow-Origin', `http://localhost:${localhostPort}`);
  return next();
};
