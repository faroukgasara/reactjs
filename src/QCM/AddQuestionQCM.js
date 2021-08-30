import React from "react";
import Swal from "sweetalert2";
import '../App.css';
const history = require("history").createBrowserHistory({forceRefresh:true});
class AddQuestionQCM extends React.Component {

  constructor() {
    super()
    this.state = {
      libelle: "",
      reponse: [{ libellerep: "", vf: "", type: "QCM" }],
      categorie: "",
      duree: "",
      categories: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this)
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
        <option key={cat.libelle} value={cat.libelle}>
          {cat.libelle}
        </option>
      )
    })
  }

  handleChange(i, e) {
    let reponse = this.state.reponse;
    reponse[i][e.target.name] = e.target.value;
    this.setState({ reponse });
  }

  addFormFields() {
    this.setState(({
      reponse: [...this.state.reponse, { libellerep: "", vf: "", type: "QCM" }]
    }))
  }

  removeFormFields(i) {
    let reponse = this.state.reponse;
    reponse.splice(i, 1);
    this.setState({ reponse });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.libelle === "") {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Entrez un Question valide!',
      })
    }
    else if (this.state.duree === "") {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Choisir un Duree!',
      })
    } else if (this.state.categorie === "") {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Choisir un Categorie valide!',
      })
    } else {
      fetch(global.api+"/questions", {
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
      }).then(setTimeout(() => {  history.push("/Question"); }, 1500))
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="col-auto gf-field-wrapper gf-field-string gf-field-fonction"   >
          <label>
            <span>Question : </span>
            <input className="form-control" type="text" name="libellerep" placeholder="Question"
              value={this.state.libelle}
              onChange={((data) => { this.setState({ libelle: data.target.value }) })}
            />
          </label>
        </div>
        {this.state.reponse.map((element, index) => (
          <div className="row g-4 align-items-center" key={index} >
            <div className="col-auto gf-field-wrapper gf-field-string gf-field-fonction"   >
              <label>
                <span>Reponse : </span>
                <input required className="form-control" type="text" placeholder="Reponse" name="libellerep" value={element.libellerep} onChange={e => this.handleChange(index, e)} />
              </label>
            </div>
            <div className="col-auto " >
              <label>
                <span>V/F : </span>
                <input required type="radio" value="True" name="vf" onChange={e => this.handleChange(index, e)} /> Vrai
              </label>
            </div>
            <div className=" col-auto " >
              <button className="btn btn-success " type="button" onClick={() => this.addFormFields()}><i className="fa fa-plus" aria-hidden="true" /></button>
            </div>
            <div className=" col-auto" >
              {
                index ?
                  <button type="button" className="btn btn-danger" onClick={() => this.removeFormFields(index)}><i className="fa fa-minus" aria-hidden="true" /></button>
                  : null
              }
            </div>
          </div>
        ))}
        <div className="col-auto gf-field-wrapper gf-field-string gf-field-fonction" >
          <label>
            <span>Durée : </span>
            <input className="form-control" type="number" name="duree" placeholder="Durée"

              value={this.state.duree}
              onChange={((data) => { this.setState({ duree: data.target.value }) })}
            />
          </label>
        </div>
        <br></br>
        <div className="col-auto gf-field-wrapper gf-field-string gf-field-object" >
          <label>
            <span>Catégories</span>
            <select name="categorie" id="dropdown"
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
      </form>
    );
  }
}
export default AddQuestionQCM;