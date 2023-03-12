import { Route, Routes } from "react-router-dom"
import App from "./App"
import CreateClub from "./components/CreateClub"

const RoutePath = () => {
  return (
    <>
      <Routes>
        <Route path="/" />
        <Route path="/create-club" element={<CreateClub />} />
      </Routes>
    </>
  )
}

export default RoutePath
