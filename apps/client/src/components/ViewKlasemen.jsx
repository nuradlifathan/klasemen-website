import React, { useState, useEffect } from "react"
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
} from "@chakra-ui/react"
import { API } from "../api"

const ViewKlasemen = () => {
  const [klasemen, setKlasemen] = useState([])

  useEffect(() => {
    API.get("/klub/klasemen")
      .then((res) => {
        setKlasemen(res.data)
      })
      .catch((err) => console.error(err))
  }, [])

  const tableSize = useBreakpointValue({ base: "sm", md: "md", lg: "lg" })

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
            {klasemen.map((club) => (
              <Tr key={club.id}>
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
