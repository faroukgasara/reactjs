
import { useState } from "react";
import ShowMoreText from 'react-show-more-text';
import '../App.css';


import React, { useEffect } from "react";
import Pagination from "../Quiz/Pagination";

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

    


    useEffect(() => {
        fetch("http://localhost:3000/templates")
            .then((data) => data.json())
            .then((data) => setTemplate(data))
            .catch(err => setErrors(err));
    }, []);

    useEffect(() => {
        fetch("http://localhost:3000/categories")
            .then((data) => data.json())
            .then((data) => setCategorie(data))
            .catch(err => setErrors(err));
    }, []);

    const [selectedItem, setSelectedItem] = useState("All");

    function handleSelectChange(event) {
        setSelectedItem(event.target.value);
    }

    const updatepull = (item,id) => {
        const requestOptions = {
            method: 'Delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
        };
        fetch("http://localhost:3000/templates/" + id + "/" + item._id, requestOptions)
            .then(response => response.json());
    }

    return (
        
        <div className="others " >
            <div className="others">
                <div className="row">
                    <div className="col-md-12">
                        <div className="section-title text-center animate__animated animate__fadeInDown">
                            <p>Templates </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="gf-field-wrapper gf-field-select gf-field-object  column" >
                <label>
                    <span>Categorie</span>
                    <select name="categorie" className="" id="dropdown" onChange={handleSelectChange}
                    >
                        <option value="All">All</option>
                        {categories.map(categorie => (

                            <option
                                key={categorie.libelle}
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
                            if (selectedItem === "All" ) {
                                return template;
                            } else if ( template.categorie!==null && template.categorie!==undefined && template.categorie!=="") {
                                if(template.categorie.libelle.toLowerCase().includes(selectedItem.toLowerCase())){
                                    return template;
                                }
                               
                            }
                        }).map((p, i) => {
                            return p.categorie !== null  && p.categorie!==undefined && p.categorie!=="" ? 
                            <li className="job-details">
                            <a className="job-title" href="">
                                Titre  : {p.libelle}
                            </a>
                            <div className="job-short-desription">
                                <a href="">
                                    Categorie  :
                                </a>
                                <span>{p.categorie === null || p.categorie === undefined || p.categorie === "" ?<div></div>: p.categorie.libelle}</span>
                            </div>
                            <ShowMoreText
                                lines={3}
                                more='Afficher Les Questions'
                                less='Cacher Les Questions'
                                className='content-css'
                                anchorClass='my-anchor-css-class'
                                expanded={false}
                                width={280}
                            >
                                {p.question.map((s, i) => (
                                    <a >
                                        {s.libelle}
                                        <a onClick={() => { updatepull(s,p._id) }} title="Delete" target="_blank"><i class="fa fa-trash" aria-hidden="true"><i style={{ color: "white" }} >z</i></i></a>
                                        <br></br>
                                    </a>
                                ))}
                            </ShowMoreText>
                            <br></br>
                            <a className="btn btn-primary btn-white" href={"/DragAndDrop/" + p._id}>
                                Modifier
                            </a>
                            <i style={{ color: "white" }} >z</i>
                            <a onClick={() => {
                                fetch("http://localhost:3000/templates/" + p._id, {
                                    method: 'DELETE',
                                    mode: 'cors',
                                    headers: {
                                        'Content-Type': 'application/json',
                                        'Accept': 'application/json'
                                    },
                                })
                                window.location.reload();
                            }} className="btn btn-primary btn-white" href="">
                                Supprimer
                            </a>

                        </li>:(<div></div>)
                        })}

                    </ul>

                </div>

                
                
            </div>
            <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={templates.length}
                    paginate={paginate}
                />
        </div>
    )
}

export default Templates;