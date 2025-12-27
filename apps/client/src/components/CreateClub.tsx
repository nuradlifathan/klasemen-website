import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { api } from "../api"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PlusCircle } from "lucide-react"

const createClubSchema = z.object({
  team: z.string().min(1, "Club name is required"),
})

type CreateClubForm = z.infer<typeof createClubSchema>

const CreateClub = () => {
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
      toast.success("Club created successfully!")
      reset()
      queryClient.invalidateQueries({ queryKey: ["klasemen"] })
      queryClient.invalidateQueries({ queryKey: ["clubs"] })
    },
    onError: () => {
      toast.error("Failed to create club")
    },
  })

  const onSubmit = (data: CreateClubForm) => {
    mutation.mutate({ team: data.team })
  }

  return (
    <div className="p-6 flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto p-3 rounded-full bg-primary/10 w-fit mb-4">
            <PlusCircle className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl">Create Football Club</CardTitle>
          <CardDescription>Add a new club to your custom league</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="team">Club Name</Label>
              <Input
                id="team"
                placeholder="Enter your club name"
                {...register("team")}
                className={errors.team ? "border-destructive" : ""}
              />
              {errors.team && (
                <p className="text-sm text-destructive">{errors.team.message}</p>
              )}
            </div>
            <Button type="submit" className="w-full" isLoading={mutation.isPending}>
              <PlusCircle className="h-4 w-4 mr-2" />
              Create Club
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default CreateClub
