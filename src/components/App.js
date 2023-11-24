import Header from "./Header";
import Main from "./Main";
import { useEffect, useReducer } from "react";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import NextButton from "./NextButton";
import Footer from "./Footer";
import Timer from "./Timer";
//state: loading, error, ready(to start the quiz), active, finished
const initialState = {
  questions: [],
  status: "loading",
  index: 0, //number of the question
  answer: null, //correct answer of the actual question
  points: 0,
  highscore: 0, //TODO
  secondsRemaining: null,
};
const SECS_PER_QUESTION = 30;
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer":
      //Update the answer for updating styles. Straightforward
      //Grab the question and verify the answer.
      //Set the new points if the answer was correct.
      const question = state.questions.at(state.index);
      //We can write a ternary inside the return, but let's go simple.
      let pointsToAdd = 0;
      if (question.correctOption === action.payload) {
        pointsToAdd = question.points;
      }

      return {
        ...state,
        answer: action.payload,
        points: state.points + pointsToAdd,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "reset":
      return {
        ...initialState,
        highscore: state.highscore,
        status: "ready",
        questions: state.questions,
      };
    case "tick":
      console.log("tick");
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining > 0 ? state.status : "finished",
      };
    default:
      throw new Error("action unknown");
  }
}

function App() {
  //status: loading, error, ready, active, finished
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((ac, item) => ac + item.points, 0);

  useEffect(function () {
    fetch(`http://localhost:8000/questions`)
      .then((res) => res.json())
      .then((data) => {
        dispatch({ type: "dataReceived", payload: data });
      })
      .catch((err) => {
        dispatch({ type: "dataFailed" });
      });
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              userAnswer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              userAnswer={answer}
            />
            <Footer>
              <NextButton
                dispatch={dispatch}
                userAnswer={answer}
                numQuestions={numQuestions}
                index={index}
              />
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <>
            <FinishScreen
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              highscore={highscore}
              dispatch={dispatch}
            />
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
