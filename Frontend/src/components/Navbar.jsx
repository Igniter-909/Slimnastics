import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/Slices/AuthSlice";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn)
  
  const handleLogout = async (e) => {
    e.preventDefault();
    const res = await dispatch(logout());
    navigate("/");
  };


  return (
//     <nav className="bg-blue-500 text-white">
//       <div className="container mx-auto flex justify-between items-center p-4">
//         {/* Logo */}
//         <h1 className="text-xs font-bold sm:text-xl text-white">SLIMNASTICS</h1>

//         {/* Profile Button for Small Screens */}
//         <div className="flex gap-6 justify-center">
//         <div className="flex items-center lg:hidden">
//           <button
//             className="text-white focus:outline-none"
//             onClick={() => setIsOpen(!isOpen)}
//           >
//             <svg
//               className="w-6 h-6"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth="2"
//                 d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
//               />
//             </svg>
//           </button>
//         </div>

//         {/* Nav Links */}
        
//         <div
//             className={`lg:flex flex-col lg:flex-row lg:items-center w-full lg:w-auto ${
//               isOpen ? "block" : "hidden"
//             }`}
//           >
//             <Link
//               to="/"
//               className="block lg:inline-block px-4 py-2 hover:bg-blue-200 rounded"
//             >
//               Home
//             </Link>
//             <Link
//               to="/plan"
//               className="block lg:inline-block px-4 py-2 hover:bg-blue-200 rounded"
//             >
//               Plans
//             </Link>
//             <Link
//               to="/trainers"
//               className="block lg:inline-block px-4 py-2 hover:bg-blue-200 rounded"
//             >
//               Trainers
//             </Link>
//             <Link
//               to="/"
//               className="block lg:inline-block px-4 py-2 hover:bg-blue-200 rounded"
//             >
//               Workouts
//             </Link>
//             <Link
//               to="/"
//               className="block lg:inline-block px-4 py-2 hover:bg-blue-200 rounded"
//             >
//               Class
//             </Link>
//             <Link
//               to="/"
//               className="block lg:inline-block px-4 py-2 hover:bg-blue-200 rounded"
//             >
//               Shop
//             </Link>
//           </div>

//           <div className="dropdown dropdown-end">
//       <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
//         <div className="w-10 rounded-full">
//           {isLoggedIn ? 
//           <img
//             alt="Profile"
//             src={avatar} /> : <div className="p-2 m-1"> <FaUser /> </div> }
//         </div>
//       </div>
//       <ul
//         tabIndex={0}
//         className="menu menu-sm dropdown-content bg-blue-500 text-white rounded-box z-[1] mt-5 w-52 p-2 shadow">
//         {isLoggedIn ? (
//   <>
//     <li>
//       <Link className="justify-between">
//         Profile
//         <span className="badge">New</span>
//       </Link>
//     </li>
//     <li>
//       <Link 
//         to="/Dashboard" 
//         className={role === "Admin" ? "" : "hidden"}
//       >
//         Dashboard
//       </Link>
//     </li>
//     <li>
//       <Link 
//         to="/editProfile" 
//       >
//         Edit Profile
//       </Link>
//     </li>
//     <li>
//       <Link 
//         to="/plan/add" 
//         className={role === "Admin" ? "" : "hidden"}
//       >
//         Create Plan
//       </Link>
//     </li>
//     <li>
//       <button onClick={handleLogout}>
//         Logout
//       </button>
//     </li>
//   </>
// ) : (
//   // Render nothing or a Login link if not logged in
//   <>
//   <li>
//       <Link className="justify-between" to={"/login"}>
//         Login
//         <span className="badge">New</span>
//       </Link>
//     </li>
//     <li>
//     <Link className="justify-between" to={"/signup"}>
//       Signup
//       <span className="badge">New</span>
//     </Link>
//   </li>
//   </>
// )}

//       </ul>
//     </div>
//         </div>
//       </div>
//     </nav>

    <div className="w-full h-12 lg:h-16 flex px-24 gap-6 py-11 justify-between md:justify-around">
      <div className="w-30 h-12 lg:overflow-hidden">
        <div className="w-28 h-6 flex">
          <div className="w-7 lg:w-10 h-6 bg-[#D90A14] rounded-s"></div>
          <div className="px-0 lg:px-1 w-11 lg:w-16 h-6 font-semibold text-sm lg:text-lg ">Slim<span className="text-[#D90A14]">nastics</span></div>
        </div>
        <div className="w-18 lg:w-52 h-6 text-[8px] text-wrap lg:text-xs tracking-widest">Transform Your Body</div>
      </div>
      <div className="w-1/3 sm:w-2/3 h-6 lg:h-8 py-1 hidden sm:flex flex-col sm:flex-row gap-4 lg-gap-6 justify-around absolute sm:relative left-0 top-12 sm:top-0 " id="menu">
        <ul className="flex-col sm:flex rounded-2xl sm:flex-row gap-6 text-sm lg:text-base justify-around bg-base-300 sm:bg-transparent">
          <li className="justify-self-center hover:text-[#D90A14]"><Link to="/">Home</Link></li>
          <li className="justify-self-center hover:text-[#D90A14]"><Link to="/plan">Pricing</Link></li>
          <li className="justify-self-center hover:text-[#D90A14]"><Link to="/showblogs">Blogs</Link></li>
          <li className="justify-self-center hover:text-[#D90A14]"><Link to="/showshop">Shop</Link></li>
          <li className="justify-self-center hover:text-[#D90A14]"><Link to="/about">About</Link></li>
          <li className="justify-self-center hover:text-[#D90A14]"><Link to="/contactUs">Contact</Link></li>
        </ul>
      </div>
      {isLoggedIn ? 
      <>
      <div className="w-30 lg:w-40 h-12 lg:h-14 flex py-1 lg:py-0 gap-6 mx-2 lg:mx-6">
        <button className="w-fit p-2 lg:w-14 h-5 lg:h-8 border-x-2 border-[#D90A14] rounded-lg flex items-center justify-center text-[#D90A14] text-sm lg:text-base font-extralight hover:bg-[#D90A14] hover:text-white">
          <Link to="/profile" >
          Profile
          </Link>
        </button>
        <button className="w-fit p-2 lg:w-14 h-5 lg:h-8 bg-[#D90A14] text-sm lg:text-base text-white rounded-lg flex items-center justify-center font-extralight hover:bg-[#6d1d6a]" onClick={handleLogout}>
          Logout
        </button>
      </div>
      </> : <>
      <div className="w-30 lg:w-40 h-12 lg:h-14 flex py-1 lg:py-0 gap-6 mx-2 lg:mx-6">
        <button className="w-fit p-2 lg:w-14 h-5 lg:h-8 border-x-2 border-[#D90A14] rounded-lg flex items-center justify-center text-[#D90A14] text-sm lg:text-base font-extralight hover:bg-[#D90A14] hover:text-white">
          <Link to="/login">Login</Link>
        </button>
        <button className="w-fit p-2 lg:w-14 h-5 lg:h-8 bg-[#D90A14] text-sm lg:text-base text-white rounded-lg flex items-center justify-center font-extralight hover:bg-[#6d1d6a] ">
          <Link to="/signup">SignUp</Link>
        </button>
      </div>
      </>  
    }
      <div className="block sm:hidden">
        <button className="text-[#D90A14] text-2xl focus:outline-none focus:scale-125" onClick={
          () => {
            document.getElementById("menu").classList.toggle("hidden");
          }
        }> 
          ☰
        </button>
      </div>
    </div>
  );
}

export default Navbar;
