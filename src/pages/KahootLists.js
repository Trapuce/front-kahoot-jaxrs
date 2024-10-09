import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; 
const colors = ["bg-purple-500", "bg-blue-500", "bg-pink-500", "bg-green-500", "bg-yellow-500", "bg-red-500"];

export default function KahootLists() {
  const [kahoots, setKahoots] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8080/kahoots")
      .then((response) => response.json())
      .then((data) => {
        setKahoots(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching kahoots:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">My Kahoots</h1>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {kahoots.length === 0 ? (
            <p className="text-center col-span-3">No Kahoots available</p>
          ) : (
            kahoots.map((kahoot, index) => (
              <Link to={`/kahoots/${kahoot.id}`} key={kahoot.id}>
                <div
                  className={`${colors[index % colors.length]} text-white shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer rounded-lg`}
                >
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-2 truncate">{kahoot.title}</h2>
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{kahoot.questions} questions</span>
                      <span className="text-sm">{kahoot.plays} plays</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
