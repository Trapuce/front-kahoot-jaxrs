import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function Kahoot() {
  const location = useLocation();
  const { userId, username } = location.state || {};
  const [formValues, setFormValues] = useState({
    title: "",
    description: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const kahootData = {
      title: formValues.title,
      description: formValues.description,
    };

    try {
      const response = await fetch(`http://localhost:8080/kahoots/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(kahootData),
      });

      if (!response.ok) {
        throw new Error("Failed to create Kahoot");
      }

      const result = await response.json();
      console.log("Kahoot created:", result);

      navigate("/createquestion", {
        state: { kahootId: result.id, userId, username },
      });
    } catch (error) {
      console.error("Error creating Kahoot:", error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: "#46178f" }}
    >
      <div className="bg-white p-6 rounded-md shadow-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Créer un Kahoot</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Nom du Kahoot
            </label>
            <input
              name="title"
              type="text"
              value={formValues.title}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={formValues.description}
              onChange={handleChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
              rows="3"
              required
            ></textarea>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
