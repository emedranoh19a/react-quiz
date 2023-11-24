export default function Progress({
  index,
  numQuestions,
  points,
  maxPossiblePoints,
  userAnswer,
}) {
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
