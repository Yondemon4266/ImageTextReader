const vision = require("@google-cloud/vision");
module.exports.detectThemes = async (req, res) => {
  try {
    const client = new vision.ImageAnnotatorClient();
    const [result] = await client.labelDetection(req.file.buffer);
    const labels = result.labelAnnotations;
    res.json(labels);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};
