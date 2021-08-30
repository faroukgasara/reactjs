import { useState } from "react";
import ShowMoreText from 'react-show-more-text';
import '../App.css';
import React, { useEffect } from "react";
import Pagination from "../Quiz/Pagination";
import Swal from "sweetalert2";

function Templates() {

    const [templates, setTemplate] = useState([]);
    const [categories, setCategorie] = useState([]);
    const [hasError, setErrors] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = templates.slice(indexOfFirstPost, indexOfLastPost);
    const paginate = pageNumber => setCurrentPage(pageNumber);
    const [selectedItem, setSelectedItem] = useState("All");

    useEffect(() => {
        fetch(global.api+"/templates")
            .then((data) => data.json())
            .then((data) => setTemplate(data))
            .catch(err => setErrors(err));
    });

    useEffect(() => {
        fetch(global.api+"/categories")
            .then((data) => data.json())
            .then((data) => setCategorie(data))
            .catch(err => setErrors(err));
    }, []);

    function handleSelectChange(event) {
        setSelectedItem(event.target.value);
    }

    const updatepull = (item, id) => {
        const requestOptions = {
            method: 'Delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
        };
        Swal.fire({
            title: 'Vous êtes sûr?',
            text: 'Vous ne pouvez pas récupérer ça!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Oui, supprimez-le!',
            cancelButtonText: 'Non, garde-le'
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(global.api+"/templates/" + id + "/" + item._id, requestOptions);
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

    return (
        <div className="others " >
            <section className="contact-section pt-130">
                <div className="container">
                    <div className="topleft">
                        <div className="col-md-12">
                            <div className="section-title text-center animate__animated animate__fadeInDown">
                                <p>Templates </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="contact-section pt-130">
                <div className="gf-field-wrapper gf-field-select gf-field-object  column" >
                    <label>
                        <span>Catégories</span>
                        <select name="categorie"  id="dropdown" onChange={handleSelectChange}
                        >
                            <option value="All">All</option>
                            {categories.map(categorie => (

                                <option
                                    key={categorie._id}
                                    value={categorie.libelle}
                                >
                                    {categorie.libelle}
                                </option>
                            ))}
                        </select>
                    </label>
                    <div className="gf-field-validation-message" data-validate-for="object"></div>
                </div>
                <div className="container">
                    <div className="col-md-12">
                        <ul className="record-list list-jobs">
                            {currentPosts.filter((template) => {
                                if (selectedItem === "All") {
                                    return template;
                                } else if (template.categorie !== null && template.categorie !== undefined && template.categorie !== "") {
                                    if (template.categorie.libelle.toLowerCase().includes(selectedItem.toLowerCase())) {
                                        return template;
                                    }
                                }
                            }).map((p, i) => {
                                return p.categorie !== null && p.categorie !== undefined && p.categorie !== "" ?
                                    <li className="job-details" key={p._id}>
                                        <a className="job-title" >
                                            Titre  : {p.libelle}
                                        </a>
                                        <div className="job-short-desription">
                                            <a >
                                                Catégorie  :
                                            </a>
                                            <span>{p.categorie === null || p.categorie === undefined || p.categorie === "" ? <div></div> : p.categorie.libelle}</span>
                                        </div>
                                        <ShowMoreText
                                            lines={1}
                                            more={<i className="fas fa-chevron-circle-down"></i>}
                                            less={<i className="fas fa-chevron-circle-up"></i>}
                                            className='content-css'
                                            anchorClass='my-anchor-css-class'
                                            expanded={false}
                                            width={280}
                                        >
                                            <div>List des Questions</div><br></br>
                                            <table className="col-md-11 offset-md-1 text-center aos-init aos-animate" className="content-table">
                                                <thead>
                                                    <tr>
                                                        <th>Questions</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                {p.question.map((s, i) => (
                                                    <tbody key={s._id}>
                                                        <tr>
                                                            <td>{s.libelle}</td>
                                                            <td><a onClick={() => { updatepull(s, p._id) }} title="Delete"><i className="fa fa-trash" aria-hidden="true"><i style={{ color: "white" }} >z</i></i></a></td>
                                                        </tr>
                                                    </tbody>
                                                ))}
                                            </table>
                                        </ShowMoreText>
                                        <br></br>
                                        <a className="btn btn-primary btn-white" href={"/TemplateManager/" + p._id}>
                                            Modifier
                                        </a>
                                        <i style={{ color: "white" }} >z</i>
                                        <a onClick={() => {
                                            fetch(global.api+"/templates/" + p._id, {
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
                                        }} className="btn btn-primary btn-white" >
                                            Supprimer
                                        </a>

                                    </li> : (<div></div>)
                            })}
                        </ul>
                    </div>
                </div>
                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={templates.length}
                    paginate={paginate}
                />
            </section>
        </div>
    )
}

export default Templates;
