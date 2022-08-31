import * as functions from 'firebase-functions';

// HTTPS endpoints
export const test =
  functions.https.onRequest(async (request, response) => {
    try {
      const handlerModule = await import('./test-endpoints');
      const handler = handlerModule.default;
      await handler(request, response);
    } catch (error) {
      functions.logger.error(error);
      const message = 'An unknown error occurred';
      await response.status(400).json(`{error:${message}}`);
    }
  });

// Firestore Triggers
// None
