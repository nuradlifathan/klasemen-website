import { useState } from "react"
import {
  Flex,
  Text,
  IconButton,
  Divider,
  Avatar,
  Heading,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react"
import { FiMenu, FiHome, FiLayout, FiPlus, FiMoon, FiSun } from "react-icons/fi"
import NavItem from "../layout/NavItem"
import { Link } from "react-router-dom"

export default function Sidebar() {
  const [navSize, changeNavSize] = useState("large")
  const { colorMode, toggleColorMode } = useColorMode()
  const bgColor = useColorModeValue("white", "gray.800")

  return (
    <Flex
      pos="sticky"
      left="5"
      h="95vh"
      marginTop="2.5vh"
      boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
      borderRadius={navSize == "small" ? "15px" : "30px"}
      w={navSize == "small" ? "75px" : "200px"}
      flexDir="column"
      justifyContent="space-between"
      bg={bgColor}
    >
      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize == "small" ? "center" : "flex-start"}
        as="nav"
      >
        <Flex justify="space-between" w="100%" align="center">
          <IconButton
            aria-label="Toggle menu"
            background="none"
            mt={5}
            _hover={{ background: "none" }}
            icon={<FiMenu />}
            onClick={() => {
              if (navSize == "small") changeNavSize("large")
              else changeNavSize("small")
            }}
          />
          <IconButton
            aria-label="Toggle dark mode"
            background="none"
            mt={5}
            _hover={{ background: "none" }}
            icon={colorMode === "light" ? <FiMoon /> : <FiSun />}
            onClick={toggleColorMode}
          />
        </Flex>
        <Link to="/">
          <NavItem navSize={navSize} icon={FiHome} title="Dashboard" />
        </Link>
        <Link to="/create-club">
          <NavItem navSize={navSize} icon={FiHome} title="Create Club" />
        </Link>
        <Link to="/input-match">
          <NavItem navSize={navSize} icon={FiPlus} title="Input Match" />
        </Link>
        <Link to="/view-klasemen">
          <NavItem navSize={navSize} icon={FiLayout} title="View Klasemen" />
        </Link>
        <Link to="/real-klasemen">
          <NavItem navSize={navSize} icon={FiLayout} title="Live Standings" />
        </Link>
      </Flex>

      <Flex
        p="5%"
        flexDir="column"
        w="100%"
        alignItems={navSize == "small" ? "center" : "flex-start"}
        mb={4}
      >
        <Divider display={navSize == "small" ? "none" : "flex"} />
        <Flex mt={4} align="center">
          <Avatar size="sm" src="avatar-1.jpg" />
          <Flex
            flexDir="column"
            ml={4}
            display={navSize == "small" ? "none" : "flex"}
          >
            <Heading as="h3" size="sm">
              Nur Adli Fathan
            </Heading>
            <Text color="gray">Admin</Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}
