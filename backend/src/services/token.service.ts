const tokenStore: Record<string, any> = {}; // Replace with DB or secure store

export const storeToken = async (email: string, tokens: any) => {
  tokenStore[email] = tokens;
};

export const getToken = async (email: string) => {
  return tokenStore[email];
};
