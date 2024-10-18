import { useQuiz } from "../context/QuizContext";

export default function NextButton() {
  const { dispatch, answer: userAnswer, questions, index } = useQuiz();
  const numQuestions = questions.length;

  if (userAnswer === null) return null;

  return (
    <button
      className="btn btn-ui"
      onClick={() =>
        dispatch({ type: index < numQuestions - 1 ? "nextQuestion" : "finish" })
      }
    >
      {index === numQuestions - 1 ? "Finish" : "Next"}
    </button>
  );
}
