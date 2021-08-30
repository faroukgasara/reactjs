import React, { useState } from "react";
import Condidat from "./Condidat";
import HR from "./HR";
import '../App.css';

function SignUp() {

    const [role, setRole] = useState("candidat")
    return (
        <div className="others ">
            <section className="contact-section pt-130">
                <div className="container">
                    <div className="contact-form-wrapper" >
                        <div id="gromitFormscontact-form" className="gf-form-wrapper pixi-form-contact">
                            <div className="gf-form-fields-wrapper"  >
                                <div className="gf-field-wrapper gf-field-select gf-field-object  column" >
                                    <label>
                                        <span>Rôle
                                        </span>
                                        <select name="user" Name="class" id="dropdown" onChange={(e) => {
                                            const selecredRole = e.target.value;
                                            setRole(selecredRole)
                                        }} >
                                            <option value="candidat">
                                                Candidat
                                            </option>
                                            <option value="rh">
                                                RH
                                            </option>
                                        </select>
                                    </label>
                                    <div className="gf-field-validation-message" data-validate-for="object"></div>
                                </div>
                            </div>
                            <div > {role === 'rh' ? <HR /> : <Condidat />}</div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
export default SignUp;