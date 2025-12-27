import 'dotenv/config'
import { serve } from '@hono/node-server'
import app from './app'

// For local development only
const PORT = 8000

serve({
  fetch: app.fetch,
  port: PORT
}, () => {
  console.log(`Listening to PORT ${PORT}`)
})
