import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react"
import { useFormik } from "formik"
import { API } from "../api"
import * as Yup from "yup"
import { useState } from "react"

const CreateClub = () => {
  const toast = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const create = useFormik({
    initialValues: {
      team: "",
    },
    onSubmit: async ({ team }, { resetForm }) => {
      setIsLoading(true)

      try {
        await API.post("/klub/create", { team })

        toast({
          title: "Successfully Create Club",
          status: "success",
        })

        resetForm()
      } catch (err) {
        toast({ title: "Network Error", status: "error" })
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    },
    validationSchema: Yup.object({
      team: Yup.string().required("Club Name still empty"),
    }),
    validateOnChange: false,
  })

  const formChange = ({ target }) => {
    const { name, value } = target
    create.setFieldValue(name, value)
  }
  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <Stack
        spacing="4"
        w="full"
        maxW="md"
        bg={useColorModeValue("white", "gray.700")}
        rounded="xl"
        boxShadow="lg"
        p="6"
        my="12"
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
          Create Football Club
        </Heading>
        <FormControl isInvalid={create.errors.team}>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="type your dream club"
            _placeholder={{ color: "gray.500" }}
            onChange={formChange}
            name="team"
            type="text"
            value={create.values.team}
          />
          <FormErrorMessage>{create.errors.team}</FormErrorMessage>
        </FormControl>

        <Stack spacing={6}>
          <Button
            bg="blue.400"
            color="white"
            _hover={{
              bg: "blue.500",
            }}
            onClick={create.handleSubmit}
            type="submit"
            isLoading={isLoading}
          >
            Create
          </Button>
        </Stack>
      </Stack>
    </Flex>
  )
}
export default CreateClub
