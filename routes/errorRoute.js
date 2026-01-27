const express = require("express");
const router = express.Router();
const errorController = require("../controllers/errorController");
const utilities = require("../utilities/");

// Route to trigger intentional error
router.get(
  "/trigger-error",
  utilities.handleErrors(errorController.triggerIntentionalError),
);

module.exports = router;
