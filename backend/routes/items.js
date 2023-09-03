const express = require("express");
const router = express.Router();

// Import your Mongoose model for items
const Item = require("../models/user");

// Create a new item
router.post("/routes/items", async (req, res) => {
  try {
    const { name, description } = req.body; // Assuming you have 'name' and 'description' fields in your form
    const newItem = new Item({ name, description });

    // Save the item to the database
    await newItem.save();

    res.status(201).json({ message: "Item created" });
  } catch (error) {
    console.error("Error creating item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get all items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find();

    res.json({ items });
  } catch (error) {
    console.error("Error fetching items:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
