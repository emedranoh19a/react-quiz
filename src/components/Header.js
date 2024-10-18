import { useQuiz } from "../context/QuizContext";

function Header() {
  return (
    <header className="app-header">
      <img src="react-2.svg" alt="React logo" />
      <h1>The React Quiz</h1>
    </header>
  );
}

export default Header;
