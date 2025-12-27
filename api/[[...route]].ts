import type { VercelRequest, VercelResponse } from '@vercel/node'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  const path = req.query.route as string[] || []
  const fullPath = '/' + path.join('/')

  try {
    // ==================== KLUB ROUTES ====================
    
    // GET /api/klub
    if (fullPath === '/klub' && req.method === 'GET') {
      const clubs = await prisma.club.findMany({ select: { id: true, team: true } })
      return res.json(clubs)
    }

    // GET /api/klub/klasemen
    if (fullPath === '/klub/klasemen' && req.method === 'GET') {
      const klasemen = await prisma.club.findMany({
        orderBy: [{ point: 'desc' }, { goal_masuk: 'desc' }, { team: 'asc' }],
      })
      return res.json(klasemen.map((club, index) => ({
        no: index + 1, klub: club.team, main: club.main, menang: club.menang,
        seri: club.seri, kalah: club.kalah, goal_masuk: club.goal_masuk,
        goal_kemasukan: club.goal_kemasukan, point: club.point,
      })))
    }

    // POST /api/klub/create
    if (fullPath === '/klub/create' && req.method === 'POST') {
      const { team } = req.body
      const club = await prisma.club.create({
        data: { team, main: 0, menang: 0, seri: 0, kalah: 0, goal_masuk: 0, goal_kemasukan: 0, point: 0 }
      })
      return res.json(club)
    }

    // POST /api/klub/input-score
    if (fullPath === '/klub/input-score' && req.method === 'POST') {
      const { ClubId, opponent_name, score } = req.body
      const club = await prisma.club.findUnique({ where: { id: ClubId } })
      if (!club) return res.status(404).json({ message: 'Club not found' })
      
      const [homeScore, awayScore] = score.split('-').map(Number)
      const opponent = await prisma.club.findFirst({ where: { team: opponent_name } })
      if (!opponent) return res.status(404).json({ message: 'Opponent not found' })

      await prisma.match.create({ data: { clubId: ClubId, opponent_name, score } })

      const updatedClub = await prisma.club.update({
        where: { id: ClubId },
        data: {
          main: club.main + 1, goal_masuk: club.goal_masuk + homeScore,
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
          main: opponent.main + 1, goal_masuk: opponent.goal_masuk + awayScore,
          goal_kemasukan: opponent.goal_kemasukan + homeScore,
          menang: homeScore < awayScore ? opponent.menang + 1 : opponent.menang,
          seri: homeScore === awayScore ? opponent.seri + 1 : opponent.seri,
          kalah: homeScore > awayScore ? opponent.kalah + 1 : opponent.kalah,
          point: homeScore < awayScore ? opponent.point + 3 : (homeScore === awayScore ? opponent.point + 1 : opponent.point),
        }
      })

      return res.json({ club: updatedClub, opponent: updatedOpponent })
    }

    // ==================== FOOTBALL API ROUTES ====================
    
    // GET /api/football/standings/:competition
    if (fullPath.startsWith('/football/standings/') && req.method === 'GET') {
      const competition = path[path.length - 1]
      const apiKey = process.env.FOOTBALL_API_KEY
      if (!apiKey) return res.status(500).json({ error: 'API key not configured' })

      const response = await fetch(
        `https://api.football-data.org/v4/competitions/${competition}/standings`,
        { headers: { 'X-Auth-Token': apiKey } }
      )

      if (!response.ok) return res.status(502).json({ error: 'Failed to fetch standings' })
      return res.json(await response.json())
    }

    // GET /api/health
    if (fullPath === '/health' && req.method === 'GET') {
      return res.json({ status: 'ok' })
    }

    return res.status(404).json({ error: 'Not found' })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
