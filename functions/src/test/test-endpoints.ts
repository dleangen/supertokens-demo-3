import * as express from 'express';
import * as cors from 'cors';
import {configureResponseHandler} from '../configure-response-handler';
import {verifySession} from 'supertokens-node/recipe/session/framework/express';
import SuperTokens from 'supertokens-node';
import {SuperTokensInitConfig} from '../super-tokens-init-config';
import {websiteDomain} from '../config';

SuperTokens.init(SuperTokensInitConfig);

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

app.get(
    '/',
    configureResponseHandler,
    verifySession({sessionRequired: false}),
    async (request: express.Request, response: express.Response) => {
      try {
        response.status(200).json({message: 'Hello!'});
      } catch (error) {
        response.status(400).json(`{error: ${error}}`);
      }
    });

export default app;
