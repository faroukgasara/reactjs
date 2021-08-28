import React from "react";
import Swal from "sweetalert2";

export class AddQuestion2 extends React.Component {
    constructor() {
        super()
        this.state = {
            libelle: "",
            reponse: [{ libellerep: "", vf: "", type: "Normal" }],
            categorie: "",
            duree: "",
            categories: [],
        };
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async componentDidMount() {
        this.setState({ isLoading: true })
        const response = await fetch('http://localhost:3000/categories')
        if (response.ok) {
            const categories = await response.json()
            this.setState({ categories, isLoading: false })
        } else {
            this.setState({ isError: true, isLoading: false })
        }
    }

    renderTableRows = () => {
        return this.state.categories.map(cat => {
            return (
                <option value={cat.libelle}>
                    {cat.libelle}
                </option>
            )
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.libelle === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Entrez un Question valide!',
            })
        } else if (this.state.categorie === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Choisir un Categorie valide!',
            })
        } else if (this.state.duree === "") {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Choisir un Duree!',
            })
        } else {
            fetch("http://localhost:3000/questions", {
                method: 'post',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(this.state)
            });
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Votre travail a été enregistré',
                showConfirmButton: false,
                timer: 1500
            }).then(setTimeout(() => { window.location.reload(); }, 1500))
        }
    }

    handleChange(i, e) {
        let reponse = this.state.reponse;
        reponse[i][e.target.name] = e.target.value;
        this.setState({ reponse });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="others ">
                    <div className="container">
                        <div className="col-auto gf-field-wrapper gf-field-string gf-field-fonction  "   >
                            <label>
                                <span>Question : </span>
                                <input className="form-control" type="text" name="libellerep" placeholder="Question"
                                    value={this.state.libelle}
                                    onChange={((data) => {
                                        this.setState({ libelle: data.target.value }); this.setState(({
                                            reponse: { libellerep: data.target.value, vf: "", type: "Normal" }
                                        }))
                                    })}
                                />
                            </label>
                        </div>
                        <br></br>
                        <div className="col-auto gf-field-wrapper gf-field-string gf-field-fonction  " >
                            <label>
                                <span>Durée : </span>
                                <input className="form-control" type="number" name="duree" placeholder="Durée"

                                    value={this.state.duree}
                                    onChange={((data) => { this.setState({ duree: data.target.value }) })}
                                />
                            </label>
                        </div>
                        <br></br>
                        <div className="col-auto gf-field-wrapper gf-field-select gf-field-object " >
                            <label>
                                <span>Catégories</span>
                                <select name="categorie" className="" id="dropdown"
                                    value={this.state.categorie}
                                    onChange={((data) => { this.setState({ categorie: data.target.value }) })}
                                >
                                    <option>Select</option>
                                    {this.renderTableRows()}
                                </select>
                            </label>
                            <div className="gf-field-validation-message" data-validate-for="object"></div>
                        </div>
                        <div className="button-section " >
                            <button className="btn btn-primary gf-submit-btn pixi-submit pixi-submit button submit " type="submit">Ajouter</button>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}
export default AddQuestion2;