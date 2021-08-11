import React, { useEffect, useState } from "react";
import "../App.css";

const QuestionsModal = ({ handleClose, show, results }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";



    function table() {

        if (!results) {

        } else {
            return (results.map(res => (
                <tr key={res._id}>
                    <td>{res.libellerep}</td>
                    <td>
                        {res.vf === 'True' ? <div className="" >
                        <i class="fas fa-check"></i>
                        </div> : <i class="fas fa-times"></i>}
                        
                    </td>
                    <td>{res.type}</td>
                </tr>
            )))
        }
    }


    return (
        <div className={showHideClassName}>
            <div className="modalBackground1">
                <div className="modalContainer2">
                    <div className="titleCloseBtn">
                        <button type="button" onClick={handleClose}>
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <br></br>
                    <div className="title">
                        <strong>Réponses !</strong>
                    </div>
                    <div className="container">
                        <table class="col-md-11 offset-md-1 text-center aos-init aos-animate" className="content-table">
                            <thead>
                                <tr>
                                    <th>Reponse</th>
                                    <th>V/F</th>
                                    <th>Type</th>
                                </tr>
                            </thead>
                            <tbody>
                                {table()}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuestionsModal;