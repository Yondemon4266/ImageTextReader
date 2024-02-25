// server.js
const express = require("express");
const vision = require("@google-cloud/vision");
const app = express();
const cors = require("cors");
const multer = require("multer");
const upload = multer();
const { detectTextOnImage } = require("./detectTextOnImage");
const { detectThemes } = require("./detectThemes");

const corsOptions = {
  origin: ["http://localhost:5500"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

app.use(cors(corsOptions));
app.post("/detectTextOnImage", upload.single("file"), detectTextOnImage);
app.post("/detectThemes", upload.single("file"), detectThemes);
app.listen(9999, () => {
  console.log("Server is running on port 9999");
});
