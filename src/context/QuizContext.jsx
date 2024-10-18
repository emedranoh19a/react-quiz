import { createContext, useContext, useEffect, useReducer } from "react";
import { questions } from "../data/questions"

const QuizContext = createContext();

//state: loading, error, ready(to start the quiz), active, finished
const initialState = {
  questions,
  status: "loading",
  index: 0, //number of the question
  answer: null, //answer provided by the user
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

function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  useEffect(function () {
    dispatch({ type: "dataReceived", payload: questions });
    // fetch(`http://localhost:8000/questions`)
    //   .then((res) => res.json())
    //   .then((data) => {
    //     dispatch({ type: "dataReceived", payload: data });
    //   })
    //   .catch(() => {
    //     dispatch({ type: "dataFailed" });
    //   });
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        secondsRemaining,
        dispatch,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
function useQuiz() {
  const value = useContext(QuizContext);
  if (value === undefined) return;
  return value;
}
export { QuizProvider, useQuiz };
