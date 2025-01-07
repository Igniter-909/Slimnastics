import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Slices/AuthSlice";

import {darkMode} from "../Redux/Slices/AuthSlice.js"
import { MoonIcon, SunIcon } from "lucide-react";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const role = useSelector(state => state.auth.role);
  const isDarkMode = useSelector((state) => state?.auth?.darkmode);

  
  const handleLogout = async (e) => {
    e.preventDefault();
    const res = await dispatch(logout());
    navigate("/");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleDarkMode = () => {
    dispatch(darkMode())
  }


  return (
    <nav className="shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-28 h-6 flex items-center">
                <div className="w-7 lg:w-10 h-6 bg-[#D90A14] rounded-s"></div>
                <div className="px-1 w-16 h-6 font-semibold text-sm lg:text-lg">
                  Slim<span className="text-[#D90A14]">nastics</span>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden sm:ml-6 md:flex sm:space-x-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/plan">Pricing</NavLink>
            <NavLink to="/showblogs">Blogs</NavLink>
            <NavLink to="/showshop">Shop</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contactUs">Contact</NavLink>
          </div>
          <div className="flex justify-end">
          <button
                  onClick={handleDarkMode}
                  className="ml-3 px-3 py-2 rounded-md hover:scale-125 text-sm font-medium transition-all duration-500 ease-in-out transform"
                >
                  {isDarkMode ? <SunIcon /> : <MoonIcon />}
            </button>

          <div className="hidden sm:ml-6 md:flex sm:items-center">
            {isLoggedIn ? (
              <>
                {role === "Admin" ? 
                 <Link 
                 to={"/overview"}
                 className="px-3 py-2 rounded-md text-sm font-medium text-[#D90A14] hover:bg-[#D90A14] hover:text-white"
               >
                 Dashboard
               </Link> :
                  <Link
                  to="/profile"
                  className="px-3 py-2 rounded-md text-sm font-medium text-[#D90A14] hover:bg-[#D90A14] hover:text-white"
                >
                  Profile
                </Link>  
              }
                <button
                  onClick={handleLogout}
                  className="ml-3 px-3 py-2 rounded-md text-sm font-medium bg-[#D90A14] text-white hover:bg-[#6d1d6a]"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-md text-sm font-medium text-[#D90A14] hover:bg-[#D90A14] hover:text-white"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="ml-3 px-3 py-2 rounded-md text-sm font-medium bg-[#D90A14] text-white hover:bg-[#6d1d6a]"
                >
                  SignUp
                </Link>
              </>
            )}
            
          </div>
          </div>
          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#D90A14] hover:text-white hover:bg-[#D90A14] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#D90A14]"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
            
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <MobileNavLink to="/">Home</MobileNavLink>
            <MobileNavLink to="/plan">Pricing</MobileNavLink>
            <MobileNavLink to="/showblogs">Blogs</MobileNavLink>
            <MobileNavLink to="/showshop">Shop</MobileNavLink>
            <MobileNavLink to="/about">About</MobileNavLink>
            <MobileNavLink to="/contactUs">Contact</MobileNavLink>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="px-2 space-y-1">
              {isLoggedIn ? (
                <>
                  <MobileNavLink to="/profile">Profile</MobileNavLink>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-[#D90A14] hover:text-white hover:bg-[#D90A14]"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <MobileNavLink to="/login">Login</MobileNavLink>
                  <MobileNavLink to="/signup">SignUp</MobileNavLink>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:border-[#D90A14] hover:text-[#D90A14]"
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ to, children }) {
  return (
    <Link
      to={to}
      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-[#D90A14] hover:bg-gray-50"
    >
      {children}
    </Link>
  );
}

export default Navbar;

