import 'dotenv/config'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serve } from '@hono/node-server'
import klasemenRoutes from './routes/klasemen.routes'
import footballRoutes from './routes/football.routes'

const app = new Hono()

app.use('*', cors())
app.route('/klub', klasemenRoutes)
app.route('/api/football', footballRoutes)

const PORT = 8000

serve({
  fetch: app.fetch,
  port: PORT
}, () => {
  console.log(`Listening to PORT ${PORT}`)
})

export default app
