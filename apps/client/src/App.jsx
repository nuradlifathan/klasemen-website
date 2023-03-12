import React from "react"
import { Flex, Text, Heading, Container, Stack } from "@chakra-ui/react"
import Sidebar from "./components/layout/Sidebar"
import RoutePath from "./Routes"

function App() {
  return (
    <Flex w="100%">
      <Sidebar />

      <Container maxW="3xl">
        <RoutePath />

        <Stack
          textAlign="center"
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Welcome to <br />
            <Text as="span" color="teal.400">
              Klasemen Website
            </Text>
          </Heading>
        </Stack>
      </Container>
    </Flex>
  )
}

export default App
