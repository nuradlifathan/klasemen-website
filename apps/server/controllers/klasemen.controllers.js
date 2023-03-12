const { Club, Match } = require("../models")
module.exports = {
  createClubs: async (req, res) => {
    try {
      const { team } = req.body
      const club = await Club.create({
        team,
        main: 0,
        menang: 0,
        seri: 0,
        kalah: 0,
        goal_masuk: 0,
        goal_kemasukan: 0,
        point: 0,
      })
      res.json(club)
    } catch (err) {
      console.error(err)
    }
  },
  inputScore: async (req, res) => {
    try {
      const { ClubId, opponent_name, score } = req.body

      const club = await Club.findByPk(ClubId)
      if (!club) {
        res.status(404).json({ message: "Club not found" })
        return
      }

      const [homeScore, awayScore] = score.split("-").map(Number)

      // Find the opponent club
      const opponent = await Club.findOne({ where: { team: opponent_name } })
      if (!opponent) {
        res.status(404).json({ message: "Opponent not found" })
        return
      }

      await Match.create({
        ClubId,
        opponent_name,
        score,
      })

      // Update home team statistics
      club.main += 1
      club.goal_masuk += homeScore
      club.goal_kemasukan += awayScore
      if (homeScore > awayScore) {
        club.menang += 1
        club.point += 3
      } else if (homeScore === awayScore) {
        club.seri += 1
        club.point += 1
      } else {
        club.kalah += 1
      }
      await club.save()

      // Update opponent team statistics
      opponent.main += 1
      opponent.goal_masuk += awayScore
      opponent.goal_kemasukan += homeScore
      if (homeScore < awayScore) {
        opponent.menang += 1
        opponent.point += 3
      } else if (homeScore === awayScore) {
        opponent.seri += 1
        opponent.point += 1
      } else {
        opponent.kalah += 1
      }
      await opponent.save()

      res.json({ club, opponent })
    } catch (error) {
      console.error(error)
      res.status(500).send("Error inputting score")
    }
  },
  viewKlasemen: async (req, res) => {
    try {
      const klasemen = await Club.findAll({
        order: [
          ["point", "DESC"],
          ["goal_masuk", "DESC"],
          ["team", "ASC"],
        ],
      })
      res.json(
        klasemen.map((club, index) => ({
          no: index + 1,
          klub: club.team,
          main: club.main,
          menang: club.menang,
          seri: club.seri,
          kalah: club.kalah,
          goal_masuk: club.goal_masuk,
          goal_kemasukan: club.goal_kemasukan,
          point: club.point,
        }))
      )
    } catch (err) {
      console.error(err)
    }
  },
}
