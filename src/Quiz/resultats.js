import axios from "axios";
import React, { Component } from "react";
import Header from "../base/Header";
import Alert from 'react-popup-alert'

import '../App.css';
import Sidebar from "../base/Sidebar";
import { Router } from "react-router-dom";
import { TabItem } from "react-foundation";
import Modal from "./Modal";
import ReactPaginate from 'react-paginate';

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

    receivedData() {
        axios
            .get(`http://localhost:3000/resultats`)
            .then(res => {

                const data = res.data;
                const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
                const postData = slice.filter((user) => {
                    if (this.state.search === '') {
                        return user;
                    } else if (user.prenom.toLowerCase().includes(this.state.search.toLowerCase())) {
                        return user;
                    }
                }).map(res => {
                    return res.template !== null && res.user !== null ? 
                    <tr key={res._id}>
                        <td>{res.template.libelle}</td>
                        <td>{res.user.nom}</td>
                        <td>{res.user.prenom}</td>
                        <td>{res.user.email}</td>
                        <td>
                            <div className="" >
                                <button className="btn btn-success " type="button" onClick={() => { this.handlemodal(res.resultat) }} ><i className="fas fa-eye" aria-hidden="true" /></button>
                            </div>
                        </td>
                        <td>
                            <div className="">
                                <a onClick={() => { this.submitHandler(res._id) }} title="Delete" target="_blank"><i class="fa fa-trash" aria-hidden="true"></i></a>
                            </div>

                        </td>
                    </tr>:(<div></div>)

                })

                this.setState({
                    pageCount: Math.ceil(data.length / this.state.perPage),

                    postData,
                })
            });
    }





    async submitHandler(id) {
        if (window.confirm('Are You Sure')) {
            fetch("http://localhost:3000/resultats/" + id, {
                method: 'DELETE',
                mode: 'cors',
                headers: {

                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            })
        }
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
                    <div class="container">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="section-title text-center animate__animated animate__fadeInDown" >
                                    <p>Résultats</p>
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
                                    <th>Template</th>
                                    <th>Nom</th>
                                    <th>Prenom</th>
                                    <th>Email</th>
                                    <th>Resultat</th>
                                    <th>Action</th>

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
export default resultats;