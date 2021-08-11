import React, { useEffect, useState } from "react";
import "../App.css";

const Modal = ({ handleClose, show, results }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

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
                    </div>
                    <br></br>


                    <div className="scroller">
                        {!results ? <div> Error</div> :
                            results.map((result, i) => 
                            (
                                <div key={i} className="col-md-12">
                                    <div className="col-auto">
                                        <p>{i+1} : Type : {result.t}</p>
                                        <p className={result.a === result.q  ? 'blueresult' : 'blueresult'}>Bonne réponse: {result.q}</p>
                                    </div>
                                    <div className="col-auto">
                                        <p className={(result.a === result.q) ? 'greenresult' : 'redresult'}>{(result.a !== result.q) && (result.t === "Normal") ? <div>Question: {result.a}</div> : <div>La réponse: {result.a}</div> }</p>
                                            
                                            
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