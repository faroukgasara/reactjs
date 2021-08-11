import React, { useState, useEffect } from 'react';
import '../App.css';

import Steps from './Steps';
import Start from './Start';
import End from './End';
import Templates from '../QCM/Templates';
import Modal from './Modal';



let interval;

const QuizManager = (props) => {
  const [step, setStep] = useState(1);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    fetchData()
    if (step === 3) {
      clearInterval(interval);
    }
  }, [step]);

  const quizStartHandler = () => {
    setStep(2);
    interval = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);
  }

  const resetClickHandler = () => {
    setActiveQuestion(0);
    setAnswers([]);
    setStep(2);
    setTime(0);
    interval = setInterval(() => {
      setTime(prevTime => prevTime + 1);
    }, 1000);
  }
  const [templates, setTemplate] = useState([]);


  async function fetchData() {
    const res = await fetch("http://localhost:3000/templates/"+props.match.params.id);
    res
      .json()
      .then(res => setTemplate(res));
  }

  return (
    <div className="others">
      {step === 1 && <Start 
        onQuizStart={quizStartHandler} 
        tem={templates.libelle}
        
      />}
      {step === 2 && <Steps
        data={templates.question[activeQuestion]}
        onAnswerUpdate={setAnswers}
        numberOfQuestions={templates.question.length}
        activeQuestion={activeQuestion}
        onSetActiveQuestion={setActiveQuestion}
        onSetStep={setStep}
        time={time}
        tem={templates.libelle}
      />}
      {step === 3 && <End
        results={answers}
        data={templates.question}
        onReset={resetClickHandler}
        onAnswersCheck={() => setShowModal(true)}
        time={time}
        id={props.match.params.id}
        email={props.match.params.email}
        tem={templates.libelle}
      />}

    </div>
  );
}

export default QuizManager;