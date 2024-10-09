import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function KahootDetail() {
  const { id } = useParams(); 
  const [kahoot, setKahoot] = useState(null); 
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8080/kahoots/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setKahoot(data);
      })
      .catch((error) => console.error("Error fetching kahoot:", error));
  }, [id]);

  if (!kahoot) {
    return <p className="text-center">Loading...</p>; 
  }

  const handleDelete = () => {
    fetch(`http://localhost:8080/api/kahoots/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        alert("Kahoot deleted!");
        navigate("/"); 
      })
      .catch((error) => console.error("Error deleting kahoot:", error));
  };

  const handlePlay = () => {fetch(`http://localhost:8080/gamesessions/${id}`, {
    method: "POST",
  })
    .then(() => {
        alert("Starting the kahoot!");
        navigate("/"); 
        })
    .catch((error) => console.error("Error POST PLAY:", error));

  };

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-4xl font-bold text-center mb-4">{kahoot.title}</h1>
          <div className="text-gray-700">
            <p className="text-lg font-semibold">Description:</p>
            <p className="text-sm mb-2">{kahoot.description || "No description available."}</p>
            <p className="text-lg font-semibold">Questions:</p>
            <p className="text-sm mb-2">{kahoot.questions} questions</p>
            <p className="text-lg font-semibold">Plays:</p>
            <p className="text-sm">{kahoot.plays} plays</p>
          </div>
          <div className="flex justify-between gap-4 mt-6">
            <button
              onClick={handlePlay}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
            >
              Play Kahoot
            </button>
            <button
              onClick={() => navigate(`/kahoots/${id}/update`)} 
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
            >
              Update Kahoot
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
            >
              Delete Kahoot
            </button>
          </div>
          <div className="text-center mt-4">
            <button
              onClick={() => navigate("/listKahoots")} 
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Back to Kahoots
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
