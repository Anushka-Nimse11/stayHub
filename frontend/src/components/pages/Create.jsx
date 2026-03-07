import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Create() {
  const navigate = useNavigate();

  const [showAlert, setShowAlert] = useState(false);

  const [addListing, setAddListing] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    country: "",
    image: null,
  });

  const handleInput = (e) => {
    setShowAlert(false);
    const { name, value } = e.target;

    if (name === "image") {
      setAddListing({ ...addListing, image: e.target.files[0] });
    } else if (name === "price") {
      if (Number(value) < 0) return;

      setAddListing({ ...addListing, [name]: value });
    } else {
      setAddListing({ ...addListing, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { title, description, price, location, country, image } = addListing;

    if (!image || !title || !description || !price || !location || !country) {
      setShowAlert(true);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("location", location);
    formData.append("country", country);
    formData.append("image", image);

    axios
      .post("https://stayhubproject.onrender.com/listings", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(() => {
        alert("Listing added successfully");
        navigate("/");
      })
      .catch((err) => {
        if (err.response && err.response.status === 401) {
          alert("Please login to create a listing");
          navigate("/login");
        } else {
          alert("Something went wrong");
        }
      });
  };

  return (
    <div className="min-h-screen p-5 px-4 sm:px-6 md:px-10 lg:px-20 flex justify-center">
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-md p-6 sm:p-8 md:p-10 rounded-2xl shadow-lg border border-[#CC9F35]/40">
        {/* Heading */}
        <h2 className="text-xl sm:text-2xl font-bold mb-6 text-center md:text-left">
          Create Listing
        </h2>

        {showAlert && (
          <div className="mb-4 bg-white border border-red-400 text-red-600 px-4 py-3 rounded shadow text-center">
            Please fill all required fields.
          </div>
        )}

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Image URL */}
          <label
            htmlFor="image"
            className="block mb-1 p-3 text-lg font-semibold"
          >
            Image
          </label>
          <input
            type="file"
            name="image"
            id="image"
            // value={listing.image?.url}
            placeholder="Image URL"
            onChange={handleInput}
            className="w-full border-2 border-red-500 rounded-xl p-2 hover:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          {/* Title */}
          <label htmlFor="title" className="block text-lg font-semibold mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            // value={listing.title}
            placeholder="Title"
            onChange={handleInput}
            className="w-full border-2 border-red-500 rounded-xl p-2 hover:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          {/* Description */}
          <label
            htmlFor="description"
            className="block text-lg font-semibold mb-1"
          >
            Description
          </label>
          <textarea
            rows="3"
            name="description"
            id="description"
            // value={listing.description}
            placeholder="Description"
            onChange={handleInput}
            className="w-full border-2 border-red-500 rounded-xl p-2 hover:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          ></textarea>

          {/* Price */}
          <label htmlFor="price" className="block text-lg font-semibold mb-1">
            Price
          </label>
          <input
            type="number"
            name="price"
            id="price"
            min="800"
            // value={listing.price}
            placeholder="Price"
            onChange={handleInput}
            className="w-full border-2 border-red-500 rounded-xl p-2 hover:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          {/* Location */}
          <label
            htmlFor="location"
            className="block text-lg font-semibold mb-1"
          >
            Location
          </label>
          <input
            type="text"
            name="location"
            id="location"
            // value={listing.location}
            placeholder="Location"
            onChange={handleInput}
            className="w-full border-2 border-red-500 rounded-xl p-2 hover:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          <label htmlFor="country" className="block text-lg font-semibold mb-1">
            Country
          </label>
          <input
            type="text"
            name="country"
            id="country"
            // value={listing.country}
            placeholder="Country"
            onChange={handleInput}
            className="w-full border-2 border-red-500 rounded-xl p-2 hover:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
            <button
              type="submit"
              className="bg-red-600 text-white text-lg p-3 rounded-xl hover:bg-red-500 transition w-full sm:w-auto"
            >
              Create
            </button>

            <button
              type="button"
              onClick={() => navigate(-1)}
              className="bg-black text-white text-lg p-3 rounded-xl hover:bg-black/80 transition w-full sm:w-auto"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Create;
