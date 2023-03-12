import { Route, Routes } from "react-router-dom"

import CreateClub from "./components/CreateClub"
import InputScoreForm from "./components/InputScore"
import ViewKlasemen from "./components/ViewKlasemen"
import Homepage from "./pages/Homepage"

const RoutePath = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create-club" element={<CreateClub />} />
        <Route path="/input-match" element={<InputScoreForm />} />
        <Route path="/view-klasemen" element={<ViewKlasemen />} />
      </Routes>
    </>
  )
}

export default RoutePath
