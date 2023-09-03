const express = require("express");
const registerRoute = require("./Register"); // Import the register route
const app = express();
const PORT = process.env.PORT || 3000;

// Use the register route
app.use("/api", registerRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
