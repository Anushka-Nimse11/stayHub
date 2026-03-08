// import Navbar from "./components/Navbar";
// import { Routes, Route } from "react-router-dom";
// import Home from "./components/pages/Home";
// import View from "./components/pages/View";
// import Edit from "./components/pages/Edit";
// import Create from "./components/pages/Create";
// import Footer from "./components/Footer";
// import SignUp from "./components/pages/signup";
// import Login from "./components/pages/Login";

// function App() {
//   return (
//     <>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/listings/:id" element={<View />} />
//         <Route path="/listings/:id/edit" element={<Edit />} />
//         <Route path="/CreateNewListing" element={<Create />} />
//         <Route path="/SignUp" element={<SignUp />} />
//         <Route path="/login" element={<Login />} />
//       </Routes>
//       <Footer />
//     </>
//   );
// }

// export default App;
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import View from "./components/pages/View";
import Edit from "./components/pages/Edit";
import Create from "./components/pages/Create";
import Footer from "./components/Footer";
import SignUp from "./components/pages/SignUp";
import Login from "./components/pages/Login";
import axios from "axios";

function App() {
  const [currUser, setCurrUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    axios
      .get("https://stayhubbackend-o4g2.onrender.com/user/current", {
        withCredentials: true,
      }) // ✅ important
      .then((res) => {
        console.log("Logged in user:", res.data.user);
        setCurrUser(res.data.user);
      })
      .catch((err) => {
        console.log("Not logged in:", err.response?.status);
        setCurrUser(null);
      })
      .finally(() => {
        setAuthLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar currUser={currUser} setCurrUser={setCurrUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/listings/:id"
          element={<View currUser={currUser} authLoading={authLoading} />}
        />
        <Route
          path="/listings/:id/edit"
          element={<Edit currUser={currUser} authLoading={authLoading} />}
        />
        <Route
          path="/CreateNewListing"
          element={<Create currUser={currUser} authLoading={authLoading} />}
        />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/login" element={<Login setCurrUser={setCurrUser} />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
