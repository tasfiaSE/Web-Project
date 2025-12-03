import express from "express";

const router = express.Router();

router.post("/check", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "No text provided" });
  }

  try {
    const response = await fetch(
      "https://api.languagetool.org/v2/check?" +
        new URLSearchParams({
          text,
          language: "en-US",
        }),
      {
        method: "POST",
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error checking grammar" });
  }
});

export default router;
