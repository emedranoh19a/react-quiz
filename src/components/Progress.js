import { useQuiz } from "../context/QuizContext";

export default function Progress() {
  const { questions, index, points, answer: userAnswer } = useQuiz();

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((ac, item) => ac + item.points, 0);
  return (
    <header className="progress">
      <progress
        max={numQuestions}
        value={index + Number(userAnswer !== null)}
      />
      <p>
        Progress <strong>{index + 1}</strong>/{numQuestions}
      </p>
      <p>
        <strong>{points}</strong>/{maxPossiblePoints}
      </p>
    </header>
  );
}
