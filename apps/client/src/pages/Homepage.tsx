import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy, PlusCircle, BarChart3, Zap } from "lucide-react"

const Homepage = () => {
  return (
    <div className="p-6 space-y-8">
      {/* Hero Section */}
      <div className="text-center py-12 space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Welcome to{" "}
          <span className="text-primary bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent">
            Foot Lab
          </span>
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Create custom leagues, track standings, and follow real Premier League data in one place.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Link to="/create-club">
          <Card className="hover:border-primary cursor-pointer transition-all hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <PlusCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-lg">Create Club</CardTitle>
                <CardDescription>Add a new team</CardDescription>
              </div>
            </CardHeader>
          </Card>
        </Link>

        <Link to="/input-match">
          <Card className="hover:border-primary cursor-pointer transition-all hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-2 rounded-lg bg-green-500/10">
                <BarChart3 className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <CardTitle className="text-lg">Input Match</CardTitle>
                <CardDescription>Record results</CardDescription>
              </div>
            </CardHeader>
          </Card>
        </Link>

        <Link to="/view-klasemen">
          <Card className="hover:border-primary cursor-pointer transition-all hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-2 rounded-lg bg-yellow-500/10">
                <Trophy className="h-6 w-6 text-yellow-500" />
              </div>
              <div>
                <CardTitle className="text-lg">View Klasemen</CardTitle>
                <CardDescription>Custom league</CardDescription>
              </div>
            </CardHeader>
          </Card>
        </Link>

        <Link to="/real-klasemen">
          <Card className="hover:border-primary cursor-pointer transition-all hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="p-2 rounded-lg bg-red-500/10">
                <Zap className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <CardTitle className="text-lg">Live Standings</CardTitle>
                <CardDescription>Premier League</CardDescription>
              </div>
            </CardHeader>
          </Card>
        </Link>
      </div>

      {/* Feature Highlight */}
      <Card className="glass border-primary/20">
        <CardHeader>
          <CardTitle>⚽ Real-time Premier League Data</CardTitle>
          <CardDescription>
            Get live standings from Football-Data.org API with team logos and up-to-date stats.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link to="/real-klasemen">
            <Button>View Live Standings →</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

export default Homepage
