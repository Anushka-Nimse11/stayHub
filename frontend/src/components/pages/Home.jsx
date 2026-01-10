import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/listings", {
        withCredentials: true,
      })
      .then((res) => setListings(res.data))
      .catch((err) => console.log("error", err));
  }, []);

  const Section = ({ samples }) => {
    return (
      <div className="mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2 sm:px-6 md:px-10">
          {samples.map((sample) => (
            <div
              key={sample._id}
              className="bg-white/10 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-[#CC9F35]/40 transition hover:scale-105 hover:shadow-2xl duration-300"
            >
              <div className="relative">
                <Link to={`/listings/${sample._id}`}>
                  <img
                    src={sample.image?.url}
                    alt={sample.title}
                    className="w-full h-60 sm:h-64 md:h-56 lg:h-64 xl:h-72 object-cover rounded-xl shadow-md mx-auto"
                  />
                </Link>

                <i className="fa-solid fa-heart text-2xl text-black/70 absolute top-2 right-3 hover:text-red-500 cursor-pointer"></i>
              </div>

              <h3 className="text-md sm:text-lg font-semibold mt-3 line-clamp-2">
                {sample.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-600 line-clamp-3">
                {sample.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-2 text-gray-600 text-sm sm:text-md">
                <span className="font-medium">₹{sample.price}</span>
                <span className="text-gray-500">| {sample.location}</span>
                <span className="text-gray-500">| {sample.country}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="p-5 px-3 sm:px-6 md:px-10 lg:px-20">
      <Section samples={listings} />
    </div>
  );
}

export default Home;
