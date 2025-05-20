import { Request, Response } from "express";
import { getGoogleAuthURL, getTokens } from "../services/gmail.service";
import { storeToken } from "../services/token.service";

// Step 1: Redirect to Google OAuth Consent Screen
export const startGoogleAuth = (req: Request, res: Response) => {
  const url = getGoogleAuthURL();
  return res.redirect(url);
};

// Step 2: Handle OAuth Callback and exchange code for tokens
export const googleCallback = async (req: Request, res: Response) => {
  const code = req.query.code as string;

  if (!code) {
    res.status(400).json({ error: "Authorization code is missing." });
    return;
  }

  try {
    const { tokens, userInfo } = await getTokens(code);

    if (!userInfo || !userInfo.email) {
      res.status(402).json({ message: "No user Info Found" });
      return;
    }

    // Store tokens in DB or cache against userId (to be implemented securely)
    await storeToken(userInfo.email, tokens);

    res
      .status(200)
      .json({ message: "Google OAuth successful", email: userInfo.email });
    return;
  } catch (err) {
    console.error("OAuth callback error:", err);
    res.status(500).json({ error: "Failed to authenticate with Google" });
    return;
  }
};

// Step 3: Save tokens directly (used if frontend handles OAuth flow)
export const saveToken = async (req: Request, res: Response) => {
  const { email, tokens } = req.body;

  if (!email || !tokens) {
    res.status(400).json({ error: "Missing email or tokens" });
    return;
  }

  try {
    await storeToken(email, tokens);
    res.status(200).json({ message: "Token saved successfully" });
    return;
  } catch (err) {
    console.error("Saving token failed:", err);
    res.status(500).json({ error: "Internal Server Error" });
    return;
  }
};
