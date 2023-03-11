const express = require("express")
const klasemenControllers = require("../controllers/klasemen.controllers")
const router = express.Router()

// Create Club
router.post("/create", klasemenControllers.createClubs)
// Input Score
router.post("/input-score", klasemenControllers.inputScore)
// View Klasemen
router.get("/klasemen", klasemenControllers.viewKlasemen)

module.exports = router
