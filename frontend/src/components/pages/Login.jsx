import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login({ setCurrUser }) {
  const navigate = useNavigate();

  const [showAlert, setShowAlert] = useState(false);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = form;
    if (!username || !password) {
      setShowAlert(true);
      return;
    }

    try {
      const res = await axios.post(
        "https://stayhubbackend-o4g2.onrender.com/user/login",
        form,
        {
          withCredentials: true,
        },
      );

      // IMPORTANT: update user state
      setCurrUser(res.data.user);

      alert("Login successful");
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Invalid username or password");
    }
  };

  return (
    <div className="min-h-[70vh] p-3 px-4 flex items-center justify-center">
      <div className="w-full max-w-md sm:max-w-lg bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-lg border border-[#CC9F35]/40">
        {/* Heading */}
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center">
          Login
        </h2>

        {showAlert && (
          <div className="mb-4 bg-white border border-red-400 text-red-600 px-4 py-2 rounded text-sm">
            Please fill all required fields.
          </div>
        )}

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Username */}
          <label
            htmlFor="username"
            className="block text-sm font-semibold mb-1"
          >
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={form.username}
            placeholder="Username"
            onChange={handleChange}
            className="w-full border-2 border-red-500 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          {/* Password */}
          <label
            htmlFor="password"
            className="block text-sm font-semibold mb-1"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={form.password}
            placeholder="Password"
            onChange={handleChange}
            className="w-full border-2 border-red-500 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              type="submit"
              className="w-full sm:w-1/2 bg-red-600 text-white py-2 rounded-xl hover:bg-red-500 transition"
            >
              Login
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
              Don’t have an account?
              <span
                onClick={() => navigate("/signup")}
                className="text-red-600 font-semibold cursor-pointer ml-2 hover:underline"
              >
                Sign Up
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
