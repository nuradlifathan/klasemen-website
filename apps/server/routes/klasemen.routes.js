const express = require("express")
const klasemenControllers = require("../controllers/klasemen.controllers")
const router = express.Router()

router.post("/create", klasemenControllers.createClubs)

module.exports = router
