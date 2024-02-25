// server.js
const express = require("express");
const dotenv = require("dotenv").config();
const app = express();
const cors = require("cors");
const multer = require("multer");
const upload = multer();
const { detectTextOnImage } = require("./detectTextOnImage");
const { detectThemes } = require("./detectThemes");
const port = process.env.SERVER_PORT;
const corsOptions = {
  origin: [process.env.CLIENT_URL, process.env.CLIENT_URL2],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};

app.use(cors(corsOptions));
app.post("/detectTextOnImage", upload.single("file"), detectTextOnImage);
app.post("/detectThemes", upload.single("file"), detectThemes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
