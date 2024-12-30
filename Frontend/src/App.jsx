import { Route, Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"

function App() {

  return (
   
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route> 
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>  
    </>
  )
}

export default App
