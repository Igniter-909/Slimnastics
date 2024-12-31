import { Route, Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import AboutUs from "./Pages/AboutUs"
import NotFound from "./Pages/NotFound"
import EditProfile from "./Pages/user/EditProfile"
import ShowPlan from "./Pages/plans/ShowPlan"
import PlanPage from "./components/PlanPage"
import AddPlan from "./Pages/plans/AddPlan"
import AllTrainer from "./Pages/trainers/AllTrainer"

function App() {

  return (
   
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route> 
        <Route path="/about" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/editProfile" element={<EditProfile />} />
        <Route path="/plan" element={<ShowPlan />} />
        <Route path="/plan/:_id" element={<PlanPage />} />
        <Route path="/plan/add" element={<AddPlan />} />
        <Route path="/trainers" element={<AllTrainer />} />
        <Route path="*" element={<NotFound />} /> 
      </Routes>  
    </>
  )
}

export default App
