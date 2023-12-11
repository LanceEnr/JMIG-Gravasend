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
const router = express.Router();
const multer = require("multer");
const fs = require("fs");

const User = require("./models/user");
const Order = require("./models/order");
const AdminUser = require("./models/adminUser");
const Inventory = require("./models/inventory");
const Appointment = require("./models/appointment");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(itemsRouter);
app.use(adminRouter);
app.use(mobileRouter);

// Connect to MongoDB
mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log(
    `Connected to MongoDB database: ${mongoose.connection.db.databaseName}`
  );
});

mongoose.connection.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

// Firebase setup
const serviceAccount = require("./gravasend-965f7-firebase-adminsdk-ts4oz-eebc1a8275.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://gravasend-965f7-default-rtdb.firebaseio.com",
  storageBucket: "gravasend-965f7.appspot.com",
});
const bucket = admin.storage().bucket();

const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage });

router.put(
  "/update-user-profilepic",
  upload.single("image"),
  async (req, res) => {
    try {
      let image = req.body.image;

      if (req.file) {
        // Upload the image to Firebase Storage
        const fileBuffer = req.file.buffer;
        const originalname = req.file.originalname;
        const extname = path.extname(originalname);
        const username = req.body._userName;
        const filename = `${username}${extname}`;
        const filePath = `images/profile/${filename}`;

        await bucket.file(filePath).save(fileBuffer, {
          metadata: {
            contentType: req.file.mimetype,
          },
        });

        res
          .status(200)
          .json({ message: "Profile picture updated successfully" });
      } else {
        res.status(400).json({ error: "No file provided" });
      }
    } catch (error) {
      console.error("Error updating profile picture:", error);
      res.status(500).json({ error: "Profile picture update failed" });
    }
  }
);

const firebasedb = admin.database();
firebasedb
  .ref("/")
  .once("value")
  .then(() => console.log("Connected to Firebase"))
  .catch((error) => console.error("Firebase connection error:", error));

// Serve static files from the React app
// app.use(express.static(path.join(__dirname, "../build")));

// The "catchall" handler: for any request that doesn't
// match one above, send back the index.html file.
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../build", "index.html"));
// });

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
