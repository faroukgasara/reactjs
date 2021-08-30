import React from "react";
import Swal from "sweetalert2";
const history = require("history").createBrowserHistory({ forceRefresh: true });
export class AddTemplate extends React.Component {

    constructor() {
        super();
        this.state = {
            libelle: "",
            categorie: "",
            categories: [],
        }
    }

    async submitHandler(e) {
        if (this.state.libelle === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Entrez un Titre valide!',
            })
        } else if (this.state.categorie === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'choisir la catégorie!',
            })
        } else {
            let data = this.state;
            fetch(global.api+"/templates", {
                method: 'post',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(data)
            })
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Votre travail a été enregistré',
                showConfirmButton: false,
                timer: 1500
            }).then(() => { history.push("/Templates"); })
        }
    }

    componentDidMount() {
        this.setState({ isLoading: true })
        fetch(global.api+"/categories")
        .then((categories) => categories.json())
        .then((categories) => this.setState({ categories, isLoading: false }));
    }

    renderTableRows = () => {
        return this.state.categories.map(cat => {
            return (
                <option key ={cat._id} value={cat._id}>
                    {cat.libelle}
                </option>
            )
        })
    }

    render() {
        return (
            <div className="others" >
                <section className="contact-section pt-130">
                    <div className="container">
                        <div className="contact-form-wrapper" >
                            <div id="gromitFormscontact-form" className="gf-form-wrapper pixi-form-contact">
                                <div className="others" >
                                    <div className="gf-field-wrapper gf-field-string gf-field-fonction  "  >
                                        <label>
                                            <span>Titre  </span>
                                            <input type="text" name="libelle" required="" className="form-control" placeholder="Titre"
                                                value={this.state.libelle}
                                                onChange={((data) => { this.setState({ libelle: data.target.value }) })}
                                            />
                                        </label>
                                        <div className="gf-field-validation-message" data-validate-for="libelle"></div>
                                    </div>
                                    <br></br>
                                    <div className="gf-field-wrapper gf-field-select gf-field-object " >
                                        <label>
                                            <span>Catégories</span>
                                            <select name="categorie" id="dropdown"
                                                value={this.state.categorie}
                                                onChange={((data) => { this.setState({ categorie: data.target.value }) })}>
                                                <option>Select</option>
                                                {this.renderTableRows()}
                                            </select>
                                        </label>
                                        <div className="gf-field-validation-message" data-validate-for="object"></div>
                                    </div>
                                    <br></br>
                                    <button onClick={() => { this.submitHandler() }} data-attach-loading="" type="submit" className="btn btn-primary gf-submit-btn pixi-submit pixi-submit">
                                        Ajouter
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
export default AddTemplate;