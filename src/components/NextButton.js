export default function NextButton({
  dispatch,
  userAnswer,
  numQuestions,
  index,
}) {
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
