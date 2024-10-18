import { useQuiz } from "../context/QuizContext";

export default function FinishScreen() {
  const { points, questions, highscore, dispatch } = useQuiz();

  const maxPossiblePoints = questions.reduce((ac, item) => ac + item.points, 0);
  const percentage = (points / maxPossiblePoints) * 100;
  let emoji;
  if (percentage >= 100) emoji = "🥇";
  else if (percentage >= 80) emoji = "🎉";
  else if (percentage >= 50) emoji = "🙃";
  else if (percentage > 0) emoji = "🤨";
  else if (percentage === 0) emoji = "🤦";

  return (
    <>
      <p className="result">
        <span> {emoji}</span>You scored <strong>{points}</strong> out of{" "}
        {maxPossiblePoints} ({Math.ceil(percentage)}%)
      </p>
      <p className="highscore">High score: {highscore} points</p>
      <button
        class="btn btn-ui"
        onClick={() => {
          dispatch({ type: "reset" });
        }}
      >
        Reset
      </button>
    </>
  );
}
