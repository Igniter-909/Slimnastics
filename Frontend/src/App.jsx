import { Route, Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"
import AboutUs from "./Pages/AboutUs"
import NotFound from "./Pages/NotFound"

function App() {

  return (
   
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route> 
        <Route path="/about" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="*" element={<NotFound />} /> 
      </Routes>  
    </>
  )
}

export default App
