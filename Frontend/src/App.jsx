import { Route, Routes } from "react-router-dom"
import React from "react"
import HomePage2 from "./Pages/HomePage2"
import Login from "./Pages/Login"
import SignUp from "./Pages/Signup"
import AboutUs from "./Pages/AboutUs"
import NotFound from "./Pages/NotFound"
import ShowPlan2 from "./Pages/plans/ShowPlans2"
import PlanPage from "./components/PlanPage"
import AllTrainer from "./Pages/trainers/AllTrainer"
import ContactUs from "./Pages/ContactUs"
import ShowBlogs from "./Pages/Blogs/ShowBlogs"
import ShowShop from "./Pages/shop/ShowShop"
import UserProfile from "./Pages/user/UserProfile"
import Cart from "./Pages/user/Cart"
import OverviewPage from "./Pages/Admin/OverviewPage"
import Users from "./Pages/Admin/Users"
import Products from "./Pages/Admin/Products"
import Plan from "./Pages/Admin/Plan"
import FAQ from "./Pages/FAQ"
import Trainers from "./Pages/Admin/Trainers"
import AddBlog from "./Pages/Blogs/AddBlog"
import Blogs from "./Pages/Admin/Blogs"
import { useDispatch, useSelector } from "react-redux"
import DisplayBlog from "./Pages/Blogs/DisplayBlog"
import { getAllBlogs } from "./Redux/Slices/BlogSlice"
import { useEffect } from "react"
import Notifications from "./Pages/Admin/Notifications"

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBlogs())
  },[dispatch]);

  const allBlogs = useSelector(state => state.blog.allBlogs);

  return (
   
    <>
      <Routes>
        <Route path="/" element={<HomePage2 />}></Route> 
        <Route path="/about" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/contactUs" element={<ContactUs />} />
        <Route path="/myCart" element={<Cart />} />
        <Route path="/faqs" element={<FAQ />} />

        <Route path="/showblogs" element={<ShowBlogs />} />
        <Route path="/showshop" element={<ShowShop />} />

        <Route path="/profile" element={<UserProfile />} />
        <Route path="/plan" element={<ShowPlan2 />} />
        <Route path="/plan/:_id" element={<PlanPage />} />
        <Route path="/trainers" element={<AllTrainer />} />

        <Route path="/addBlog" element={<AddBlog />} />
        
        <Route path="/overview" element={<OverviewPage  />} />
        <Route path="/adminUsers" element={<Users />} />
        <Route path="/adminProducts" element={<Products />} />
        <Route path="/adminPlan" element={<Plan />} />
        <Route path="/adminTainers" element={<Trainers />} />
        <Route path="/adminBlogs" element={<Blogs />} />
        <Route path="/adminNotifications" element={<Notifications />} />

        <Route path="/blog/:id" element={<DisplayBlog blogs={allBlogs} />} />


        <Route path="*" element={<NotFound />} /> 
      </Routes>  
    </>
  )
}

export default App
