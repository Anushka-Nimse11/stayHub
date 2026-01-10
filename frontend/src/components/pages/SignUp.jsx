import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const navigate = useNavigate();

  const [showAlert, setShowAlert] = useState(false);

  const [addUser, setAddUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleInput = (event) => {
    let { name, value } = event.target;
    setAddUser((currData) => ({ ...currData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, email, password } = addUser;

    if (!username || !email || !password) {
      setShowAlert(true);
      return;
    }

    axios
      .post("http://localhost:8000/user/signup", addUser, {
        withCredentials: true,
      })
      .then(() => {
        alert("Sign Up Successfully");
        navigate("/login");
      })
      .catch((err) => {
        if (err.response?.status === 409) {
          alert("User already exists. Please login.");
        } else if (err.response?.status === 400) {
          alert("Invalid input");
        } else {
          alert("Something went wrong");
        }
      });

    setAddUser({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="min-h-[70vh] p-2 px-4 flex items-center justify-center">
      <div className="w-full max-w-md sm:max-w-lg bg-white/10 backdrop-blur-md p-3 sm:p-8 rounded-2xl shadow-lg border border-[#CC9F35]/40">
        {/* Heading */}
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">
          Sign Up
        </h2>

        {showAlert && (
          <div className="mb-4 bg-white border border-red-400 text-red-600 px-4 py-2 rounded text-sm">
            Please fill all required fields.
          </div>
        )}

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* userName */}
          <label
            htmlFor="username"
            className="block text-sm font-semibold mb-1"
          >
            username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="username"
            onChange={handleInput}
            className="w-full border-2 border-red-500 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          {/* Email */}
          <label htmlFor="email" className="block text-sm font-semibold mb-1">
            email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="email"
            onChange={handleInput}
            className="w-full border-2 border-red-500 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
          ></input>

          {/* Password */}
          <label
            htmlFor="password"
            className="block text-sm font-semibold mb-1"
          >
            password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            onChange={handleInput}
            className="w-full border-2 border-red-500 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="submit"
              className="w-full sm:w-1/2 bg-red-600 text-white py-2 rounded-xl hover:bg-red-500 transition"
            >
              SignUp
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full sm:w-1/2 bg-black text-white py-2 rounded-xl hover:bg-black/80 transition"
            >
              Cancel
            </button>
          </div>
          <div className="mt-6 text-center text-sm">
            <p className="text-gray-700">
              Already have an account?
              <span
                onClick={() => navigate("/login")}
                className="text-red-600 font-semibold cursor-pointer ml-2 hover:underline"
              >
                Login
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
