import React, { Component } from "react";
import Swal from "sweetalert2";

export class AddCategorie extends React.Component {

    constructor() {
        super();
        this.state = {
            libelle: ""
        }
    }

    async submitHandler() {
        if (this.state.libelle == "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Entrez un categorie valide!',
            })
        } else {
            let data = this.state;
            fetch("http://localhost:3000/categories", {
                method: 'post',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            }).then(async response => {
                if (!response.ok) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'La catégorie existe déjà',
                    })
                }else{
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your work has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    this.setState({libelle:""})
                }
            })
        }
    }

    render() {
        return (
            <div className="others" >
                <section className="contact-section pt-130">
                    <div className="container">
                        <div className="contact-form-wrapper" >
                            <div className="container">
                                <div className="gf-field-wrapper gf-field-string gf-field-telephone "   >
                                    <label>
                                        <span>Categorie</span>
                                        <input type="text" name="libelle" className="form-control" placeholder="Libelle"
                                            value={this.state.libelle}
                                            onChange={((data) => { this.setState({ libelle: data.target.value }) })}
                                        />
                                    </label>
                                    <div className="gf-field-validation-message" data-validate-for="telephone"></div>
                                </div>
                                <br></br>
                                <button onClick={() => { this.submitHandler() }} data-attach-loading="" type="submit" className="btn btn-primary gf-submit-btn pixi-submit pixi-submit">
                                    Ajouter
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
export default AddCategorie;