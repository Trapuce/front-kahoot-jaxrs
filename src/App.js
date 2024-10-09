import Header from "./components/Header";
import { Routes, Route } from "react-router-dom";
import Banner from "./components/Banner";
import LoginForm from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Kahoot from "./pages/Kahoot";
import Question from "./pages/Question";
import KahootLists from "./pages/KahootLists";
import KahootDetail from "./pages/KahootDetail";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginForm />}/>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/createKahoot" element={<Kahoot />} />
      <Route path="/createquestion" element={<Question />} />
      <Route path="/listKahoots" element={<KahootLists />} />
      <Route path="/kahoots/:id" element={<KahootDetail />} /> 
    </Routes>
  );
}

export default App;
