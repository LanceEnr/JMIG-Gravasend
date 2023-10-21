const express = require("express");
const router = express.Router();
const axios = require("axios");
const admin = require("firebase-admin");

router.get("/fetch-cargo", (req, res) => {
  axios
    .get("https://gravasend-965f7-default-rtdb.firebaseio.com/Cargo.json")
    .then((response) => {
      const cargoData = response.data;

      if (cargoData) {
        res.json(cargoData);
      } else {
        console.log('No data found in the "Cargo" collection.');
        res.status(404).json({ message: "No data found" });
      }
    })
    .catch((error) => {
      console.error("Firebase connection error:", error);
      res.status(500).json({ message: "Internal server error" });
    });
});
router.get("/fetch-documentCheck", (req, res) => {
  axios
    .get(
      "https://gravasend-965f7-default-rtdb.firebaseio.com/Document Check.json"
    )
    .then((response) => {
      const documentData = response.data;

      if (documentData) {
        res.json(documentData);
      } else {
        console.log('No data found in the "Document Check" collection.');
        res.status(404).json({ message: "No data found" });
      }
    })
    .catch((error) => {
      console.error("Firebase connection error:", error);
      res.status(500).json({ message: "Internal server error" });
    });
});

router.get("/fetch-documentCheckSignatures", (req, res) => {
  axios
    .get(
      "https://gravasend-965f7-default-rtdb.firebaseio.com/Document Check Signatures.json"
    )
    .then((response) => {
      const signatureData = response.data;

      if (signatureData) {
        res.json(signatureData);
      } else {
        console.log(
          'No data found in the "Document Signature Check" collection.'
        );
        res.status(404).json({ message: "No data found" });
      }
    })
    .catch((error) => {
      console.error("Firebase connection error:", error);
      res.status(500).json({ message: "Internal server error" });
    });
});

router.get("/fetch-proof", (req, res) => {
  axios
    .get(
      "https://gravasend-965f7-default-rtdb.firebaseio.com/ProofOfDelivery.json"
    )
    .then((response) => {
      const proofData = response.data;

      if (proofData) {
        res.json(proofData);
      } else {
        console.log('No data found in the "Proof of Delivery" collection.');
        res.status(404).json({ message: "No data found" });
      }
    })
    .catch((error) => {
      console.error("Firebase connection error:", error);
      res.status(500).json({ message: "Internal server error" });
    });
});

router.get("/fetch-schecklist", (req, res) => {
  axios
    .get(
      "https://gravasend-965f7-default-rtdb.firebaseio.com/Safety Checklist.json"
    )
    .then((response) => {
      const checlistData = response.data;

      if (checlistData) {
        res.json(checlistData);
      } else {
        console.log('No data found in the "Safety Checklist" collection.');
        res.status(404).json({ message: "No data found" });
      }
    })
    .catch((error) => {
      console.error("Firebase connection error:", error);
      res.status(500).json({ message: "Internal server error" });
    });
});

router.get("/fetch-speed", (req, res) => {
  axios
    .get(
      "https://gravasend-965f7-default-rtdb.firebaseio.com/SpeedTracker.json"
    )
    .then((response) => {
      const speedData = response.data;

      if (speedData) {
        res.json(speedData);
      } else {
        console.log('No data found in the "Speed" collection.');
        res.status(404).json({ message: "No data found" });
      }
    })
    .catch((error) => {
      console.error("Firebase connection error:", error);
      res.status(500).json({ message: "Internal server error" });
    });
});

router.get("/fetch-tripDash", (req, res) => {
  axios
    .get(
      "https://gravasend-965f7-default-rtdb.firebaseio.com/Trip Dashboard.json"
    )
    .then((response) => {
      const tripData = response.data;

      if (tripData) {
        res.json(tripData);
      } else {
        console.log('No data found in the "Trip Dashboard" collection.');
        res.status(404).json({ message: "No data found" });
      }
    })
    .catch((error) => {
      console.error("Firebase connection error:", error);
      res.status(500).json({ message: "Internal server error" });
    });
});

