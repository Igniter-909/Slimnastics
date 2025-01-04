import { Route, Routes } from "react-router-dom"
import HomePage2 from "./Pages/HomePage2"
import Login from "./Pages/Login"
import SignUp from "./Pages/Signup"
import AboutUs from "./Pages/AboutUs"
import NotFound from "./Pages/NotFound"
import ShowPlan2 from "./Pages/plans/ShowPlans2"
import PlanPage from "./components/PlanPage"
import AddPlan from "./Pages/plans/AddPlan"
import AllTrainer from "./Pages/trainers/AllTrainer"
import ContactUs from "./Pages/ContactUs"
import ShowBlogs from "./Pages/Blogs/ShowBlogs"
import ShowShop from "./Pages/shop/ShowShop"
import UserProfile from "./Pages/user/UserProfile"

function App() {

  return (
   
    <>
      <Routes>
        <Route path="/" element={<HomePage2 />}></Route> 
        <Route path="/about" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/contactUs" element={<ContactUs />} />

        <Route path="/showblogs" element={<ShowBlogs />} />
        <Route path="/showshop" element={<ShowShop />} />

        <Route path="/profile" element={<UserProfile />} />
        <Route path="/plan" element={<ShowPlan2 />} />
        <Route path="/plan/:_id" element={<PlanPage />} />
        <Route path="/plan/add" element={<AddPlan />} />
        <Route path="/trainers" element={<AllTrainer />} />
        <Route path="*" element={<NotFound />} /> 
      </Routes>  
    </>
  )
}

export default App
