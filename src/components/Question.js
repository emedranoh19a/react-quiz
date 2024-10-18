import { useQuiz } from "../context/QuizContext";
import Options from "./Options";

export default function Question() {
  const { questions, index, dispatch, answer: userAnswer } = useQuiz();
  const question = questions[index];
  return (
    <div>
      <h4>{question.question}</h4>
      <Options
        options={question.options}
        dispatch={dispatch}
        answer={question.correctOption}
        userAnswer={userAnswer}
      />
    </div>
  );
}
