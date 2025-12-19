import { useEffect, useState } from "react"
import { Formik, Form, Field } from "formik"
import * as Yup from "yup"
import Select from "react-select"
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  useToast,
  VStack,
} from "@chakra-ui/react"
import { API } from "../api"

const InputScoreSchema = Yup.object().shape({
  ClubId: Yup.string().required("Club ID is required"),
  opponent_name: Yup.string().required("Opponent name is required"),
  score: Yup.string().required("Score is required"),
})

const InputScoreForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [teams, setTeams] = useState([])

  const toast = useToast()

  const handleSubmit = async (values, actions) => {
    setIsLoading(true)
    setErrorMessage(null)

    try {
      await API.post("/klub/input-score", values)
      actions.resetForm()

      toast({
        title: "Score has been inputted successfully!",
        status: "success",
      })
    } catch (error) {
      toast({
        title: "Network Error",
        description: setErrorMessage(
          error.response?.data?.message ??
            "An error occurred while inputting the score"
        ),
        status: "error",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const fetchTeam = async () => {
    try {
      const res = await API.get("/klub")
      setTeams(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  const optionTeams = teams.map((val) => {
    return { value: val.id, label: val.team }
  })

  useEffect(() => {
    fetchTeam()
  }, [])

  return (
    <Formik
      initialValues={{ ClubId: "", opponent_name: "", score: "" }}
      onSubmit={handleSubmit}
      validationSchema={InputScoreSchema}
    >
      {(props) => (
        <Form>
          <VStack spacing={4} align="stretch">
            <Heading as="h1" mb="1rem">
              Input Match
            </Heading>
            <Field name="ClubId">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.ClubId && form.touched.ClubId}
                >
                  <FormLabel htmlFor="ClubId">Select Club</FormLabel>

                  <Select
                    id="ClubId"
                    name={field.name}
                    options={optionTeams}
                    value={optionTeams.find(
                      (option) => option.value === field.value
                    )}
                    onChange={(option) =>
                      props.setFieldValue(field.name, option.value)
                    }
                  />
                  <FormErrorMessage>{form.errors.ClubId}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="opponent_name">
              {({ field, form }) => (
                <FormControl
                  isInvalid={
                    form.errors.opponent_name && form.touched.opponent_name
                  }
                >
                  <FormLabel htmlFor="opponent_name">Opponent Name</FormLabel>
                  <Select
                    id="opponent_name"
                    name={field.name}
                    options={optionTeams}
                    value={optionTeams.find(
                      (option) => option.value === field.label
                    )}
                    onChange={(option) =>
                      props.setFieldValue(field.name, option.label)
                    }
                  />

                  <FormErrorMessage>
                    {form.errors.opponent_name}
                  </FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="score">
              {({ field, form }) => (
                <FormControl
                  isInvalid={form.errors.score && form.touched.score}
                >
                  <FormLabel htmlFor="score">Score</FormLabel>
                  <Input {...field} id="score" placeholder="Score (e.g. 3-1)" />
                  <FormErrorMessage>{form.errors.score}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Button
              type="submit"
              isLoading={isLoading}
              disabled={!props.isValid || isLoading}
              colorScheme="teal"
            >
              Submit
            </Button>

            {errorMessage && (
              <FormControl isInvalid={true}>
                <FormErrorMessage>{errorMessage}</FormErrorMessage>
              </FormControl>
            )}
          </VStack>
        </Form>
      )}
    </Formik>
  )
}

export default InputScoreForm
