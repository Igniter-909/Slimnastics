import { Route, Routes } from "react-router-dom"
import HomePage from "./Pages/HomePage"
import Login from "./Pages/Login"

function App() {

  return (
   
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route> 
        <Route path="/login" element={<Login />} />
      </Routes>  
    </>
  )
}

export default App
