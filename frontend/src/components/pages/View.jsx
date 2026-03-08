// import { useEffect, useState } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// // import "../../assets/rating.css";

// // Always send login cookies with every Axios request
// import axios from "axios";
// axios.defaults.withCredentials = true;

// function View({ currUser }) {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [listing, setListing] = useState({});

//   const [addReviews, setAddReviews] = useState({
//     rating: "1",
//     comment: "",
//   });

//   const [showAlert, setShowAlert] = useState(false);

//   useEffect(() => {
//     axios;
//     axios
//       .get(`http://localhost:8000/listings/${id}`, {
//         withCredentials: true,
//       })
//       .then((res) => setListing(res.data))
//       .catch((err) => console.log("error", err));
//   }, [id]);

//   // delete listing
//   const handleDelete = async () => {
//     if (!currUser) {
//       alert("Please login first");
//       navigate("/login");
//       return;
//     }

//     if (!window.confirm("Are you sure you want to delete this listing?"))
//       return;

//     try {
//       await axios.delete(`http://localhost:8000/listings/delete/${id}`);
//       alert("Listing deleted successfully");
//       navigate("/");
//     } catch (err) {
//       if (err.response?.status === 403) {
//         alert("You do not have permission to delete this listing.");
//       } else if (err.response?.status === 401) {
//         alert("Please login first");
//         navigate("/login");
//       } else {
//         alert("Something went wrong");
//       }
//     }
//   };

//   // Delete Review
//   const handleDeleteReview = async (reviewId) => {
//     // Prevent unauthenticated users
//     if (!currUser) {
//       alert("Please login first to delete a review");
//       navigate("/login");
//       return;
//     }

//     // Confirm deletion
//     if (!window.confirm("Are you sure you want to delete this review?")) return;

//     try {
//       await axios.delete(
//         `http://localhost:8000/listings/${id}/reviews/${reviewId}`,
//         { withCredentials: true }
//       );

//       // Remove deleted review from state
//       setListing((prev) => ({
//         ...prev,
//         reviews: prev.reviews.filter((r) => r._id !== reviewId),
//       }));
//     } catch (err) {
//       if (err.response?.status === 401) {
//         alert("Please login first");
//         navigate("/login");
//       } else {
//         alert("Something went wrong");
//       }
//     }
//   };

//   const handleInput = (event) => {
//     let { name, value } = event.target;
//     setAddReviews((currData) => ({ ...currData, [name]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     //Validation
//     const { rating, comment } = addReviews;

//     if (!rating || !comment) {
//       setShowAlert(true);
//       return;
//     }

//     // /add comments (post request)
//     try {
//       await axios.post(
//         `http://localhost:8000/listings/${id}/reviews`,
//         {
//           ...addReviews,
//           rating: Number(addReviews.rating),
//         },
//         { withCredentials: true }
//       );
//       alert("Review added");

//       const res = await axios.get(`http://localhost:8000/listings/${id}`, {
//         withCredentials: true,
//       });
//       setListing(res.data);

//       setAddReviews({
//         rating: "1",
//         comment: "",
//       });
//     } catch (err) {
//       if (err.response?.status === 401) {
//         alert("Please login first");
//         navigate("/login");
//       } else {
//         alert("Failed to add review");
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen pt-28 px-4 sm:px-6 md:px-10 flex flex-col items-center">
//       {/* Card */}
//       <div className="w-full max-w-4xl p-5">
//         {/* Title */}
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
//           <h2 className="text-2xl sm:text-3xl font-bold">{listing?.title}</h2>
//           <div className="flex items-center gap-2 cursor-pointer">
//             <i className="fa-regular fa-heart text-lg sm:text-base"></i>
//             <p className="underline text-base">Save</p>
//           </div>
//         </div>

//         {/* Image */}
//         <div className="relative mb-6">
//           <img
//             src={listing?.image?.url}
//             alt={listing?.title}
//             className="w-full h-auto max-h-[25rem] object-cover rounded-xl shadow-md transition duration-300 hover:scale-105"
//           />
//         </div>

//         {/* Owner */}
//         <p className="text-gray-600 mb-4">
//           Owned by {listing?.owner?.username}
//         </p>

//         {/* Description */}
//         <p className="text-gray-600 mb-4">{listing?.description}</p>

