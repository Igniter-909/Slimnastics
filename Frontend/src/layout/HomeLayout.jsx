import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function HomeLayout ({children}) {
    return(
        <div className="sm:m-2 m-0">
            <Navbar />
            {children}
            <Footer/>
        </div>
    )
}

    export default HomeLayout;