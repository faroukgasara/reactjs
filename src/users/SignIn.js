import React, { useState } from "react";
import { useHistory } from "react-router";
import Swal from "sweetalert2";
import Sidebar from "../base/Sidebar";

const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const token = localStorage.getItem("token")

export const SignIn = () => {
    const [email, setEmail] = useState("");
    const [mdp, setmdp] = useState("");
    const history = useHistory();

    const submitHandler = () => {
        if (mdp === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'mot de passe vide!',
            })
        }
        else if (emailRegex.test(email) === false) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Entrez un mail valide!',
            })
        } else {
            fetch("http://localhost:3000/login", {
                method: 'post',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ email: email, mdp: mdp })
            }).then(resp => {
                if (resp.status === 201) return resp.json();
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'e-mail ou mot de passe incorrect réessayez!',

                    })
                }
            }).then(data => {
                localStorage.setItem('user', JSON.stringify(data.user.user));
                localStorage.setItem("token", data.access_token)
            }).catch(error => {
                console.error(error)
            }).then(() => { history.push("/List"); window.location.reload(); })
        }
    }

    return (
        <div className="" >
            <div className="gf-form-fields-wrapper"  >
                <div>{
                    (token && token !== "" && token !== undefined) ? <Sidebar /> :
                        <div className="login">
                            <div className="loginContainer1"  >
                                <img className="tourne" src="https://piximind.com/themes/pkurg-spacebootstrap5/assets/img/svg/logo.svg" alt="Piximind" />
                            </div>
                            <div className="loginContainer">
                                <div className="user-box"   >
                                    <label>Email </label>
                                    <input type="email" name="email" className="form-control" required="" placeholder="Enter email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="user-box"  >
                                    <label> Mot de passe</label>
                                    <input type="password" name="mdp" className="form-control" placeholder="Enter password"
                                        value={mdp}
                                        onChange={(e) => setmdp(e.target.value)}
                                    />
                                </div>
                                <br></br>
                                <br></br>
                                <button onClick={submitHandler} className="btn btn-white btn-lg btn-block">
                                    Se connecter
                                </button>
                            </div>
                        </div>
                }</div>
            </div>
        </div>
    );
}
export default SignIn;