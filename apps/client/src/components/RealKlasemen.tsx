import { useQuery } from "@tanstack/react-query"
import { API } from "../api"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface Standing {
  position: number
  team: {
    name: string
    crest: string
  }
  playedGames: number
  won: number
  draw: number
  lost: number
  goalsFor: number
  goalsAgainst: number
  points: number
}

interface StandingsResponse {
  competition: {
    name: string
    emblem: string
  }
  standings: Array<{
    table: Standing[]
  }>
}

const RealKlasemen = () => {
  const { data, isLoading, error } = useQuery<StandingsResponse>({
    queryKey: ["realStandings", "PL"],
    queryFn: async () => {
      const res = await API.get("/football/standings/PL")
      return res.data
    },
  })

  if (isLoading) {
    return (
      <div className="p-6 space-y-4">
        <Skeleton className="h-12 w-64" />
        <div className="space-y-2">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <Card className="text-center p-8">
          <div className="text-6xl mb-4">😢</div>
          <h2 className="text-xl font-bold mb-2">Failed to load standings</h2>
          <p className="text-muted-foreground">Please try again later</p>
        </Card>
      </div>
    )
  }

  const standings = data?.standings[0]?.table || []

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <Card className="border-primary/20">
        <CardHeader>
          <div className="flex items-center gap-4">
            {data?.competition.emblem && (
              <img
                src={data.competition.emblem}
                alt="League"
                className="h-12 w-12 object-contain"
              />
            )}
            <div>
              <CardTitle className="text-2xl">
                {data?.competition.name || "Premier League"}
              </CardTitle>
              <Badge variant="success" className="mt-1">
                ● LIVE
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-12">#</TableHead>
                <TableHead>Club</TableHead>
                <TableHead className="text-center">P</TableHead>
                <TableHead className="text-center">W</TableHead>
                <TableHead className="text-center">D</TableHead>
                <TableHead className="text-center">L</TableHead>
                <TableHead className="text-center">GF</TableHead>
                <TableHead className="text-center">GA</TableHead>
                <TableHead className="text-center font-bold">Pts</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {standings.map((team) => (
                <TableRow
                  key={team.position}
                  className={cn(
                    "transition-colors",
                    team.position <= 4 && "bg-green-500/10 hover:bg-green-500/20",
                    team.position >= 18 && "bg-red-500/10 hover:bg-red-500/20"
                  )}
                >
                  <TableCell className="font-bold">{team.position}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={team.team.crest}
                        alt={team.team.name}
                        className="h-6 w-6 object-contain"
                      />
                      <span className="font-medium">{team.team.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">{team.playedGames}</TableCell>
                  <TableCell className="text-center text-green-600">{team.won}</TableCell>
                  <TableCell className="text-center text-yellow-600">{team.draw}</TableCell>
                  <TableCell className="text-center text-red-600">{team.lost}</TableCell>
                  <TableCell className="text-center">{team.goalsFor}</TableCell>
                  <TableCell className="text-center">{team.goalsAgainst}</TableCell>
                  <TableCell className="text-center font-bold text-lg">{team.points}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Legend */}
      <div className="flex gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded bg-green-500" />
          <span>Champions League</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded bg-red-500" />
          <span>Relegation</span>
        </div>
      </div>
    </div>
  )
}

export default RealKlasemen
