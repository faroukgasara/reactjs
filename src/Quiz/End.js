import { ListAlt } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import SkillBar from 'react-skillbars';
import { formatTime } from './Timer';

const End = ({ results, data, onReset, onAnswersCheck, time, id, email, tem }) => {
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [mail, setmail] = useState("");
  const [allValues, setAllValues] = useState({
    resultat: results,
    template: id,
    user: "",
  });

  const skills = [
    { level: 100 },
  ];
  const colors = {
    bar: '#85bb25',
    title: {
      text: 'white',

      background: '#85bb25'
    }
  }

  useEffect(() => {
    setAllValues({ ...allValues, resultat: results })
    fetch("http://localhost:3000/users/" + email)
      .then((data) => data.json())
      .then((data) => setmail(data._id))
  }, []);



  useEffect(() => {
    setAllValues({ ...allValues, user: mail })
  });

  function saveresult() {
    localStorage.clear();
    setAllValues({ ...allValues, user: mail })
    fetch("http://localhost:3000/resultats", {
      method: 'post',
      mode: 'cors',
      headers: {

        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(allValues)
    })
  }

  useEffect(() => {
    let correct = 0;
    results.forEach((result, index) => {
      if (result.a === result.q) {
        correct++;
      }
    });
    setCorrectAnswers(correct);
    
  }, []);

  const renderTime = remainingTime => {
    return <div>{Math.round(remainingTime)}</div>;
  };




  return (
    <div className="container  " >
      <div className="grid-container">
        <div className="grid-c " >
          <div className="item1" style={{ backgroundColor: "whitesmoke", textAlign: "center" }}><p className='titlequiz' style={{ marginTop: 25 }}>Quiz Terminé</p></div>
          <div className="item2" style={{ backgroundColor: "whitesmoke" }}>
            <p className='titlequiz container' style={{ fontSize: 40 }}>Bonne chance</p>

            <div className="container">

              <p style={{ width: 105, marginTop: 45, marginBottom: 30 }}  >
                {tem}
              </p>

              <p style={{ width: 30, fontSize: 15 }}  >
                Temp Total
              </p>

              <CountdownCircleTimer

                duration={time}
                colors={[
                  ['#004777', 0.33],
                  ['#F7B801', 0.33],
                  ['#A30000', 0.33],

                ]}
              >
                {({ remainingTime }) => renderTime(remainingTime)}
              </CountdownCircleTimer>

              <p style={{ width: 30, fontSize: 15 }}  >
                Question
              </p>
              <div className="row "  >

                <div className="col-auto "><ListAlt className="sidebarIcon" style={{ color: "#85bb25", width: 30, height: 30, marginBottom: 5 }} /></div>
                <div className="col-auto "   >
                  {data.length}/{data.length}
                </div>
              </div>


              <SkillBar skills={skills}
                height={5}
                colors={colors}
              />
            </div>


          </div>
          <div className="item3" style={{ backgroundColor: "white" }}>
              <button className="quizbutton2" onClick={onReset, saveresult}>Enregistrer</button>
          </div>
          <div className="item4" style={{ backgroundColor: "#4c5353", textAlign: "center" }}><a className="navbar-brand logo logo-header anim-logo" >
            <img style={{ marginTop: 25 }} src="https://piximind.com/themes/pkurg-spacebootstrap5/assets/img/svg/logo.svg" alt="Piximind" className="logo-green" />
          </a></div>
        </div>
      </div>

    </div>



  );
}

export default End;