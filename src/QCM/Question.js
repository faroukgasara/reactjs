import axios from "axios";
import React, { Component } from "react";
import '../App.css';
import ReactPaginate from "react-paginate";
import QuestionsModal from "./QuestionsModal";
import Swal from "sweetalert2";

class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
            questions: [],
            isLoading: false,
            isError: false,
            offset: 0,
            search: "",
            reponse: "",
            data: [],
            perPage: 10,
            currentPage: 0
        }
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.handlePageClick = this
            .handlePageClick
            .bind(this);
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

    receivedData() {
        axios
            .get(`http://localhost:3000/questions`)
            .then(res => {
                const data = res.data;
                const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
                const postData = slice.filter((quest) => {
                    if (this.state.search === "") {
                        return quest;
                    } else if (quest.libelle.toLowerCase().includes(this.state.search.toLowerCase()) || quest.categorie.toLowerCase().includes(this.state.search.toLowerCase())) {
                        return quest;
                    }
                }).map(ques => (
                    <tr key={ques._id}>
                        <td>{ques.libelle}</td>
                        <td>{ques.categorie}</td>
                        <td>{ques.duree}</td>
                        <td>
                            {ques.reponse[0].type === "QCM" ? <div className="">
                                <a onClick={() => { this.handlemodal(ques.reponse) }} title="Modal" target="_blank"><i class="fas fa-eye" aria-hidden="true"></i></a>
                            </div> : (<div></div>)}
                        </td>
                        <td>
                            <div className="">
                                <a onClick={() => { this.submitHandler(ques._id) }} title="Delete" target="_blank"><i class="fa fa-trash" aria-hidden="true"></i></a>
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

    componentDidUpdate() {
        this.receivedData()
    }
    componentDidMount() {
        this.receivedData()
    }

    handlemodal(rep) {
        this.setState({
            reponse: rep
        })
        this.showModal()
    }

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };

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
                fetch("http://localhost:3000/questions/" + id, {
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

    render() {

        return (
            <div className="others">
                <QuestionsModal show={this.state.show} handleClose={this.hideModal} results={this.state.reponse} >
                </QuestionsModal>
                <section className="contact-section pt-130">
                    <div className="container">
                        <div className="topleft">
                            <div className="col-md-12">
                            <div className="section-title text-center animate__animated animate__fadeInDown">
                                    <p>List des Questions</p>
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
                    <div className="container">
                        <table class="col-md-11 offset-md-1 text-center aos-init aos-animate" className="content-table">
                            <thead>
                                <tr>
                                    <th>Libelle</th>
                                    <th>Categorie</th>
                                    <th>Durée</th>
                                    <th>Reponse</th>
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
export default List;