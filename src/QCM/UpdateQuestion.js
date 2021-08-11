import axios from "axios";
import React, { Component, useState, useEffect } from "react";
import Header from "../base/Header";
import Alert from 'react-popup-alert'

import '../App.css';
function UpdateQuestion(props) {


  const [hasError, setErrors] = useState(false);
  const [categories, setCategories] = useState([]);
  const [questions, setQuestions] = useState([]);

  const [allValues, setAllValues] = useState({
    libelle: "",
    reponseV: "",
    reponseF1: "",
    reponseF2: "",
    reponseF3: "",
    categorie: ""
  });
  const changeHandler = e => {
    setAllValues({ ...allValues, [e.target.name]: e.target.value })
  }

  async function fetchData() {
    const res = await fetch("http://localhost:3000/categories");
    res
      .json()
      .then(res => setCategories(res))
      .catch(err => setErrors(err));
  }


  function updatepush(item) {
    if (allValues.libelle == "") {
      
  }else if(allValues.reponseV== ""){

  }else if(allValues.reponseF1== ""){
    
  }else if(allValues.reponseF2== ""){

  }else if(allValues.reponseF3== ""){
    
  }else if(allValues.categorie== ""){

  }else {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(allValues)
    };
    fetch("http://localhost:3000/questions/" + item, requestOptions)
      .then(response => response.json());
    }
  }



  useEffect(() => {
    fetchData();
  });




  return (

    <div className="others" >
      <section className="contact-section pt-130">
        <div className="container">
          <div className="contact-form-wrapper" >
            <div className="global" >

                <div className="gf-field-wrapper gf-field-string "    >
                  <label>
                    <span>Question</span>
                    <input type="text" name="libelle" className=""
                      id="libelle"
                      placeholder={questions.libelle}
                      onChange={changeHandler}
                    />
                  </label>
                  <div > {allValues.libelle === "" ? <label  className="err" > <span>Entrez un Titre valide!</span></label> : <span></span>}</div>
                
              </div>
              <br></br>

              <div className="gf-field-wrapper gf-field-string gf-field-telephone "   >
                <label>
                  <span>La bonne réponse</span>
                  <input type="text" name="reponseV" className=""
                    id="reponseV"
                    placeholder={questions.reponseV}
                    onChange={changeHandler}
                  />
                </label>
                <div > {allValues.reponseV === "" ? <label  className="err"> <span>Entrez un reponse valide!</span></label> : <span></span>}</div>
              </div>
              <br></br>

              <div className="gf-field-wrapper gf-field-string gf-field-telephone "   >
                <label>
                  <span>Réponse</span>
                  <input type="text" name="reponseF1" className=""
                    id="reponseF1"
                    placeholder={questions.reponseF1}
                    onChange={changeHandler}
                  />
                </label>
                <div > {allValues.reponseF1 === "" ? <label  className="err"> <span>Entrez un reponse valide!</span></label> : <span></span>}</div>
              </div>
              <br></br>

              <div className="gf-field-wrapper gf-field-string gf-field-telephone "   >
                <label>
                  <span>Réponse</span>
                  <input type="text" name="reponseF2" className=""
                    id="reponseF2"
                    placeholder={questions.reponseF2}
                    onChange={changeHandler}
                  />
                </label>
                <div > {allValues.reponseF2 === "" ? <label  className="err"> <span>Entrez un reponse valide!</span></label> : <span></span>}</div>
              </div>
              <br></br>

              <div className="gf-field-wrapper gf-field-string gf-field-telephone "   >
                <label>
                  <span>Réponse</span>
                  <input type="text" name="reponseF3" className=""
                    id="reponseF3"
                    placeholder={questions.reponseF3}
                    onChange={changeHandler}
                  />
                </label>
                <div > {allValues.reponseF3 === "" ? <label  className="err"> <span>Entrez un reponse valide!</span></label> : <span></span>}</div>
              </div>
              <br></br>

              <div className="gf-field-wrapper gf-field-select gf-field-object  column" >
                <label>
                  <span>Categorie</span>
                  <select name="categorie" className=""
                    id="categorie"
                    onChange={changeHandler} >
                    {categories.map((p, i) => (
                      <option value={p.libelle}>
                        {p.libelle}
                      </option>
                    ))
                    }
                  </select>

                </label>
                <div > {allValues.categorie === "" ? <label  className="err"> <span>choisir la catégorie</span></label> : <span></span>}</div>
              </div>
              <br></br>

              <button onClick={updatepush(props.match.params.id)} data-attach-loading="" type="submit" className="btn btn-primary gf-submit-btn pixi-submit pixi-submit">
                Modifier
              </button>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
export default UpdateQuestion;