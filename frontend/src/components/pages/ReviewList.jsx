import axios from "axios";
import { useNavigate } from "react-router-dom";

function ReviewList({ reviews = [], currUser, setListing, listingId }) {
  const navigate = useNavigate();

  const handleDeleteReview = async (reviewId) => {
    if (!currUser) {
      alert("Please login first to delete a review");
      navigate("/login");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      await axios.delete(
        `https://stayhubbackend-o4g2.onrender.com/listings/${listingId}/reviews/${reviewId}`,
        { withCredentials: true },
      );

      setListing((prev) => ({
        ...prev,
        reviews: prev.reviews.filter((r) => r._id !== reviewId),
      }));
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Please login first");
        navigate("/login");
      } else {
        alert("Something went wrong");
      }
    }
  };

  return (
    <div className="w-full max-w-4xl space-y-6 mb-12">
      <h2 className="text-2xl font-semibold mb-4 ml-2">Reviews</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {reviews.length === 0 ? (
          <div className="col-span-2 text-gray-500 text-center">
            No reviews yet.
          </div>
        ) : (
          reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white p-4 rounded-2xl shadow-md"
            >
              <p className="text-lg font-semibold">
                @{review.author?.username}
              </p>

              <div className="mt-2 flex items-center justify-between">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <i
                      key={i}
                      className={`fa-solid fa-star text-sm ${
                        i <= review.rating ? "text-red-500" : "text-gray-300"
                      }`}
                    ></i>
                  ))}
                </div>
                <span className="text-gray-400 text-sm">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>

              <p className="text-md mt-1">{review.comment}</p>

              {currUser?._id === review.author?._id && (
                <div className="flex justify-end mt-2">
                  <button
                    onClick={() => handleDeleteReview(review._id)}
                    className="text-white bg-gray-800 hover:bg-gray-700 rounded-lg p-1 text-sm transition"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ReviewList;
