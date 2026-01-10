function ReviewForm({
  currUser,
  addReviews,
  handleInput,
  handleSubmit,
  showAlert,
}) {
  return (
    <div className="w-full max-w-4xl bg-white p-6 rounded-2xl shadow-lg mb-8">
      <h1 className="text-2xl font-semibold mb-6">Leave a Review</h1>

      {/* Alert */}
      {showAlert && (
        <div className="mb-4 bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-sm">
          Please fill all required fields.
        </div>
      )}

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Rating */}
        <div>
          <label
            htmlFor="rating"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Rating
          </label>

          <fieldset className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <div key={star}>
                <input
                  type="radio"
                  id={`first-rate${star}`}
                  name="rating"
                  value={star.toString()}
                  checked={addReviews.rating === star.toString()}
                  onChange={handleInput}
                  className="hidden"
                />
                <label
                  htmlFor={`first-rate${star}`}
                  title={`Rate ${star}`}
                  className={`cursor-pointer text-2xl transition-colors duration-200 ${
                    Number(addReviews.rating) >= star
                      ? "text-red-500"
                      : "text-gray-300"
                  } hover:text-red-600`}
                >
                  <i className="fa-solid fa-star"></i>
                </label>
              </div>
            ))}
          </fieldset>
        </div>

        {/* Comment */}
        <div>
          <label
            htmlFor="comment"
            className="block text-lg font-medium text-gray-700 mb-2"
          >
            Comment
          </label>

          <textarea
            id="comment"
            name="comment"
            rows="2"
            placeholder="Write your experience..."
            value={addReviews.comment}
            onChange={handleInput}
            className="w-full rounded-2xl border-2 border-red-500 hover:border-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 resize-none p-3 shadow-sm"
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full sm:w-auto bg-red-500 text-white text-lg font-semibold py-2.5 px-6 rounded-2xl hover:bg-red-600 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ReviewForm;
