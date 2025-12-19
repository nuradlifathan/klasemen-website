import { Context } from 'hono'
const { Club, Match } = require('../models')

export const createClubs = async (c: Context) => {
  try {
    const { team } = await c.req.json()
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
    return c.json(club)
  } catch (err) {
    console.error(err)
    return c.json({ error: 'Failed to create club' }, 500)
  }
}

export const inputScore = async (c: Context) => {
  try {
    const { ClubId, opponent_name, score } = await c.req.json()
    console.log({ ClubId, opponent_name, score })

    const club = await Club.findByPk(ClubId)
    if (!club) {
      return c.json({ message: 'Club not found' }, 404)
    }

    const [homeScore, awayScore] = score.split('-').map(Number)

    // Find the opponent club
    const opponent = await Club.findOne({ where: { team: opponent_name } })
    if (!opponent) {
      return c.json({ message: 'Opponent not found' }, 404)
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

    return c.json({ club, opponent })
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Error inputting score' }, 500)
  }
}

export const viewKlasemen = async (c: Context) => {
  try {
    const klasemen = await Club.findAll({
      order: [
        ['point', 'DESC'],
        ['goal_masuk', 'DESC'],
        ['team', 'ASC'],
      ],
    })
    return c.json(
      klasemen.map((club: any, index: number) => ({
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
    return c.json({ error: 'Failed to get klasemen' }, 500)
  }
}

export const getAllClub = async (c: Context) => {
  try {
    const getClub = await Club.findAll({
      attributes: ['id', 'team'],
    })
    return c.json(getClub)
  } catch (err) {
    console.error(err)
    return c.json({ error: 'Failed to get clubs' }, 500)
  }
}