router.get("/fetch-tripHistory", (req, res) => {
  axios
    .get("https://gravasend-965f7-default-rtdb.firebaseio.com/TripHistory.json")
    .then((response) => {
      const tripHistoryData = response.data;

      if (tripHistoryData) {
        res.json(tripHistoryData);
      } else {
        console.log('No data found in the "Trip History" collection.');
        res.status(404).json({ message: "No data found" });
      }
    })
    .catch((error) => {
      console.error("Firebase connection error:", error);
      res.status(500).json({ message: "Internal server error" });
    });
});

router.get("/fetch-inspectionRecords", (req, res) => {
  axios
    .get(
      "https://gravasend-965f7-default-rtdb.firebaseio.com/inspectionRecords.json"
    )
    .then((response) => {
      const insectionRecordsData = response.data;

      if (insectionRecordsData) {
        res.json(insectionRecordsData);
      } else {
        console.log('No data found in the "Inspection Records" collection.');
        res.status(404).json({ message: "No data found" });
      }
    })
    .catch((error) => {
      console.error("Firebase connection error:", error);
      res.status(500).json({ message: "Internal server error" });
    });
});

router.get("/fetch-location", (req, res) => {
  axios
    .get("https://gravasend-965f7-default-rtdb.firebaseio.com/locations.json")
    .then((response) => {
      const locationData = response.data;

      if (locationData) {
        res.json(locationData);
      } else {
        console.log('No data found in the "Location" collection.');
        res.status(404).json({ message: "No data found" });
      }
    })
    .catch((error) => {
      console.error("Firebase connection error:", error);
      res.status(500).json({ message: "Internal server error" });
    });
});

router.get("/fetch-maintenaceHistory", (req, res) => {
  axios
    .get(
      "https://gravasend-965f7-default-rtdb.firebaseio.com/maintenanceHistory.json"
    )
    .then((response) => {
      const maintenaceHistoryData = response.data;

      if (maintenaceHistoryData) {
        res.json(maintenaceHistoryData);
      } else {
        console.log('No data found in the "Maintenance History" collection.');
        res.status(404).json({ message: "No data found" });
      }
    })
    .catch((error) => {
      console.error("Firebase connection error:", error);
      res.status(500).json({ message: "Internal server error" });
    });
});

router.get("/fetch-maintenanceReminders", (req, res) => {
  axios
    .get(
      "https://gravasend-965f7-default-rtdb.firebaseio.com/maintenanceReminders.json"
    )
    .then((response) => {
      const maintenanceRemindersData = response.data;

      if (maintenanceRemindersData) {
        res.json(maintenanceRemindersData);
      } else {
        console.log('No data found in the "Maintenance Reminders" collection.');
        res.status(404).json({ message: "No data found" });
      }
    })
    .catch((error) => {
      console.error("Firebase connection error:", error);
      res.status(500).json({ message: "Internal server error" });
    });
});

router.get("/fetch-trucks", (req, res) => {
  axios
    .get("https://gravasend-965f7-default-rtdb.firebaseio.com/trucks.json")
    .then((response) => {
      const trucksData = response.data;

      if (trucksData) {
        res.json(trucksData);
      } else {
        console.log('No data found in the "Trucks" collection.');
        res.status(404).json({ message: "No data found" });
      }
    })
    .catch((error) => {
      console.error("Firebase connection error:", error);
      res.status(500).json({ message: "Internal server error" });
    });
});

router.get("/fetch-upcomingInspections", (req, res) => {
  axios
    .get(
      "https://gravasend-965f7-default-rtdb.firebaseio.com/upcomingInspections.json"
    )
    .then((response) => {
      const upcomingInspectionsData = response.data;

      if (upcomingInspectionsData) {
        res.json(upcomingInspectionsData);
      } else {
        console.log('No data found in the "Upcoming Inspections" collection.');
        res.status(404).json({ message: "No data found" });
      }
    })
    .catch((error) => {
      console.error("Firebase connection error:", error);
      res.status(500).json({ message: "Internal server error" });
    });
});

module.exports = router;
