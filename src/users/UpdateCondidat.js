import React, { Component } from "react";
import Swal from "sweetalert2";


const emailRegex = RegExp(
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
export class UpdateCondidat extends Component {
    constructor() {
        super();
        this.state = {
            role: "Condidat",
            nom: "",
            mdp: "",
            email: "",
            telephone: "",
            age: "",
            diplome: "",
            prenom: "",
            faculte: "",
            user: []
        }
    }

    componentDidMount() {
        fetch("http://localhost:3000/users/" + this.props.match.params.id)
            .then((data) => data.json())
            .then((data) => this.setState({ user: data }))
    }

    async submitHandler() {
        if (this.state.nom === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Entrez un nom valide!',
            })
        }
        else if (this.state.prenom === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Entrez un prenom valide!',
            })
        }
        else if (this.state.faculte === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Entrez un faculte valide!',
            })
        }
        else if (this.state.diplome === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Entrez un diplome valide!',
            })
        } else if (emailRegex.test(this.state.email) === false) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Entrez un mail valide!',
            })
        } else if (isNaN(this.state.telephone) || this.state.telephone === "" || this.state.telephone.length !== 8) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Entrez un tel valide!',
            })
        }
        else if (isNaN(this.state.age) || this.state.age === "" || this.state.age < 18 || this.state.age > 40) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Entrez un age valide [18..40]!',
            })
        } else {
            let data = this.state;
            fetch("http://localhost:3000/users/" + this.state.user._id, {
                method: 'put',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(async response => {
                if (!response.ok) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Mail existe déjà',
                    })
                } else {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Modification Effectuée',
                        showConfirmButton: false,
                        timer: 1500
                    }).then(setTimeout(() => { window.close(); }, 1600))
                }
            });
            
        }
    }

    render() {
        return (
            <div className='others'>
                <section className="contact-section pt-130">
                    <div className="container">
                        <div className="contact-form-wrapper" >
                            <div className="gf-field-wrapper gf-field-string gf-field-fonction  ">
                                <label>
                                    <span>Nom  </span>
                                    <input type="text" name="nom" className="form-control" required="" placeholder={this.state.user.nom}
                                        value={this.state.nom}
                                        onChange={((data) => { this.setState({ nom: data.target.value }) })}
                                    />
                                </label>
                                <div className="gf-field-validation-message" data-validate-for="nom"></div>
                            </div>
                            <div className="gf-field-wrapper gf-field-string gf-field-fonction  ">
                                <label>
                                    <span>Prénom</span>
                                    <input type="text" name="prenom" className="form-control" placeholder={this.state.user.prenom}
                                        value={this.state.prenom}
                                        onChange={((data) => { this.setState({ prenom: data.target.value }) })}
                                    />
                                </label>
                                <div className="gf-field-validation-message" data-validate-for="fonction"></div>
                            </div>

                            <div className="gf-field-wrapper gf-field-string gf-field-fonction  ">
                                <label>
                                    <span>Diplome</span>
                                    <input type="text" name="diplome" className="form-control" placeholder={this.state.user.diplome}
                                        value={this.state.diplome}
                                        onChange={((data) => { this.setState({ diplome: data.target.value }) })}
                                    />
                                </label>
                                <div className="gf-field-validation-message" data-validate-for="fonction"></div>
                            </div>
                            <div className="gf-field-wrapper gf-field-string gf-field-entreprise  ">
                                <label>
                                    <span>Faculte</span>
                                    <input type="text" name="faculte" className="form-control" placeholder={this.state.user.faculte}
                                        value={this.state.faculte}
                                        onChange={((data) => { this.setState({ faculte: data.target.value }) })}

                                    />
                                </label>
                                <div className="gf-field-validation-message" data-validate-for="faculte"></div>
                            </div>
                            <div className="gf-field-wrapper gf-field-email gf-field-email  required">
                                <label>
                                    <span>Email</span>
                                    <input type="email" name="email" className="form-control" required="" placeholder={this.state.user.email}
                                        value={this.state.email}
                                        onChange={((data) => { this.setState({ email: data.target.value }) })}
                                    />
                                </label>
                                <div className="gf-field-validation-message" data-validate-for="email"></div>
                            </div>
                            <div className="gf-field-wrapper gf-field-string gf-field-telephone  ">
                                <label>
                                    <span>Téléphone</span>
                                    <input type="text" name="telephone" className="form-control" placeholder={this.state.user.telephone}
                                        value={this.state.telephone}
                                        onChange={((data) => { this.setState({ telephone: data.target.value }) })}
                                    />
                                </label>
                                <div className="gf-field-validation-message" data-validate-for="telephone"></div>
                            </div>

                            <div className="gf-field-wrapper gf-field-string gf-field-telephone  ">
                                <label>
                                    <span>Age</span>
                                    <input type="number" name="age" className="form-control" placeholder={this.state.user.age}
                                        value={this.state.age}
                                        onChange={((data) => { this.setState({ age: data.target.value }) })}
                                    />
                                </label>
                                <div className="gf-field-validation-message" data-validate-for="telephone"></div>
                            </div>



                            <br></br>
                            <button onClick={() => { this.submitHandler() }} data-attach-loading="" type="submit" className="btn btn-primary gf-submit-btn pixi-submit pixi-submit">
                                Modifier
                            </button>

                        </div>

                    </div>
                </section>
            </div>
        );
    }
}
export default UpdateCondidat;