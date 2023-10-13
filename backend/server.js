require("dotenv").config();
const jwt = require("jsonwebtoken");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const itemsRouter = require("./routes/items");
const adminRouter = require("./routes/admin");
const User = require("./models/user");
const Order = require("./models/order");
const AdminUser = require("./models/adminUser");
const Inventory = require("./models/inventory");

const Appointment = require("./models/appointment");
const { Tune } = require("@mui/icons-material");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(itemsRouter);
app.use(adminRouter);

mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

mongoose.connection.on("connected", () => {
  const connectedDatabaseName = mongoose.connection.db.databaseName;
  console.log(`Connected to MongoDB database: ${connectedDatabaseName}`);
});

mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});
