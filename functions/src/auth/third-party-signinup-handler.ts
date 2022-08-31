export const thirdPartySignInUpPOST = (originalImplementation: any) => async function(input: any) {
  const response = await originalImplementation.thirdPartySignInUpPOST(input);
  return response;
};
