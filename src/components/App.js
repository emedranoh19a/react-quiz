import Header from "./Header";
import Main from "./Main";
import { useEffect, useReducer } from "react";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
//state: loading, error, ready(to start the quiz), active, finished
const initialState = {
  questions: [],
  status: "loading",
  index: 0, //number of the question
  answer: null, //correct answer of the actual question
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
      return { ...state, answer: action.payload };

    default:
      throw new Error("action unknown");
  }
}

function App() {
  //status: loading, error, ready, active, finished
  const [{ questions, status, index, answer }, dispatch] = useReducer(
    reducer,
    initialState
  );
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
  const numQuestions = questions.length;

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
          <Question
            question={questions[index]}
            dispatch={dispatch}
            userAnswer={answer}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
