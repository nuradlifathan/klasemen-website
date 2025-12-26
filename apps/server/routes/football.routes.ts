import { Hono } from 'hono'

const router = new Hono()

// Get standings for a competition
router.get('/standings/:competition', async (c) => {
  try {
    const competition = c.req.param('competition')
    const apiKey = process.env.FOOTBALL_API_KEY

    if (!apiKey) {
      return c.json({ error: 'API key not configured' }, 500)
    }

    const response = await fetch(
      `https://api.football-data.org/v4/competitions/${competition}/standings`,
      {
        headers: {
          'X-Auth-Token': apiKey,
        },
      }
    )

    if (!response.ok) {
      return c.json({ error: 'Failed to fetch standings' }, 502)
    }

    const data = await response.json()
    return c.json(data)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

// Get list of available competitions
router.get('/competitions', async (c) => {
  try {
    const apiKey = process.env.FOOTBALL_API_KEY

    if (!apiKey) {
      return c.json({ error: 'API key not configured' }, 500)
    }

    const response = await fetch(
      'https://api.football-data.org/v4/competitions',
      {
        headers: {
          'X-Auth-Token': apiKey,
        },
      }
    )

    if (!response.ok) {
      return c.json({ error: 'Failed to fetch competitions' }, 502)
    }

    const data = await response.json()
    return c.json(data)
  } catch (error) {
    console.error(error)
    return c.json({ error: 'Internal server error' }, 500)
  }
})

export default router
