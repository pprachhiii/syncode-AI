export const verifyInternalApiKey = (req, res, next) => {
  const apiKey = req.header("x-internal-api-key");

  if (!process.env.INTERNAL_API_KEY) {
    console.error("INTERNAL_API_KEY is not configured");
    return res.status(500).json({ message: "Server misconfiguration" });
  }

  if (apiKey !== process.env.INTERNAL_API_KEY) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
};