//         {/* Price & Location */}
//         <div className="flex flex-wrap gap-3 text-lg text-gray-600">
//           <span className="font-semibold text-gray-600">₹{listing?.price}</span>
//           <span>/{listing?.location}</span>
//           <span>/{listing?.country}</span>
//         </div>
//       </div>
//       {currUser && listing?.owner && currUser._id === listing.owner._id && (
//         <div className="flex flex-wrap sm:flex-nowrap justify-start w-full max-w-4xl gap-3 mb-6">
//           {currUser ? (
//             <Link to={`/listings/${listing._id}/edit`}>
//               <button className="w-full sm:w-[6rem] h-10 sm:h-12 rounded-lg bg-red-500 text-white text-lg">
//                 Edit
//               </button>
//             </Link>
//           ) : (
//             <button
//               onClick={() => navigate("/login")}
//               className="w-full sm:w-[6rem] h-10 sm:h-12 rounded-lg bg-black text-white text-lg"
//             >
//               Edit
//             </button>
//           )}

//           <button
//             onClick={handleDelete}
//             className="w-[5rem] h-[2.5rem] rounded-lg bg-black text-white text-lg"
//           >
//             Delete
//           </button>
//         </div>
//       )}

//       {currUser && (
//         <div className="w-full max-w-4xl bg-white p-6 rounded-2xl shadow-lg mb-8">
//           <h1 className="text-2xl font-semibold mb-6">Leave a Review</h1>

//           {/* Alert */}
//           {showAlert && (
//             <div className="mb-4 bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-sm">
//               Please fill all required fields.
//             </div>
//           )}

//           <form className="space-y-6" onSubmit={handleSubmit}>
//             {/* Rating */}

//             <div>
//               <label
//                 htmlFor="rating"
//                 className="block text-lg font-medium text-gray-700 mb-2"
//               >
//                 Rating
//               </label>

//               <fieldset className="flex gap-1">
//                 {[1, 2, 3, 4, 5].map((star) => (
//                   <div key={star}>
//                     <input
//                       type="radio"
//                       id={`first-rate${star}`}
//                       name="rating"
//                       value={star.toString()}
//                       checked={addReviews.rating === star.toString()}
//                       onChange={handleInput}
//                       className="hidden"
//                     />
//                     <label
//                       htmlFor={`first-rate${star}`}
//                       title={`Rate ${star}`}
//                       className={`
//           cursor-pointer text-2xl transition-colors duration-200
//           ${
//             Number(addReviews.rating) >= star ? "text-red-500" : "text-gray-300"
//           }
//           hover:text-red-600
//         `}
//                     >
//                       <i className="fa-solid fa-star"></i>
//                     </label>
//                   </div>
//                 ))}
//               </fieldset>
//             </div>

//             {/* Comment */}
//             <div>
//               <label
//                 htmlFor="comment"
//                 className="block text-lg font-medium text-gray-700 mb-2"
//               >
//                 Comment
//               </label>

//               <textarea
//                 id="comment"
//                 name="comment"
//                 rows="2"
//                 placeholder="Write your experience..."
//                 value={addReviews.comment}
//                 onChange={handleInput}
//                 className="w-full rounded-2xl border border-red-500 hover:border-red-600 p-3 focus:outline-none focus:ring-2 focus:ring-red-400 resize-none shadow-sm"
//               ></textarea>
//             </div>

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full sm:w-auto bg-red-500 text-white text-lg font-semibold py-2.5 px-6 rounded-2xl hover:bg-red-600 transition duration-300"
//             >
//               Submit
//             </button>
//           </form>
//         </div>
//       )}

//       {/* View Reviews */}
//       <div className="w-full max-w-4xl space-y-6 mb-12">
//         <h2 className="text-2xl font-semibold mb-4 ml-2">Reviews</h2>
//         <div className="grid grid-cols-2 gap-6">
//           {listing?.reviews?.length === 0 ? (
//             <p className="text-gray-500">No reviews yet.</p>
//           ) : (
//             listing?.reviews?.map((review) => (
//               <div
//                 key={review._id}
//                 className="bg-white p-4 rounded-2xl shadow-md gap-2"
//               >
//                 <p className="text-lg font-semibold">
//                   @{review.author.username}
//                 </p>

//                 <div className="mt-2 flex items-center justify-between">
//                   {/* Rating Stars */}
//                   <div className="flex gap-1">
//                     {[1, 2, 3, 4, 5].map((i) => (
//                       <i
//                         key={i}
//                         className={`fa-solid fa-star text-sm ${
//                           i <= review.rating ? "text-red-500" : "text-gray-300"
//                         }`}
//                       ></i>
//                     ))}
//                   </div>

//                   {/* Date */}
//                   <span className="text-gray-400 text-sm">
//                     {new Date(review.createdAt).toLocaleDateString()}
//                   </span>
//                 </div>

