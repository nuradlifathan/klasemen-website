import { Route, Routes } from "react-router-dom"

import CreateClub from "./components/CreateClub"
import InputScoreForm from "./components/InputScore2"
import ViewKlasemen from "./components/ViewKlasemen"
import RealKlasemen from "./components/RealKlasemen"
import Homepage from "./pages/Homepage"

const RoutePath = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create-club" element={<CreateClub />} />
        <Route path="/input-match" element={<InputScoreForm />} />
        <Route path="/view-klasemen" element={<ViewKlasemen />} />
        <Route path="/real-klasemen" element={<RealKlasemen />} />
      </Routes>
    </>
  )
}

export default RoutePath
