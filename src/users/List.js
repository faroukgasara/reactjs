import axios from "axios";
import React, { Component } from "react";
import '../App.css';
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";

class List extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            isLoading: false,
            isError: false,
            search: '',
            offset: 0,
            data: [],
            perPage: 10,
            currentPage: 0
        };
        this.handlePageClick = this
            .handlePageClick
            .bind(this);
    }

    submitHandler(email) {
        Swal.fire({
            title: 'Vous êtes sûr?',
            text: 'Vous ne pouvez pas récupérer ça!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Oui, supprimez-le!',
            cancelButtonText: 'Non, garde-le'
          }).then((result) => {
            if (result.isConfirmed) {
                fetch(global.api+"/users/" + email, {
                method: 'DELETE',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            })
              Swal.fire(
                'Supprimé!',
                'Suppression Effectuée.',
                'success'
              )
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              Swal.fire(
                'Annulé',
                'Suppression Annulée',
                'error'
              )
            }
          })
    }

    receivedData() {
        axios
            .get(global.api+`/users`)
            .then(res => {
                const data = res.data;
                const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
                const postData = slice.filter((user) => {
                    if (this.state.search === "") {
                        return user;
                    } else if (user.role.toLowerCase().includes(this.state.search.toLowerCase()) || user.prenom.toLowerCase().includes(this.state.search.toLowerCase()) || user.nom.toLowerCase().includes(this.state.search.toLowerCase()) || user.email.toLowerCase().includes(this.state.search.toLowerCase())) {
                        return user;
                    }
                }).map(user => {
                    return (
                        <tr key={user._id}>
                            <td>{user.role}</td>
                            <td>{user.nom}</td>
                            <td>{user.prenom}</td>
                            <td>{user.email}</td>
                            <td>{user.telephone}</td>
                            <td>{user.age}</td>
                            <td>
                                {user.role === "RH" ? <div >
                                    <a onClick={() => { this.submitHandler(user.email) }} title="Delete" ><i className="fa fa-trash" aria-hidden="true"><i style={{ color: "white" }} >z</i></i></a>
                                    <a title="Update"  href={"/UpdateHR/" + user.email}><i className="fas fa-pencil-alt"><i style={{ color: "white" }} >z</i></i></a>
                                </div> : 
                                <div className="">
                                <a onClick={() => { this.submitHandler(user.email) }} title="Delete" ><i className="fa fa-trash" aria-hidden="true"><i style={{ color: "white" }} >z</i></i></a>
                                <a title="Update"  href={"/UpdateCondidat/" + user.email}><i className="fas fa-pencil-alt"><i style={{ color: "white" }} >z</i></i></a>
                                <a className="fas fa-share" style={{ color: "black" }} href={"/SendQuiz/" + user.email + "/" + user.prenom}></a>
                            </div>}
                            </td>
                        </tr>
                    ) 
                }
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
            <div className="others"  >
                <section className="contact-section pt-130">
                    <div className="container">
                        <div className="topleft">
                            <div className="col-md-12 ">
                                <div className="section-title text-center animate__animated animate__fadeInDown" >
                                    <p>List des utilisateurs</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
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
                                    <th>Rôle</th>
                                    <th>Nom</th>
                                    <th>Prénom </th>
                                    <th>Email</th>
                                    <th>Telephone</th>
                                    <th>Age</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.postData}
                            </tbody>
                        </table>
                    </div>
                    <div>
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