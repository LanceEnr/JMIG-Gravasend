const express = require("express");
const path = require("path");
const app = express();

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, "build")));

// Serve 'index.js' as the entry point
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.js"));
});

// Handle other routes by serving 'index.js' as well
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.js"));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
