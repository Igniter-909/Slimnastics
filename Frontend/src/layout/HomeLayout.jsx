import { useSelector } from "react-redux";
import React from "react"
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function HomeLayout ({children}) {

    const isDarkMode = useSelector(state => state.auth.darkmode);

    return(
        <div className={`m-0 ${!isDarkMode ? "text-[#1D1D1D] bg-white" : "text-white bg-[#1D1d1D]" } min-h-screen`}>
            <Navbar />
            {children}
            <Footer/>
        </div>
    )
}

    export default HomeLayout;