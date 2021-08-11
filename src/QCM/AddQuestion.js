import React, { useState } from "react";
import AddQuestion2 from "./AddQuestion2";
import AddQuestionQCM from "./AddQuestionQCM";

function AddQuestion() {

    const [role, setRole] = useState("Normal")
    return (
        <div className="others ">
            <section className="contact-section pt-130">
                <div className="container">
                    <div className="contact-form-wrapper" >
                        <div id="gromitFormscontact-form" className="gf-form-wrapper pixi-form-contact">
                            <div className="gf-form-fields-wrapper"  >
                                <div className="gf-field-wrapper gf-field-select gf-field-object " >
                                    <label>
                                        <span>Type</span>
                                        <select name="user" className="" id="dropdown" onChange={(e) => {
                                            const selecredRole = e.target.value;
                                            setRole(selecredRole)
                                        }} >
                                            <option value="Normal">
                                                Normal
                                            </option>
                                            <option value="QCM">
                                                QCM
                                            </option>
                                        </select>
                                    </label>
                                    <div className="gf-field-validation-message" data-validate-for="object"></div>
                                </div>
                            </div>
                            <div > {role === 'QCM' ? <AddQuestionQCM /> : <AddQuestion2 />}</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
export default AddQuestion;