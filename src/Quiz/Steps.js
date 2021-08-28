import React, { useState, useEffect, useRef } from 'react';
import './test.css'
import '../index';
import '../base/sidebar.css'
import {  ListAlt } from '@material-ui/icons';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import SkillBar from 'react-skillbars';
const Steps = ({ data, onAnswerUpdate, numberOfQuestions, activeQuestion, onSetActiveQuestion, onSetStep, time, tem }) => {

    const [selected, setSelected] = useState('');
    const [error, setError] = useState('');
    const radiosWrapper = useRef();
    const [counter, setCounter] = useState(data.duree);
    const [rep, setRep] = useState("");
    

    const skills = [
        { level:Math.round((activeQuestion+1)/numberOfQuestions*100 ) },
    ];
    const colors = {
        bar: '#85bb25',
        title: {
            text: 'white',

            background: '#85bb25'
        }
    }

    useEffect(() => {
        const findCheckedInput = radiosWrapper.current.querySelector('input:checked');
        if (findCheckedInput) {
            findCheckedInput.checked = false;
        }
        localStorage.setItem("hello", "hello")
    }, [data]);

    const changeHandler = (e) => {
        setSelected(e.target.value);
        if (error) {
            setError('');
        }
    }
    useEffect(() => {
        setCounter(data.duree)
    });


    const nextClickHandler = () => {
        setCounter(0)

       let qs = data.libelle ;
        data.reponse.map((choice, i) => {
            if (choice.type === "QCM") {

                if (choice.vf != "") {
                    onAnswerUpdate(prevState => [...prevState, { q: choice.libellerep, a: selected, t: "QCM" ,qs:qs}]);
                }
            }
            if (choice.type === "Normal") {
                setSelected('zef');
                onAnswerUpdate(prevState => [...prevState, { q: choice.libellerep, a: rep, t: "Normal",qs:qs }]);
            }
        })

        setSelected('');
        setRep("")
        if (activeQuestion < numberOfQuestions - 1) {
            onSetActiveQuestion(activeQuestion + 1);
        } else {
            onSetStep(3);
        }
    }


    const renderTime = remainingTime => {
        return <div>{Math.round(remainingTime)}</div>;
    };
    return (
        <div className="container">
            <div className="grid-container ">
                <div className="grid-c " >
                    <div className="item1" style={{ backgroundColor: "whitesmoke" }} >
                        <div className="row "  >
                            <h1 className="col-md-6 circle" style={{ color: "#85bb25" }}>{activeQuestion + 1}</h1>
                            <div className='col-md-10  titlequiz1'>{data.libelle}</div>
                        </div>
                    </div>

                    <div className="item4" style={{ backgroundColor: "#4c5353", textAlign: "center" }}><a className="navbar-brand logo logo-header anim-logo" >
                        <img style={{ marginTop: 25 }} src="https://piximind.com/themes/pkurg-spacebootstrap5/assets/img/svg/logo.svg" alt="Piximind" className="logo-green" />
                    </a></div>

                    <div className='item2 ' style={{ backgroundColor: "whitesmoke" }}>
                        <div className="container" style={{ marginTop: 10 }}>

                            <p style={{ width: 105, marginTop: 45, marginBottom: 30 }}  >
                                {tem}
                            </p>

                            <p style={{ width: 30, fontSize: 15 }}  >
                                Temp
                            </p>

                            <CountdownCircleTimer
                                isPlaying
                                key={counter}
                                duration={counter}
                                colors={[
                                    ['#004777', 0.33],
                                    ['#004777', 0.33],
                                    ['#004777', 0.33],

                                ]}
                                onComplete={() => { nextClickHandler() }}
                            >
                                {({ remainingTime }) => renderTime(remainingTime)}
                            </CountdownCircleTimer>

                            <p style={{ width: 30, fontSize: 15, marginTop: 60 }}  >
                                Question
                            </p>
                            <div className="row "  >

                                <div className="col-auto "><ListAlt className="sidebarIcon" style={{ color: "#85bb25", width: 30, height: 30, marginBottom: 5 }} /></div>
                                <div className="col-auto "   >
                                    {activeQuestion + 1}<span className="titlequiz">/{numberOfQuestions}</span>
                                </div>
                            </div>

                            <SkillBar skills={skills}
                                height={10}
                                colors={colors}
                            />

                        </div>
                    </div>
                    <div className='item3' style={{ backgroundColor: "white" }}>
                        <div className="container" ref={radiosWrapper}>
                        

                            {data.reponse.map((choice, i) => {
                                {
                                    if (choice.type === 'QCM') {
                                        return < label className="option" key={i} >
                                            <input  type="radio" name="answer" value={choice.libellerep} onChange={changeHandler} />
                                            {choice.libellerep}
                                        </label>
                                    } else {
                                        return <div className="gf-field-wrapper gf-field-email gf-field-email  required "   >
                                            <label>

                                                <span className='ab'>Reponse :</span>

                                                <input name="rep" className="form-control" required=""
                                                    value={rep}
                                                    onChange={(e) => { setRep(e.target.value); setSelected("sdf") }}
                                                />
                                            </label>
                                            <div className="gf-field-validation-message" data-validate-for="email"></div>
                                        </div>
                                    }
                                }
                            })}
                        </div>
                        <button className="quizbutton1" onClick={nextClickHandler}>Suivant</button>
                        {error && <div className="wrong">{error}</div>}
                       
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Steps;