import React, { useState } from "react";
import "../App.css";

const UpdateCategorieModal = ({ handleClose, show, data, nom }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    const [updatecat,setUpdateCat] = useState({libelle: "NestJs"})

    function update() {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatecat)
        };
        fetch("http://localhost:3000/categories/" + data, requestOptions)
            .then(response => response.json());
        window.location.reload();

    }

    const changeHandler = e => {
        setUpdateCat({ ...updatecat, [e.target.name]: e.target.value })
      }

    return (
        <div className={showHideClassName}>
            <div className="modalBackground">
                <div className="modalContainer">
                    <div className="titleCloseBtn">
                        <button type="button" onClick={handleClose}>
                        <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div className="title">
                        <strong>Modifier !</strong>
                        <br></br>
                    </div>
                    <div className="body">
                        <div className="gf-field-wrapper gf-field-string gf-field-telephone "   >
                            <label>
                                <span><strong>Categorie</strong></span>
                                <br></br>
                                <input type="text" name="libelle" className="form-control"
                                onChange={changeHandler}
                                placeholder={nom}
                                />
                            </label>
                            <br></br>
                            <div className="gf-field-validation-message" data-validate-for="telephone"></div>
                        </div>
                    </div>
                    <div className="footer">
                        <button className="btn btn-primary gf-submit-btn pixi-submit pixi-submit " onClick={update}>Continue</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateCategorieModal;