import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useBreakpointValue,
  TableContainer,
  Spinner,
  Center,
  Text,
  Image,
  HStack,
  Badge,
} from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { API } from "../api"

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
      const res = await API.get("/api/football/standings/PL")
      return res.data
    },
  })

  const tableSize = useBreakpointValue({ base: "sm", md: "md" })

  if (isLoading) {
    return (
      <Center h="100vh">
        <Spinner size="xl" />
      </Center>
    )
  }

  if (error) {
    return (
      <Center h="100vh">
        <Text color="red.500">Failed to load standings</Text>
      </Center>
    )
  }

  const standings = data?.standings[0]?.table || []

  return (
    <Box m="2rem">
      <HStack mb="1rem" spacing={4}>
        {data?.competition.emblem && (
          <Image src={data.competition.emblem} alt="League" boxSize="50px" />
        )}
        <Heading as="h1">{data?.competition.name || "Premier League"}</Heading>
        <Badge colorScheme="green">LIVE</Badge>
      </HStack>
      <TableContainer overflowX="auto">
        <Table size={tableSize} variant="striped">
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Club</Th>
              <Th isNumeric>P</Th>
              <Th isNumeric>W</Th>
              <Th isNumeric>D</Th>
              <Th isNumeric>L</Th>
              <Th isNumeric>GF</Th>
              <Th isNumeric>GA</Th>
              <Th isNumeric>Pts</Th>
            </Tr>
          </Thead>
          <Tbody>
            {standings.map((team) => (
              <Tr key={team.position}>
                <Td fontWeight="bold">{team.position}</Td>
                <Td>
                  <HStack>
                    <Image
                      src={team.team.crest}
                      alt={team.team.name}
                      boxSize="24px"
                    />
                    <Text>{team.team.name}</Text>
                  </HStack>
                </Td>
                <Td isNumeric>{team.playedGames}</Td>
                <Td isNumeric>{team.won}</Td>
                <Td isNumeric>{team.draw}</Td>
                <Td isNumeric>{team.lost}</Td>
                <Td isNumeric>{team.goalsFor}</Td>
                <Td isNumeric>{team.goalsAgainst}</Td>
                <Td isNumeric fontWeight="bold">{team.points}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default RealKlasemen
