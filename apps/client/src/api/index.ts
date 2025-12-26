import axios from "axios"

const API = axios.create({
  baseURL: "http://localhost:8000",
})

// Typed API functions for TanStack Query
export const api = {
  getKlasemen: async () => {
    const res = await API.get("/klub/klasemen")
    return res.data
  },
  getAllClubs: async () => {
    const res = await API.get("/klub")
    return res.data
  },
  createClub: async (data: { team: string }) => {
    const res = await API.post("/klub/create", data)
    return res.data
  },
  inputScore: async (data: { ClubId: number; opponent_name: string; score: string }) => {
    const res = await API.post("/klub/input-score", data)
    return res.data
  },
}

export { API }
