import {middleware, errorHandler} from 'supertokens-node/framework/express';
import * as express from 'express';
import * as cors from 'cors';
import SuperTokens from 'supertokens-node';
import {SuperTokensInitConfig} from '../super-tokens-init-config';
import {websiteDomain} from '../config';
import * as admin from 'firebase-admin';

SuperTokens.init(SuperTokensInitConfig);
admin.initializeApp();

const app = express();

const whitelist: string[] = [
  websiteDomain,
  'http://localhost:4201',
  'http://localhost:4202',
  'http://localhost:4203',
];

app.use(cors({
  origin: function(origin, callback) {
    if (origin && whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error(`Origin ${origin} not permitted due to CORS policy`));
    }
  },
  allowedHeaders: ['content-type', ...SuperTokens.getAllCORSHeaders()],
  credentials: true,
}));

app.use(middleware());
app.use(errorHandler());

export default app;
