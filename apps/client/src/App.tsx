import React from "react"
import { Flex, Container } from "@chakra-ui/react"
import Sidebar from "./components/layout/Sidebar"
import RoutePath from "./Routes"

function App() {
  return (
    <Flex w="100%">
      <Sidebar />
      <Container maxW="fit-content">
        <RoutePath />
      </Container>
    </Flex>
  )
}

export default App
