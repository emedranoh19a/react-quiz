import Options from "./Options";
export default function Question({ question, dispatch, userAnswer }) {
  console.log(question);

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