//                 <p className="text-md">{review.comment}</p>
//                 <div className="flex justify-end mt-2">
//                   {currUser &&
//                     review.author &&
//                     currUser._id === review.author._id && (
//                       <button
//                         onClick={() => handleDeleteReview(review._id)}
//                         className="text-white bg-gray-800 hover:bg-gray-700 rounded-lg p-1 text-sm transition"
//                       >
//                         Delete
//                       </button>
//                     )}
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
// export default View;

import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";

import ReviewForm from "./ReviewForm.jsx";
import ReviewList from "./ReviewList.jsx";

axios.defaults.withCredentials = true;

function View({ currUser }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState({});
  const [addReviews, setAddReviews] = useState({ rating: "1", comment: "" });
  const [showAlert, setShowAlert] = useState(false);

  // Fetch listing
  const fetchListing = async () => {
    try {
      const res = await axios.get(
        `https://stayhubbackend-o4g2.onrender.com/listings/${id}`,
        {
          withCredentials: true,
        },
      );
      setListing(res.data);
    } catch (err) {
      console.log("Error fetching listing:", err);
    }
  };

  useEffect(() => {
    fetchListing();
  }, [id]);

  // Delete listing
  const handleDelete = async () => {
    if (!currUser) {
      alert("Please login first");
      navigate("/login");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this listing?"))
      return;

    try {
      await axios.delete(
        `https://stayhubbackend-o4g2.onrender.com/listings/delete/${id}`,
      );
      alert("Listing deleted successfully");
      navigate("/");
    } catch (err) {
      if (err.response?.status === 403) {
        alert("You do not have permission to delete this listing.");
      } else if (err.response?.status === 401) {
        alert("Please login first");
        navigate("/login");
      } else {
        alert("Something went wrong");
      }
    }
  };

  // Handle input change in review form
  const handleInput = (e) => {
    const { name, value } = e.target;
    setAddReviews((prev) => ({ ...prev, [name]: value }));
  };

  // Submit review
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { rating, comment } = addReviews;
    if (!rating || !comment) {
      setShowAlert(true);
      return;
    }

    try {
      await axios.post(
        `https://stayhubbackend-o4g2.onrender.com/listings/${id}/reviews`,
        { ...addReviews, rating: Number(rating) },
        { withCredentials: true },
      );
      alert("Review added");
      fetchListing();
      setAddReviews({ rating: "1", comment: "" });
      setShowAlert(false);
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Please login first");
        navigate("/login");
      } else {
        alert("Failed to add review");
      }
    }
  };

  return (
    <div className="min-h-screen p-5 px-4 sm:px-6 md:px-10 flex flex-col items-center">
      {/* Listing Details */}
      <div className="w-full max-w-4xl p-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
          <h2 className="text-2xl sm:text-3xl font-bold">{listing?.title}</h2>
          <div className="flex items-center gap-2 cursor-pointer">
            <i className="fa-regular fa-heart text-lg sm:text-base"></i>
            <p className="underline text-base">Save</p>
          </div>
        </div>

        <div className="relative mb-6">
          <img
            src={listing?.image?.url}
            alt={listing?.title}
            className="w-full h-auto max-h-[25rem] object-cover rounded-xl shadow-md transition duration-300 hover:scale-105"
          />
        </div>

        <p className="text-gray-600 mb-4">
          Owned by {listing?.owner?.username}
        </p>
        <p className="text-gray-600 mb-4">{listing?.description}</p>
        <div className="flex flex-wrap gap-3 text-lg text-gray-600">
          <span className="font-semibold text-gray-600">₹{listing?.price}</span>
          <span>/{listing?.location}</span>
          <span>/{listing?.country}</span>
        </div>
      </div>

      {/* Edit/Delete Buttons */}
      {currUser && listing?.owner && currUser._id === listing.owner._id && (
        <div className="flex flex-wrap sm:flex-nowrap justify-start w-full max-w-4xl gap-3 mb-6">
          <Link to={`/listings/${listing._id}/edit`}>
            <button className="w-full sm:w-[6rem] h-10 sm:h-12 rounded-lg bg-red-500 text-white text-lg">
              Edit
            </button>
          </Link>

          <button
            onClick={handleDelete}
            className="w-full sm:w-[6rem] rounded-lg bg-black text-white text-lg"
          >
            Delete
          </button>
        </div>
      )}

      {/* Review Form */}
      {currUser && (
        <ReviewForm
          currUser={currUser}
          addReviews={addReviews}
          handleInput={handleInput}
          handleSubmit={handleSubmit}
          showAlert={showAlert}
        />
      )}

      {/* Review List */}
      <ReviewList
        reviews={listing.reviews}
        currUser={currUser}
        setListing={setListing}
        listingId={listing._id}
      />
    </div>
  );
}

export default View;
