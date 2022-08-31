import * as admin from 'firebase-admin';

/**
 * When a new Session is created, we also need to create a new custom
 * Firebase Token.
 */
export const createNewSession = (originalImplementation: any) => async function(input: any) {
  const uid = input.userId;
  // Create the custom Firebase token using the Firebase Admin SDK
  const firebaseToken = await admin.auth().createCustomToken(uid);
  // Include the custom Firebase token as part of the accessTokenPayload
  input.accessTokenPayload = {
    ...input.accessTokenPayload,
    firebaseToken,
  };
  const result = await originalImplementation.createNewSession(input);
  return result;
};
