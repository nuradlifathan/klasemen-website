import React, { useState } from "react"
import {
  Box,
  Input,
  Button,
  Stack,
  Flex,
  Text,
  Spinner,
  useToast,
} from "@chakra-ui/react"
import { API } from "../api"

const InputScoreForm = () => {
  const [matches, setMatches] = useState([
    { ClubId: "", opponent_name: "", score: "" },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const toast = useToast()

  const handleMatchChange = (index, key, value) => {
    const updatedMatches = [...matches]
    updatedMatches[index][key] = value
    setMatches(updatedMatches)
  }

  const addMatch = () => {
    setMatches([...matches, { ClubId: "", opponent_name: "", score: "" }])
  }

  const handleSaveClick = async () => {
    setIsLoading(true)

    try {
      await API.post("/klub/klasemen", { matches })
      setMatches([{ ClubId: "", opponent_name: "", score: "" }])
      toast({
        title: "Successfully Create Match",
        status: "success",
      })
    } catch (error) {
      toast({ title: "Network Error", status: "error" })
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const isSaveDisabled = matches.some(
    (match) =>
      !match.ClubId || !match.opponent_name || !match.score || isLoading
  )

  return (
    <Box>
      {matches.map((match, index) => (
        <Box key={index} mt={index > 0 ? 4 : 0}>
          <Text fontSize="xl">Match {index + 1}</Text>
          <Stack spacing={4} mt={2}>
            <Input
              placeholder="Club ID"
              value={match.ClubId}
              onChange={(e) =>
                handleMatchChange(index, "ClubId", e.target.value)
              }
            />
            <Input
              placeholder="Opponent Name"
              value={match.opponent_name}
              onChange={(e) =>
                handleMatchChange(index, "opponent_name", e.target.value)
              }
            />
            <Input
              placeholder="Score (e.g. 3-1)"
              value={match.score}
              onChange={(e) =>
                handleMatchChange(index, "score", e.target.value)
              }
            />
          </Stack>
        </Box>
      ))}
      <Flex justify="space-between" alignItems="center" mt={4}>
        <Button onClick={addMatch}>Add Match</Button>
        <Button
          colorScheme="green"
          onClick={handleSaveClick}
          disabled={isSaveDisabled}
        >
          {isLoading ? <Spinner size="sm" /> : "Save"}
        </Button>
      </Flex>
    </Box>
  )
}

export default InputScoreForm
