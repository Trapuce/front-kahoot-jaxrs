import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  QuestionMarkCircleIcon,
  InformationCircleIcon,
  CheckBadgeIcon,
} from "@heroicons/react/24/outline";
import square from "../components/images/icons8-carré-arrondi-50.png";
import circle from "../components/images/icons8-cercle-50.png";
import triangle from "../components/images/icons8-triangle-48.png";
import diamond from "../components/images/icons8-losange-48.png";
import Header from "../components/Header";
import HeaderPageQuestion from "../components/HeaderPageQuestion";

export default function Question() {
  const location = useLocation();
  const { userId, kahootId, username } = location.state || {};
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    content: "",
    points: 0,
    createdAt: new Date(),
    typeQuestion: "multiple_choice", 
    timeLimit: 30,
    answers: [
      { content: "", isCorrect: false },
      { content: "", isCorrect: false },
      { content: "", isCorrect: false },
      { content: "", isCorrect: false },
    ],
  });

  const [showAlert, setShowAlert] = useState(false);
  const icons = [square, circle, triangle, diamond];
  const bgColors = ["bg-red-500", "bg-blue-500", "bg-yellow-500", "bg-green-500"];

  useEffect(() => {
    if (currentQuestion.type === "true_false") {
      setCurrentQuestion((prev) => ({
        ...prev,
        answers: [
          { content: "Vrai", isCorrect: false },
          { content: "Faux", isCorrect: false },
        ],
      }));
    } else if (
      currentQuestion.typeQuestion === "multiple_choice" &&
      currentQuestion.answers.length !== 4
    ) {
      setCurrentQuestion((prev) => ({
        ...prev,
        answers: [
          { content: "", isCorrect: false },
          { content: "", isCorrect: false },
          { content: "", isCorrect: false },
          { content: "", isCorrect: false },
        ],
      }));
    }
  }, [currentQuestion.type]);

  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    setCurrentQuestion((prevQuestion) => ({
      ...prevQuestion,
      [name]: value,
    }));
  };

  const handleAnswerChange = (index, field, value) => {
    setCurrentQuestion((prevQuestion) => {
      const newAnswers = [...prevQuestion.answers];
      if (field === "isCorrect") {
        newAnswers.forEach((answer, i) => {
          if (i !== index) {
            answer.isCorrect = false;
          }
        });
      }
      newAnswers[index] = { ...newAnswers[index], [field]: value };
      return { ...prevQuestion, answers: newAnswers };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Vérification de la validité de la question
    if (currentQuestion.typeQuestion === "multiple_choice") {
      const hasCorrectAnswer = currentQuestion.answers.some(answer => answer.isCorrect);
      const allAnswersHaveContent = currentQuestion.answers.every(answer => answer.content.trim() !== "");
      if (!hasCorrectAnswer || !allAnswersHaveContent) {
        alert("Veuillez vous assurer qu'au moins une réponse est correcte et que toutes les réponses ont un contenu.");
        return;
      }
    }
  
    const newQuestion = {
      content: currentQuestion.content,
      typeQuestion: currentQuestion.typeQuestion, 
      timeLimit: currentQuestion.timeLimit,
      answers: currentQuestion.answers.map(answer => ({
        content: answer.content,
        isCorrect: answer.isCorrect
      }))
    };
    console.log("Sending data:", JSON.stringify(newQuestion, null, 2));
    try {
      const response = await fetch(`http://localhost:8080/questions/${kahootId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newQuestion),
      });
  
      const textResponse = await response.text();
      console.log("Raw server response:", textResponse);
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}, body: ${textResponse}`);
      }
  
      let result;
      if (textResponse) {
        try {
          result = JSON.parse(textResponse);
          console.log("Parsed response:", result);
        } catch (parseError) {
          console.error("Error parsing JSON:", parseError);
          throw new Error("Server returned invalid JSON");
        }
      } else {
        console.warn("Server returned an empty response");
        result = {};
      }
  
      // ... (le reste du code reste inchangé)
    } catch (error) {
      console.error("Error submitting question:", error);
      alert(`Error submitting question: ${error.message}`);
    }
  };

  return (
    <div>
      <HeaderPageQuestion  username={username} />
      <form onSubmit={handleSubmit} className="grid grid-cols-3 h-screen">
        <section className="col-span-2 bg-[#A600FF] flex flex-col">
          <div className="flex flex-grow justify-center items-center m-4">
            <input
              name="content"
              value={currentQuestion.content}
              onChange={handleQuestionChange}
              type="text"
              placeholder="Écris ta question"
              className="shadow-inner border p-2 flex-grow rounded-md outline-none"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-6 m-5">
            {currentQuestion.answers.map((answer, index) => (
              <div
                key={index}
                className="flex items-center space-x-2 bg-white px-4 py-1 rounded-md shadow-md"
              >
                <div className={`${bgColors[index]} py-6 px-1 rounded-md -ml-2`}>
                  <img
                    src={icons[index]}
                    alt={`icon-${index}`}
                    className="h-8 w-8 bg-cover bg-white"
                  />
                </div>
                <input
                  value={answer.content}
                  onChange={(e) => handleAnswerChange(index, "content", e.target.value)}
                  type="text"
                  placeholder={`Réponse ${index + 1}`}
                  className="flex-grow p-2 rounded-md outline-none placeholder-gray-500 text-black"
                  required={currentQuestion.type === "multiple_choice"}
                  disabled={currentQuestion.type === "true_false"}
                />
                <input
                  type="radio"
                  name="correctAnswer"
                  checked={answer.isCorrect}
                  onChange={(e) => handleAnswerChange(index, "isCorrect", e.target.checked)}
                  className="ml-2"
                />
              </div>
            ))}
          </div>
        </section>

        <section className="bg-white shadow-md flex flex-col">
          <div className="m-4 flex flex-col space-y-2 flex-grow">
            <div>
              <div className="flex space-x-1 items-center text-gray-700">
                <QuestionMarkCircleIcon className="h-6 w-6 text-gray-500" />
                <label className="text-lg font-medium">Type de question</label>
              </div>
              <div className="mb-4">
                <select
                  name="typeQuestion"
                  className="mt-1 block w-full p-3 border bg-white rounded-md"
                  value={currentQuestion.typeQuestion}
                  onChange={handleQuestionChange}
                >
                  <option value="multiple_choice">Choix multiple</option>
                  <option value="true_false">Vrai ou Faux</option>
                </select>
              </div>
            </div>
            <hr />
            <div>
              <div className="flex space-x-1 items-center text-gray-700">
                <InformationCircleIcon className="h-6 w-6 text-gray-500" />
                <label className="text-lg font-medium">Temps imparti</label>
              </div>
              <div className="mb-4">
                <select
                  name="timeLimit"
                  value={currentQuestion.timeLimit}
                  onChange={handleQuestionChange}
                  className="mt-1 block w-full p-3 border bg-white rounded-md"
                >
                  <option value={20}>20 secondes</option>
                  <option value={30}>30 secondes</option>
                </select>
              </div>
            </div>
          </div>
          <div className="m-4">
            <button type="submit" className="w-full px-4 py-2 rounded-md text-white bg-blue-500">
              Enregistrer La question
            </button>
          </div>
        </section>
      </form>
    </div>
  );
}
