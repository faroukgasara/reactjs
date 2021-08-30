import axios from "axios";
import React, { Component } from "react";
import '../App.css';
import Modal from "./Modal";
import ReactPaginate from 'react-paginate';
import Swal from "sweetalert2";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { blue } from "@material-ui/core/colors";

const doc = new jsPDF();
class resultats extends Component {


    constructor(props) {
        super(props)
        this.state = {
            users: [],
            isLoading: false,
            isError: false,
            search: "",
            res: "",
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
    gererpdf(user) {

        doc.autoTable({
            theme: 'grid',
            bodyStyles: { lineColor: [0, 0, 0] },
            columnStyles: { 0: { halign: 'center' } },
            margin: { top: 10 },
            startY: 0.1 * doc.internal.pageSize.height,
            body: [
                ['Condidat'],
            ],
        })

        doc.setFontSize(30);
        doc.text(65, 10, "Fiche D'évaluation")
        doc.setFontSize(10);
        doc.text(20, 50, "Nom :"); doc.text(40, 50, user.nom)
        doc.text(20, 60, "Prenom :"); doc.text(40, 60, user.prenom)
        doc.text(120, 50, "Email :"); doc.text(145, 50, user.email)
        doc.text(120, 60, "telephone :"); doc.text(145, 60, (user.telephone).toString())

        doc.autoTable({ startY: 0.3 * doc.internal.pageSize.height, rowPageBreak: 'avoid',html: '#table' })
        let finalY = doc.previousAutoTable.finalY;
        doc.autoTable({ startY: finalY+20, rowPageBreak: 'avoid',html: '#table1',
        styles: { fillColor: "#86c5da" },
    })

        doc.autoPrint();
        doc.save('table.pdf')
    }

    receivedData() {
        axios
            .get(global.api+`/resultats`)
            .then(res => {
                const data = res.data;
                const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
                const postData = slice.filter((user) => {
                    if (this.state.search === '') {
                        return user;
                    } else if(user.template !== null ){
                        if (user.template.libelle.toLowerCase().includes(this.state.search.toLowerCase()) || user.user.prenom.toLowerCase().includes(this.state.search.toLowerCase()) || user.user.nom.toLowerCase().includes(this.state.search.toLowerCase()) || user.user.email.toLowerCase().includes(this.state.search.toLowerCase())) {
                            return user;
                        }
                    }
                }).map(res => {
                    return res.template !== null && res.user !== null ?
                        <tr key={res._id}>
                            <td>{res.template.libelle}</td>
                            <td>{res.user.nom}</td>
                            <td>{res.user.prenom}</td>
                            <td>{res.user.email}</td>
                            <td>
                                <div  >
                                    <button className="btn btn-success " type="button" onClick={() => { this.handlemodal(res.resultat) }} ><i className="fas fa-eye" aria-hidden="true" /></button>
                                </div>
                            </td>
                            <td>
                                <div >
                                    <a title="Print"  onClick={() => {
                                        this.setState({
                                            res: res.resultat
                                        }); setTimeout(() => { this.gererpdf(res.user); }, 0);
                                    }}><i class="fas fa-file-pdf"><i style={{ color: "white" }} >z</i></i></a>
                                    <a onClick={() => { this.submitHandler(res._id) }} title="Delete" ><i class="fa fa-trash" aria-hidden="true"></i></a>
                                </div>

                            </td>
                        </tr> : (<div></div>)

                })

                this.setState({
                    pageCount: Math.ceil(data.length / this.state.perPage),

                    postData,
                })
            });
    }


    submitHandler(id) {
        Swal.fire({
            title: 'Vous êtes sûr?',
            text: 'Vous ne pouvez pas récupérer ça!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Oui, supprimez-le!',
            cancelButtonText: 'Non, garde-le'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(global.api+"/resultats/" + id, {
                    method: 'DELETE',
                    mode: 'cors',
                    headers: {

                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },

                })
                Swal.fire(
                    'Supprimé!',
                    'suppression effectuée.',
                    'success'
                )
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                Swal.fire(
                    'Annulé',
                    'suppression annulée',
                    'error'
                )
            }
        })

    }


    handlemodal(re) {
        this.setState({
            res: re
        })
        this.showModal()
    }

    showModal = () => {
        this.setState({ show: true });
    };

    hideModal = () => {
        this.setState({ show: false });
    };


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
            <div className="others"  >
                <Modal show={this.state.show} handleClose={this.hideModal} results={this.state.res} >
                </Modal>
                <section className="contact-section pt-130">
                    <div className="container">
                        <div className="topleft">
                            <div className="col-md-12">
                                <div className="section-title text-center animate__animated animate__fadeInDown" >
                                    <p>Résultats</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div style={{ display: "none" }}>
                    <table id="table1" className="col-md-11 offset-md-1 text-center aos-init aos-animate" className="content-table">
                    <thead>
                            <tr>
                                <th>Rédaction</th>
                            </tr>
                        </thead>
                        {!this.state.res ? <div> Error</div> :
                                this.state.res.map((result, i) => {
                                    {
                                        return (result.t === "Normal" ? <tbody key={result._id}>
                                            <tr>
                                            <td> {result.t === "QCM" ? <p></p> : <p>Question: {result.qs}</p>}</td>
                                        </tr> <tr><td>{(result.a !== result.q) && (result.t === "Normal") ? <p>Réponse: {result.a}</p> : <p></p>}</td></tr>
                                        </tbody>: (<div></div>))
                                    }
                                }
                                )}
                    </table>
                    <table id="table" className="col-md-11 offset-md-1 text-center aos-init aos-animate" className="content-table">
                        <thead>
                            <tr>
                                <th>Question</th>
                                <th>Bonne Réponse</th>
                                <th>Réponse</th>
                                <th>Résultat</th>
                            </tr>
                        </thead>
                        <tbody>
                            {!this.state.res ? <p> Error</p> :
                                this.state.res.map((result, i) => {
                                    {
                                        return (result.t === "QCM" ? <tr key={result._id}>
                                            <td> {result.t === "QCM" ? <p>{result.qs}</p> : <p></p>}</td>
                                            <td> {result.t === "QCM" ? <p>{result.q}</p> : <p></p>}</td>
                                            <td>{(result.a !== result.q) && (result.t === "Normal") ? <p></p> : <p>{result.a}</p>}</td>
                                            <td>{result.a !== result.q ?
                                                <p>{result.t === "Normal" ? <p></p> : <p>Incorrect</p>}</p>
                                                : <p>Correct</p>}</td>
                                        </tr> : (<p></p>))
                                    }

                                }
                                )}
                        </tbody>
                    </table>
                </div>

                <section className="contact-section pt-130">
                    <div className="col-auto  gf-field-string gf-field-fonction  "   >
                        <label>
                            <span>Recherche : </span><br></br>
                            <input className="add" type="text" name="search" placeholder="Recherche"
                                value={this.state.search}
                                onChange={((data) => { this.setState({ search: data.target.value }) })}
                            />
                        </label>
                    </div>
                    <div className="container">
                        <table className="col-md-11 offset-md-1 text-center aos-init aos-animate" className="content-table" >
                            <thead>
                                <tr>
                                    <th>Template</th>
                                    <th>Nom</th>
                                    <th>Prénom</th>
                                    <th>Email</th>
                                    <th>Résultat</th>
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
export default resultats;