export default function Options({ options, dispatch, answer, userAnswer }) {
  const userHasAnswered = userAnswer !== null;
  console.log("user answer: ");
  console.log(userHasAnswered);
  return (
    <div className="options">
      {options.map((option, index) => (
        <button
          className={`btn btn-option ${
            userHasAnswered && index === userAnswer ? "answer" : ""
          } ${!userHasAnswered ? "" : answer === index ? "correct" : "wrong"}`}
          key={option}
          onClick={() => {
            dispatch({ type: "newAnswer", payload: index });
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
