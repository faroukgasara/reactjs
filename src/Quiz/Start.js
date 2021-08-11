import React from 'react';
import '../App.css';
import SkillBar from 'react-skillbars';
import { ListAlt } from '@material-ui/icons';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

const Start = ({ onQuizStart, tem }) => {
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

  const renderTime = remainingTime => {
    return <div>{Math.round(remainingTime)}</div>;
  };
  return (
    <div className="container  " >
      <div className="grid-container">
        <div className="grid-c " >
          <div className="item1" style={{ backgroundColor: "whitesmoke", textAlign: "center" }}><p className='titlequiz' style={{ marginTop: 25 }}>Commencer le quiz</p></div>
          <div className="item2" style={{ backgroundColor: "whitesmoke" }}>
            <p className='titlequiz container' style={{ fontSize: 40 }}>Bonne chance</p>

            <div className="container">

              <p style={{ width: 105, marginTop: 45, marginBottom: 30 }}  >
                {tem}
              </p>

              <p style={{ width: 30, fontSize: 15 }}  >
                Temp
              </p>

              <CountdownCircleTimer
                isPlaying
                duration={0}
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
                  0/
                </div>
              </div>


              <SkillBar skills={skills}
                height={5}
                colors={colors}
              />
            </div>


          </div>
          <div className="item3" style={{ backgroundColor: "white" }}>
            {
              (localStorage.getItem("hello") && localStorage.getItem("hello") !== "" && localStorage.getItem("hello") !== undefined) ? <div></div> : <div><div style={{ backgroundColor: "whitesmoke", marginLeft: 30, marginRight: 30, textAlign: "left", marginTop: 30 }}>
                <p style={{ fontSize: 25 }}>Trucs et astuces </p>
                <p style={{ fontSize: 15 }}>
                  Tu peux utiliser le button suivant pour naviguer parmi les questions<br></br>
                  Vous ne pouvez pas revenir aux questions précédentes si vous les sautez<br></br>
                  Chaque question à un temps précis
                </p>
              </div>
                <button className="quizbutton" onClick={onQuizStart}>Commencer</button></div>}

          </div>
          <div className="item4" style={{ backgroundColor: "#4c5353", textAlign: "center" }}><a className="navbar-brand logo logo-header anim-logo" >
            <img style={{ marginTop: 25 }} src="https://piximind.com/themes/pkurg-spacebootstrap5/assets/img/svg/logo.svg" alt="Piximind" className="logo-green" />
          </a></div>
        </div>
      </div>

    </div>


  );
}

export default Start;