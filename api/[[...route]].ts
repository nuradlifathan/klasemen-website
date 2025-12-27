import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { cors } from 'hono/cors'
import { PrismaClient } from '@prisma/client'

// Vercel Serverless Function (Node.js runtime)
export const config = {
  runtime: 'nodejs20.x',
}

const prisma = new PrismaClient()
const app = new Hono().basePath('/api')

app.use('*', cors())

// Health check
app.get('/health', (c) => c.json({ status: 'ok' }))

// ==================== KLUB ROUTES ====================

// Create Club
app.post('/klub/create', async (c) => {
  try {
    const { team } = await c.req.json()
    const club = await prisma.club.create({
      data: { team, main: 0, menang: 0, seri: 0, kalah: 0, goal_masuk: 0, goal_kemasukan: 0, point: 0 }
    })
    return c.json(club)
  } catch (err) {
    console.error(err)
    return c.json({ error: 'Failed to create club' }, 500)
  }
})

// Get All Clubs
app.get('/klub', async (c) => {
  try {
    const clubs = await prisma.club.findMany({ select: { id: true, team: true } })
    return c.json(clubs)
  } catch (err) {
    return c.json({ error: 'Failed to get clubs' }, 500)
  }
})

// View Klasemen
app.get('/klub/klasemen', async (c) => {
  try {
    const klasemen = await prisma.club.findMany({
      orderBy: [{ point: 'desc' }, { goal_masuk: 'desc' }, { team: 'asc' }],
    })
    return c.json(klasemen.map((club, index) => ({
      no: index + 1, klub: club.team, main: club.main, menang: club.menang,
      seri: club.seri, kalah: club.kalah, goal_masuk: club.goal_masuk,
      goal_kemasukan: club.goal_kemasukan, point: club.point,
    })))
  } catch (err) {
    return c.json({ error: 'Failed to get klasemen' }, 500)
  }
})

// Input Score
app.post('/klub/input-score', async (c) => {
  try {
    const { ClubId, opponent_name, score } = await c.req.json()
    const club = await prisma.club.findUnique({ where: { id: ClubId } })
    if (!club) return c.json({ message: 'Club not found' }, 404)
    
    const [homeScore, awayScore] = score.split('-').map(Number)
    const opponent = await prisma.club.findFirst({ where: { team: opponent_name } })
    if (!opponent) return c.json({ message: 'Opponent not found' }, 404)

    await prisma.match.create({ data: { clubId: ClubId, opponent_name, score } })

    const updatedClub = await prisma.club.update({
      where: { id: ClubId },
      data: {
        main: club.main + 1,
        goal_masuk: club.goal_masuk + homeScore,
        goal_kemasukan: club.goal_kemasukan + awayScore,
        menang: homeScore > awayScore ? club.menang + 1 : club.menang,
        seri: homeScore === awayScore ? club.seri + 1 : club.seri,
        kalah: homeScore < awayScore ? club.kalah + 1 : club.kalah,
        point: homeScore > awayScore ? club.point + 3 : (homeScore === awayScore ? club.point + 1 : club.point),
      }
    })

    const updatedOpponent = await prisma.club.update({
      where: { id: opponent.id },
      data: {
        main: opponent.main + 1,
        goal_masuk: opponent.goal_masuk + awayScore,
        goal_kemasukan: opponent.goal_kemasukan + homeScore,
        menang: homeScore < awayScore ? opponent.menang + 1 : opponent.menang,
        seri: homeScore === awayScore ? opponent.seri + 1 : opponent.seri,
        kalah: homeScore > awayScore ? opponent.kalah + 1 : opponent.kalah,
        point: homeScore < awayScore ? opponent.point + 3 : (homeScore === awayScore ? opponent.point + 1 : opponent.point),
      }
    })

    return c.json({ club: updatedClub, opponent: updatedOpponent })
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Error inputting score' }, 500)
  }
})

// ==================== FOOTBALL API ROUTES ====================

app.get('/football/standings/:competition', async (c) => {
  try {
    const competition = c.req.param('competition')
    const apiKey = process.env.FOOTBALL_API_KEY

    if (!apiKey) return c.json({ error: 'API key not configured' }, 500)

    const response = await fetch(
      `https://api.football-data.org/v4/competitions/${competition}/standings`,
      { headers: { 'X-Auth-Token': apiKey } }
    )

    if (!response.ok) return c.json({ error: 'Failed to fetch standings' }, 502)
    return c.json(await response.json())
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

app.get('/football/competitions', async (c) => {
  try {
    const apiKey = process.env.FOOTBALL_API_KEY
    if (!apiKey) return c.json({ error: 'API key not configured' }, 500)

    const response = await fetch('https://api.football-data.org/v4/competitions', {
      headers: { 'X-Auth-Token': apiKey }
    })

    if (!response.ok) return c.json({ error: 'Failed to fetch competitions' }, 502)
    return c.json(await response.json())
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

export default handle(app)
