import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function HomeLayout ({children}) {
    return(
        <div className="m-0 bg-[#1D1D1D] text-white min-h-screen">
            <Navbar />
            {children}
            <Footer/>
        </div>
    )
}

    export default HomeLayout;