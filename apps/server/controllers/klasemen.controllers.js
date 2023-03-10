const { Klub } = require("../models")
module.exports = {
  createClubs: async (req, res) => {
    try {
      const { nama_klub, kota_klub } = req.body

      const existClub = await Klub.findOne({ where: { nama_klub } })
      if (existClub) {
        return res.status(400).json("Nama klub sudah ada, ketik nama lain")
      }

      const createClub = await Klub.create({ nama_klub, kota_klub })
      return res
        .status(201)
        .json({ message: "Klub berhasil dibuat", createClub })
    } catch (err) {
      console.error(err)
    }
  },
}
