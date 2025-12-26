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
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { api } from "../api"

const createClubSchema = z.object({
  team: z.string().min(1, "Club Name still empty"),
})

type CreateClubForm = z.infer<typeof createClubSchema>

const CreateClub = () => {
  const toast = useToast()
  const queryClient = useQueryClient()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateClubForm>({
    resolver: zodResolver(createClubSchema),
    defaultValues: { team: "" },
  })

  const mutation = useMutation({
    mutationFn: api.createClub,
    onSuccess: () => {
      toast({
        title: "Successfully Create Club",
        status: "success",
      })
      reset()
      queryClient.invalidateQueries({ queryKey: ["klasemen"] })
    },
    onError: () => {
      toast({ title: "Network Error", status: "error" })
    },
  })

  const onSubmit = (data: CreateClubForm) => {
    mutation.mutate({ team: data.team })
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={!!errors.team}>
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="type your dream club"
              _placeholder={{ color: "gray.500" }}
              {...register("team")}
              type="text"
            />
            <FormErrorMessage>{errors.team?.message}</FormErrorMessage>
          </FormControl>

          <Stack spacing={6} mt={4}>
            <Button
              bg="blue.400"
              color="white"
              _hover={{
                bg: "blue.500",
              }}
              type="submit"
              isLoading={mutation.isPending}
            >
              Create
            </Button>
          </Stack>
        </form>
      </Stack>
    </Flex>
  )
}

export default CreateClub
