import React, {useState} from 'react';
import QuestionCard from './components/QuestionCard'
// TYPES
import {fetchQuizQuestions, QuestionState, Difficulty} from './API'

//STYLES
import {GlobalStyle, Wrapper} from './App.styles'




export type AnswerObject = {

  question:string;
  answer:string;
  correct:boolean;
  correctAnswer:string;

}

const TOTAL_QUESTIONS = 10


const App = ()  => {
    // console.log("1")
    const [loading, setLoading] = useState(false)
    const [questions,setQuestions] = useState<QuestionState[]>([])
    const [number, setNumber] = useState(0)
    const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
    const [score, setScore] = useState(0)
    const [gameOver,setGameOver] = useState(true)


    // console.log(fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY))
    // console.log("2")
    console.log(questions)

    const startTrivia = async() => {
      // LOADING PHASE
      setLoading(true)
      setGameOver(false)

      // FETCH CALLS FROM API
      const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, Difficulty.EASY)

      // RESET ALL THE VALUES
      setQuestions(newQuestions)
      setScore(0)
      setUserAnswers([])
      setNumber(0)
      setLoading(false)


    }
    const checkAnswer = (e:React.MouseEvent<HTMLButtonElement>) => {
      if(!gameOver){
        // USER ANSWER
        const answer = e.currentTarget.value

        // CHECK IF THE USER ENTERED ANSWER IS THE CORRECT ANSWER
        const correct = questions[number].correct_answer === answer

        // ADD SCORE IF THE ANSWER IS CORRECT
        if (correct) setScore(prev => prev+1)

        // SAVE ANSWER IN THE ANSWER OBJECT
        const answerObject = {
          question: questions[number].question,
          answer,
          correct,
          correctAnswer: questions[number].correct_answer,

        }
        setUserAnswers((prev) => [...prev, answerObject])

      }

    }
    const nextQuestion = () => {

      const nextQuestion = number + 1
      if(nextQuestion === TOTAL_QUESTIONS) {
        setGameOver(true)
      }
      else{
        setNumber(nextQuestion)
      }

    }


    console.log("GameOver:" + gameOver + "Loading:" + loading + "Number:" + number)
    return (
      //CREATING FRAGMENT BECAUSE JSX CAN ONLY RETURN ONE ELEMENT
      <>
          <GlobalStyle />
          <Wrapper>
             <h1> Quiz </h1>
             {

               gameOver || userAnswers.length === TOTAL_QUESTIONS
               ?( <button className="start" onClick={startTrivia}> Start </button>)
               :null
             }

             { !gameOver ? <p className="score">Score:{score}</p>: null}
             { loading && <p> Loading Questions ... </p>}
             {!loading && !gameOver &&
                <QuestionCard
                questionNumber = {number + 1}
                totalQuestions = {TOTAL_QUESTIONS}
                question = {questions?.[number]?.question ?? ''}
                answers = {questions?.[number]?.answers ?? []}
                userAnswer = {userAnswers ? userAnswers[number] :undefined }
                callback = {checkAnswer}/>
              }
             {
               !loading && !gameOver && userAnswers.length === number+1
               ? <button className="next" onClick={nextQuestion}> Next </button>
               : null
             }


         </Wrapper>
     </>
    )

}

export default App;
