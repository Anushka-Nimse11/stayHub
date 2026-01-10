// import { NavLink, useNavigate } from "react-router-dom";
// import axios from "axios";

// function Navbar({ currUser, setCurrUser }) {
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await axios.post(
//         "http://localhost:8000/user/logout",
//         {},
//         { withCredentials: true }
//       );
//       setCurrUser(null);
//       navigate("/"); // redirect to home after logout
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleCreate = () => {
//     if (!currUser) {
//       alert("Login first to create a listing!");
//       navigate("/login"); // redirect to login page
//     } else {
//       navigate("/CreateNewListing");
//     }
//   };

//   return (
//     <div className="fixed top-0 left-0 flex flex-wrap w-full h-20 shadow-xl justify-around items-center p-4 bg-white z-50">
//       {/* Logo */}
//       <div className="flex items-center m-3 space-x-2">
//         <i className="fa-solid fa-house text-3xl text-red-500"></i>
//         <h1 className="text-red-500 text-2xl font-bold">StayHub</h1>
//       </div>

//       {/* Search */}
//       <div className="flex flex-col sm:flex-row items-center flex-wrap">
//         <input
//           type="search"
//           placeholder="Search"
//           className="w-full sm:w-64 md:w-80 lg:w-[30rem] m-3 border-2 border-red-500 rounded-xl p-2 hover:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
//         />
//         <button className="bg-red-500 text-white rounded-xl shadow-lg p-2 px-4 hover:bg-red-600 transition">
//           Search
//         </button>
//       </div>

//       {/* Navigation Links */}
//       <div>
//         <ul className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-6 text-gray-700 font-medium text-lg sm:text-md">
//           <li className="hover:text-red-500 hover:underline cursor-pointer">
//             <NavLink to="/">Home</NavLink>
//           </li>

//           <li
//             className="hover:text-red-500 hover:underline cursor-pointer"
//             onClick={handleCreate}
//           >
//             StayHub your home
//           </li>

//           {!currUser ? (
//             <>
//               <li className="hover:text-red-500 hover:underline cursor-pointer">
//                 <NavLink to="/SignUp">SignUp</NavLink>
//               </li>
//               <li className="hover:text-red-500 hover:underline cursor-pointer">
//                 <NavLink to="/login">Login</NavLink>
//               </li>
//             </>
//           ) : (
//             <li
//               onClick={handleLogout}
//               className="hover:text-red-500 hover:underline cursor-pointer"
//             >
//               Logout
//             </li>
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default Navbar;

import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function Navbar({ currUser, setCurrUser }) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8000/user/logout",
        {},
        { withCredentials: true }
      );
      setCurrUser(null);
      navigate("/"); // redirect to home after logout
    } catch (err) {
      console.log(err);
    }
  };

  const handleCreate = () => {
    if (!currUser) {
      alert("Login first to create a listing!");
      navigate("/login"); // redirect to login page
    } else {
      navigate("/CreateNewListing");
    }
  };

  return (
    <nav className="sticky top-0 left-0 w-full bg-white shadow-xl z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <i className="fa-solid fa-house text-3xl text-red-500"></i>
            <h1 className="text-red-500 text-2xl font-bold">StayHub</h1>
          </div>

          {/* Search for medium and above screens */}
          <div className="hidden md:flex flex-1 justify-center items-center mx-4">
            <input
              type="search"
              placeholder="Search"
              className="w-full max-w-md border-2 border-red-500 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            />
            <button className="ml-2 bg-red-500 text-white rounded-xl shadow-lg px-4 py-2 hover:bg-red-600 transition">
              Search
            </button>
          </div>

          {/* Hamburger menu for small screens */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-red-500 focus:outline-none"
            >
              <i className="fa-solid fa-bars text-2xl"></i>
            </button>
          </div>

          {/* Navigation Links for medium and above */}
          <div className="hidden md:flex items-center space-x-6 text-gray-700 font-medium">
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-red-500 underline"
                  : "hover:text-red-500 hover:underline"
              }
            >
              Home
            </NavLink>
            <span
              onClick={handleCreate}
              className="hover:text-red-500 hover:underline cursor-pointer"
            >
              StayHub your home
            </span>
            {!currUser ? (
              <>
                <NavLink
                  to="/SignUp"
                  className={({ isActive }) =>
                    isActive
                      ? "text-red-500 underline"
                      : "hover:text-red-500 hover:underline"
                  }
                >
                  SignUp
                </NavLink>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "text-red-500 underline"
                      : "hover:text-red-500 hover:underline"
                  }
                >
                  Login
                </NavLink>
              </>
            ) : (
              <span
                onClick={handleLogout}
                className="hover:text-red-500 hover:underline cursor-pointer"
              >
                Logout
              </span>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-2 px-2 pb-4 space-y-2 bg-white border-t border-gray-200">
            <NavLink
              to="/"
              onClick={() => setMenuOpen(false)}
              className="block hover:text-red-500 hover:underline"
            >
              Home
            </NavLink>
            <span
              onClick={() => {
                handleCreate();
                setMenuOpen(false);
              }}
              className="block hover:text-red-500 hover:underline cursor-pointer"
            >
              StayHub your home
            </span>
            {!currUser ? (
              <>
                <NavLink
                  to="/SignUp"
                  onClick={() => setMenuOpen(false)}
                  className="block hover:text-red-500 hover:underline"
                >
                  SignUp
                </NavLink>
                <NavLink
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block hover:text-red-500 hover:underline"
                >
                  Login
                </NavLink>
              </>
            ) : (
              <span
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="block hover:text-red-500 hover:underline cursor-pointer"
              >
                Logout
              </span>
            )}
            {/* Search for mobile */}
            <div className="flex mt-2">
              <input
                type="search"
                placeholder="Search"
                className="w-full border-2 border-red-500 rounded-xl p-2 focus:outline-none focus:ring-2 focus:ring-red-400"
              />
              <button className="ml-2 bg-red-500 text-white rounded-xl shadow-lg px-4 py-2 hover:bg-red-600 transition">
                Search
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="flex gap-2 items-center border-t border-gray-300 overflow-x-auto whitespace-nowrap p-7 sm:justify-around sm:overflow-x-hidden">
        <span className="flex flex-col items-center gap-1 min-w-[80px] cursor-pointer text-md text-gray-600 hover:text-gray-800">
          <i className="fa-solid fa-fire text-md"></i>
          Trending
        </span>
        <span className="flex flex-col items-center gap-1 min-w-[80px] cursor-pointer text-md text-gray-600 hover:text-gray-800">
          <i className="fa-solid fa-bed text-md"></i>
          Rooms
        </span>
        <span className="flex flex-col items-center gap-1 min-w-[80px] cursor-pointer text-md text-gray-600 hover:text-gray-800">
          <i className="fa-solid fa-mountain-city text-md"></i>
          Iconic Cities
        </span>
        <span className="flex flex-col items-center gap-1 min-w-[80px] cursor-pointer text-md text-gray-600 hover:text-gray-800">
          <i className="fa-solid fa-mountain text-md"></i>
          Mountains
        </span>
        <span className="flex flex-col items-center gap-1 min-w-[80px] cursor-pointer text-md text-gray-600 hover:text-gray-800">
          <i className="fa-brands fa-fort-awesome text-md"></i>Casteles
        </span>
        <span className="flex flex-col items-center gap-1 min-w-[80px] cursor-pointer text-md text-gray-600 hover:text-gray-800">
          <i className="fa-solid fa-person-swimming text-md"></i>Amazing Pools
        </span>
        <span className="flex flex-col items-center gap-1 min-w-[80px] cursor-pointer text-md text-gray-600 hover:text-gray-800">
          <i className="fa-solid fa-campground text-md"></i>Caping
        </span>
        <span className="flex flex-col items-center gap-1 min-w-[80px] cursor-pointer text-md text-gray-600 hover:text-gray-800">
          <i className="fa-solid fa-cow text-md"></i>Farms
        </span>
        <span className="flex flex-col items-center gap-1 min-w-[80px] cursor-pointer text-md text-gray-600 hover:text-gray-800">
          <i className="fa-solid fa-snowflake text-md"></i>Arctic
        </span>
        <span className="flex flex-col items-center gap-1 min-w-[80px] cursor-pointer text-md text-gray-600 hover:text-gray-800">
          <i className="fa-solid fa-igloo text-md"></i>Doms
        </span>
        <span className="flex flex-col items-center gap-1 min-w-[80px] cursor-pointer text-md text-gray-600 hover:text-gray-800 ">
          <i className="fa-solid fa-ship text-md"></i>Boats
        </span>
      </div>
    </nav>
  );
}

export default Navbar;
