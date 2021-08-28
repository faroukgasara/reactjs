import React, { useEffect, useState } from "react";
import "../App.css";

const Modal = ({ handleClose, show, results }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    const [correctAnswers, setCorrectAnswers] = useState(0);

    useEffect(() => {
      let correct = 0;
      if(!results){
      }else{
        results.forEach((result) => {
            if(result.a ===  result.q) {
              correct++;
            }
          });
          setCorrectAnswers(correct);
      }
    });
    
    return (
        <div className={showHideClassName}>
            <div className="modalBackground1">
                <div className="modalContainer1">
                    <div className="titleCloseBtn">
                        <button type="button" onClick={handleClose}>
                        <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <br></br>
                    <div className="title">
                        <strong>Resultat !</strong>
                        <p > {correctAnswers }<strong >/{results.length}</strong></p>
                    </div>
                    <br></br>


                    <div className="scroller">
                        {!results ? <div> Error</div> :
                            results.map((result, i) => 
                            (
                                <div key={i} className="col-md-12">
                                    <div className="col-auto">
                                        <p>{i+1} : Type : {result.t}</p>
                                        <p className={result.a === result.q  ? 'blueresult' : 'blueresult'}> { result.t === "Normal" ? <div>Question: {result.q}</div> : <p>Question: {result.qs}</p> }</p>
                                        <p className={result.a === result.q  ? 'blueresult' : 'blueresult'}> { result.t === "Normal" ? <p></p> : <p>Bonne réponse: {result.q}</p> }</p>
                                    </div>         
                                    <div className="col-auto">
                                        <p className={(result.a === result.q) ? 'greenresult' : 'redresult'}>{(result.a !== result.q) && (result.t === "Normal") ? <div>La réponse: {result.a}</div> : <div>La réponse: {result.a}</div> }</p>
                                            
                                    </div>
                                </div>
                            )
                            )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;