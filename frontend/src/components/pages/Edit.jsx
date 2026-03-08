import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// function Edit() {
function Edit({ currUser, authLoading }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [originalImageUrl, setOriginalImageUrl] = useState("");

  const [listing, setListing] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    country: "",
    image: null,
  });

  useEffect(() => {
    if (authLoading) return;

    // Redirect if not logged in
    if (!currUser) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    axios
      .get(`https://stayhubbackend-o4g2.onrender.com/listings/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        const listingData = res.data;

        // Check ownership
        if (listingData.owner?._id !== currUser._id) {
          alert("You do not have access to edit this listing");
          navigate(-1);
          return;
        }

        setListing(listingData);

        // set original image URL
        if (listingData.image?.url) {
          setOriginalImageUrl(
            listingData.image.url.replace("/upload", "/upload/w_250"),
          );
        }
      })
      .catch((err) => console.log(err));
  }, [id, currUser, authLoading, navigate]);

  // Handle change
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setListing({ ...listing, image: files[0] });
    } else if (name === "price") {
      if (Number(value) < 0) return;
      setListing({ ...listing, [name]: value });
    } else {
      setListing({ ...listing, [name]: value });
    }
  };

  // Handle submit
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", listing.title);
    formData.append("description", listing.description);
    formData.append("price", listing.price);
    formData.append("location", listing.location);
    formData.append("country", listing.country);

    // only send image if user selected a new one
    if (listing.image instanceof File) {
      formData.append("image", listing.image);
    }

    axios
      .put(
        `https://stayhubbackend-o4g2.onrender.com/listings/${id}`,
        formData,
        {
          withCredentials: true,
        },
      )
      .then(() => {
        alert("Listing Updated successfully");
        navigate(`/listings/${id}`, { replace: true });
      })
      .catch((err) => {
        if (err.response?.status === 403) {
          alert(err.response.data.message); // "You do not have access"
          navigate(-1); // go back
        } else if (err.response?.status === 401) {
          alert("Please login to edit a listing");
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
          Edit Listing
        </h2>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>
          <label htmlFor="image" className="p-3 text-lg font-semibold">
            Original Image
          </label>
          {originalImageUrl && (
            <div className="flex justify-center md:justify-start">
              <img
                src={originalImageUrl}
                alt="Original Listing"
                className="w-40 sm:w-48 h-auto rounded-xl m-3 border"
              />
            </div>
          )}

          {/* Image URL */}
          <label htmlFor="image" className="block text-lg font-semibold mb-1">
            Image
          </label>
          <input
            type="file"
            name="image"
            id="image"
            // value={listing.image?.url}
            placeholder="Image URL"
            onChange={handleChange}
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
            value={listing.title}
            placeholder="Title"
            onChange={handleChange}
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
            rows="4"
            name="description"
            id="description"
            value={listing.description}
            placeholder="Description"
            onChange={handleChange}
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
            value={listing.price}
            placeholder="Price"
            onChange={handleChange}
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
            value={listing.location}
            placeholder="Location"
            onChange={handleChange}
            className="w-full border-2 border-red-500 rounded-xl p-2 hover:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          <label htmlFor="country" className="block text-lg font-semibold mb-1">
            Country
          </label>
          <input
            type="text"
            name="country"
            id="country"
            value={listing.country}
            placeholder="Country"
            onChange={handleChange}
            className="w-full border-2 border-red-500 rounded-xl p-2 hover:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          />

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
            <button
              type="submit"
              className="bg-red-600 text-white text-lg p-3 rounded-xl hover:bg-red-500 transition w-full sm:w-auto"
            >
              Update
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

export default Edit;
