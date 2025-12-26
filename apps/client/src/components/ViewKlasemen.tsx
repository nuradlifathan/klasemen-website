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
} from "@chakra-ui/react"
import { useQuery } from "@tanstack/react-query"
import { api } from "../api"

interface KlasemenItem {
  no: number
  klub: string
  main: number
  menang: number
  seri: number
  kalah: number
  goal_masuk: number
  goal_kemasukan: number
  point: number
}

const ViewKlasemen = () => {
  const { data: klasemen, isLoading, error } = useQuery<KlasemenItem[]>({
    queryKey: ["klasemen"],
    queryFn: api.getKlasemen,
  })

  const tableSize = useBreakpointValue({ base: "sm", md: "md", lg: "lg" })

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
        <Text color="red.500">Failed to load klasemen</Text>
      </Center>
    )
  }

  return (
    <Box m="2rem">
      <Heading as="h1" mb="1rem">
        Premier League
      </Heading>
      <TableContainer overflowX="auto">
        <Table size={tableSize} variant="striped">
          <Thead>
            <Tr>
              <Th>No</Th>
              <Th>Klub</Th>
              <Th>Main</Th>
              <Th>Menang</Th>
              <Th>Seri</Th>
              <Th>Kalah</Th>
              <Th>Goal Masuk</Th>
              <Th>Goal Kemasukan</Th>
              <Th width="50px">Point</Th>
            </Tr>
          </Thead>
          <Tbody>
            {klasemen?.map((club) => (
              <Tr key={club.no}>
                <Td>{club.no}</Td>
                <Td>{club.klub}</Td>
                <Td>{club.main}</Td>
                <Td>{club.menang}</Td>
                <Td>{club.seri}</Td>
                <Td>{club.kalah}</Td>
                <Td>{club.goal_masuk}</Td>
                <Td>{club.goal_kemasukan}</Td>
                <Td>{club.point}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default ViewKlasemen
