require("dotenv").config();
const jwt = require("jsonwebtoken");
const express = require("express");
const mongoose = require("mongoose");
const admin = require("firebase-admin");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const itemsRouter = require("./routes/items");
const adminRouter = require("./routes/admin");
const mobileRouter = require("./routes/mobile");
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
app.use(mobileRouter);

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
const serviceAccount = require("./gravasend-965f7-firebase-adminsdk-ts4oz-eebc1a8275.json"); // Replace with the actual path to your service account key
const firebaseAdminConfig = {
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://gravasend-965f7-default-rtdb.firebaseio.com", // Replace with your Firebase Realtime Database URL
};

admin.initializeApp(firebaseAdminConfig);
const firebasedb = admin.database();

const ref = firebasedb.ref("/");
ref
  .once("value")
  .then((snapshot) => {
    console.log("Connected to Firebase");
    // You can perform operations on Firebase data here.
  })
  .catch((error) => {
    console.error("Firebase connection error:", error);
  });
