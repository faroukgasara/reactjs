
import React, { Component } from "react";
import '../App.css';
import Swal from "sweetalert2";
import UpdateCategorieModal from "./UpdateCategorieModal";
import ReactPaginate from "react-paginate";
import axios from "axios";
class Categorie extends Component {
    constructor(props) {
        super(props)
        this.state = {
            categories: [],
            isLoading: false,
            isError: false,
            inputLinkClicked: "",
            nom: "",
            libelle: "",
            search: "",
            show: false,
            offset: 0,
            data: [],
            perPage: 10,
            currentPage: 0
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.handlePageClick = this
            .handlePageClick
            .bind(this);
    }

    submitHandler(id) {
        Swal.fire({
            title: 'Es-tu sûr?',
            text: 'Vous ne pouvez pas récupérer ça!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Oui, supprimez-le!',
            cancelButtonText: 'Non, garde-le'
          }).then((result) => {
            if (result.isConfirmed) {
                fetch("http://localhost:3000/categories/" + id, {
                method: 'DELETE',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            })
              Swal.fire(
                'Supprimé!',
                'Suppression Effectuer.',
                'success'
              )
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire(
                'Annulé',
                'Suppression Annuler',
                'error'
              )
            }
          })
    }

    async update(id) {
        if (this.state.libelle !== "") {
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.state)
            };
            fetch("http://localhost:3000/categories/" + id, requestOptions)
                .then(response => response.json());
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            })
        }
    }

    handleAddSecondInput(id, nom) {
        this.setState({
            inputLinkClicked: id
        })
        this.setState({
            nom: nom
        })
        this.showModal()
    }
    showModal = () => {
        this.setState({ show: true });
    };
    hideModal = () => {
        this.setState({ show: false });
    };

    receivedData() {
        axios
            .get(`http://localhost:3000/categories`)
            .then(res => {
                const data = res.data;
                const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
                const postData = slice.filter((user) => {
                    if (this.state.search === "") {
                        return user;
                    } else if (user.libelle.toLowerCase().includes(this.state.search.toLowerCase())) {
                        return user;
                    }
                }).map(categorie => (
                    <tr key={categorie._id}>
                        <td>{categorie.libelle}</td>
                        <td>
                            <div className="">
                                <a onClick={() => { this.submitHandler(categorie._id) }} title="Delete" target="_blank"><i class="fa fa-trash" aria-hidden="true"><i style={{ color: "white" }} >z</i></i></a>
                                <a onClick={() => { this.handleAddSecondInput(categorie._id, categorie.libelle) }} title="Update" target="_blank"><i class="fas fa-pencil-alt"></i></a>
                            </div>
                        </td>
                    </tr>
                )
                )
                this.setState({
                    pageCount: Math.ceil(data.length / this.state.perPage),
                    postData,
                })
            });
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.receivedData()
        });
    };

    componentDidUpdate() {
        this.receivedData()
    }
    componentDidMount() {
        this.receivedData()
    }

    render() {
        return (
            <div className="others">
                <section className="contact-section pt-130">
                    <div className="container">
                        <div className="topleft">
                            <div className="col-md-12">
                            <div className="section-title text-center animate__animated animate__fadeInDown">
                                    <p>List des Categories</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="contact-section pt-130">
                    <div className="col-auto gf-field-string gf-field-fonction  "   >
                        <label>
                            <span>Recherche : </span><br></br>
                            <input class="add" type="text" name="search" placeholder="Recherche"
                                value={this.state.search}
                                onChange={((data) => { this.setState({ search: data.target.value }) })}
                            />
                        </label>
                    </div>
                    <UpdateCategorieModal show={this.state.show} handleClose={this.hideModal} data={this.state.inputLinkClicked} nom={this.state.nom}>
                        <p>Modal</p>
                    </UpdateCategorieModal>
                    <div className="container">
                        <table class="col-md-11 offset-md-1 text-center aos-init aos-animate" className="content-table">
                            <thead>
                                <tr>
                                    <th>Libelle</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.postData}
                            </tbody>
                        </table>
                    </div>
                </section>
                <ReactPaginate
                    previousLabel={"Préc"}
                    nextLabel={"Suivant"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"} />
            </div>
        )
    }
}
export default Categorie;