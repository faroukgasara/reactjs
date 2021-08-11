import React, { Component } from "react";
import '../App.css';
import axios from "axios";
import ReactPaginate from "react-paginate";
class ListCondidat extends Component {
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
        if (window.confirm('Are You Sure')) {
            fetch("http://localhost:3000/users/" + email, {
                method: 'DELETE',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            })
        }
    }

    receivedData() {
        axios
            .get(`http://localhost:3000/users`)
            .then(res => {
                const data = res.data;
                const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
                const postData = slice.filter((user) => {
                    if (this.state.search === '') {
                        return user;
                    } else if (user.prenom.toLowerCase().includes(this.state.search.toLowerCase())) {
                        return user;
                    }
                }).map(user => {
                    return user.role === "Condidat" ? (
                        <tr key={user._id}>
                            <td>{user.role}</td>
                            <td>{user.nom}</td>
                            <td>{user.prenom}</td>
                            <td>{user.email}</td>
                            <td>{user.telephone}</td>
                            <td>{user.age}</td>
                            <td>{user.diplome}</td>
                            <td>{user.faculte}</td>
                            <td>
                                <div className="">
                                    <a onClick={() => { this.submitHandler(user.email) }} title="Delete" target="_blank"><i class="fa fa-trash" aria-hidden="true"><i style={{ color: "white" }} >z</i></i></a>
                                    <a title="Update" target="_blank" href={"/UpdateCondidat/" + user.email}><i class="fas fa-pencil-alt"><i style={{ color: "white" }} >z</i></i></a>
                                    <a className="fas fa-share" style={{ color: "black" }} href={"/SendQuiz/" + user.email + "/" + user.prenom}></a>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        <div>
                        </div>
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
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="section-title text-center animate__animated animate__fadeInDown" >
                                    <p>List des Candidats</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-auto gf-field-wrapper gf-field-string gf-field-fonction  "   >
                        <label>
                            <span>Recherche : </span>
                            <input class="form-control" type="text" name="search" placeholder="Recherche"
                                value={this.state.search}
                                onChange={((data) => { this.setState({ search: data.target.value }) })}
                            />
                        </label>
                    </div>
                    <div className="container">
                        <table className="col-md-11 offset-md-1 text-center aos-init aos-animate" className="content-table" >
                            <thead>
                                <tr>
                                    <th>Role</th>
                                    <th>Nom</th>
                                    <th>Prenom</th>
                                    <th>Email</th>
                                    <th>Telephone</th>
                                    <th>Age</th>
                                    <th>Diplome</th>
                                    <th>Faclute</th>
                                    <th>Action</th>
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
                    nextLabel={"Proch"}
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
export default ListCondidat;