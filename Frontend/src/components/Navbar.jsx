import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";

function Navbar() {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="bg-blue-500 text-white">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <h1 className="text-xs font-bold sm:text-xl text-white">
        SLIMNASTICS
        </h1>

        {/* Hamburger Menu Button */}
        <button
          className="lg:hidden text-white focus:outline-none"
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
            to="/"
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
          <button>
            {isOpen ? "Login": <FaUser className="text-white" />}
          </button>
        </div>
      </div>
    </nav>                           
    )
}
export default Navbar;