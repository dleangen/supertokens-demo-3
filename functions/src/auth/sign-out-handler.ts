import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import Session from 'supertokens-node/recipe/session';

/**
 * When the user signs out, we also need to end the Firebase session
 * by revoking any refresh tokens.
 */
export const signOutPOST = (originalImplementation: any) => async function(input: any) {
  const session = await Session.getSession(input.options.req, input.options.res, input.userContext);
  const uid = session.getUserId();
  try {
    await admin.auth().revokeRefreshTokens(uid);
  } catch (e) {
    const message = `An error occurred when attempting to revoke Firebase refresh tokens from user ${uid}: ${toMessage(e)}`;
    functions.logger.error(message);
  }
  return originalImplementation.signOutPOST!(input);
};

const toMessage = (e: any): any => {
  const error = e as Error;
  const message = error.message || error.toString() || error;
  return message;
};
