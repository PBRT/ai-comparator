// Used to serve the production build locally
const express = require("express");
const path = require("path");
const app = express();

const PORT_NUMBER = 9000;

function loggerYellow(msg) {
  console.log("\x1b[33m%s\x1b[0m", msg);
}

app.use(express.static(path.join(__dirname, "build")));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(PORT_NUMBER);

loggerYellow(
  `\n[INFO] Production app available on http://localhost:${PORT_NUMBER}\n`
);
