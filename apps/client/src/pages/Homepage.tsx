import { Heading, Stack, Text } from "@chakra-ui/react"

const Homepage = () => {
  return (
    <>
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
    </>
  )
}

export default Homepage
