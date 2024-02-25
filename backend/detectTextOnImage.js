const vision = require("@google-cloud/vision");
module.exports.detectTextOnImage = async (req, res) => {
  try {
    const client = new vision.ImageAnnotatorClient();
    const [result] = await client.textDetection(req.file.buffer);
    const detections = result.textAnnotations;
    res.json(detections);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};
