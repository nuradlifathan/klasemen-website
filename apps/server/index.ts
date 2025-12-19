const express = require("express")
const cors = require("cors")
const db = require("./models")
const PORT = 8000
const app = express()
app.use(cors())
app.use(express.json())

const klasemenRoute = require("./routes/klasemen.routes")

app.use("/klub", klasemenRoute)

app.listen(PORT, (err) => {
  db.sequelize.sync({ alter: true })
  if (err) {
    console.log(`Error : ${err.message}`)
  } else {
    console.log(`Listening to PORT ${PORT}`)
  }
})
