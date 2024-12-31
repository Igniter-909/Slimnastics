import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Slices/AuthSlice";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn)
  const role = useSelector((state) => state?.auth?.role) || "";
  const avatar = useSelector((state) => state.auth.data.data.avatar) || ""
  
  const handleLogout = async (e) => {
    e.preventDefault();
    const res = await dispatch(logout());
    if (res?.payload?.success){
      navigate("/")
    }
  };

  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-500 text-white">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <h1 className="text-xs font-bold sm:text-xl text-white">SLIMNASTICS</h1>

        {/* Profile Button for Small Screens */}
        <div className="flex gap-6 justify-center">
        <div className="flex items-center lg:hidden">
          <button
            className="text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Nav Links */}
        
        <div
            className={`lg:flex flex-col lg:flex-row lg:items-center w-full lg:w-auto ${
              isOpen ? "block" : "hidden"
            }`}
          >
            <Link
              to="/"
              className="block lg:inline-block px-4 py-2 hover:bg-blue-200 rounded"
            >
              Home
            </Link>
            <Link
              to="/plan"
              className="block lg:inline-block px-4 py-2 hover:bg-blue-200 rounded"
            >
              Plans
            </Link>
            <Link
              to="/"
              className="block lg:inline-block px-4 py-2 hover:bg-blue-200 rounded"
            >
              Trainers
            </Link>
            <Link
              to="/"
              className="block lg:inline-block px-4 py-2 hover:bg-blue-200 rounded"
            >
              Workouts
            </Link>
            <Link
              to="/"
              className="block lg:inline-block px-4 py-2 hover:bg-blue-200 rounded"
            >
              Class
            </Link>
            <Link
              to="/"
              className="block lg:inline-block px-4 py-2 hover:bg-blue-200 rounded"
            >
              Shop
            </Link>
          </div>

          <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          {isLoggedIn ? 
          <img
            alt="Profile"
            src={avatar} /> : <div className="p-2 m-1"> <FaUser /> </div> }
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-blue-500 text-white rounded-box z-[1] mt-5 w-52 p-2 shadow">
        {isLoggedIn ? (
  <>
    <li>
      <Link className="justify-between">
        Profile
        <span className="badge">New</span>
      </Link>
    </li>
    <li>
      <Link 
        to="/Dashboard" 
        className={role === "Admin" ? "" : "hidden"}
      >
        Dashboard
      </Link>
    </li>
    <li>
      <button onClick={handleLogout}>
        Logout
      </button>
    </li>
  </>
) : (
  // Render nothing or a Login link if not logged in
  <>
  <li>
      <Link className="justify-between" to={"/login"}>
        Login
        <span className="badge">New</span>
      </Link>
    </li>
    <li>
    <Link className="justify-between" to={"/signup"}>
      Signup
      <span className="badge">New</span>
    </Link>
  </li>
  </>
)}

      </ul>
    </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
