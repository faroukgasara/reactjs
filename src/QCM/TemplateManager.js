import { Container, Flex, Heading, List, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { useDrop } from "react-dnd";
import InsertQuestion from "./InsertQuestion";
import '../App.css';

import React, { useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import Swal from "sweetalert2";

function TemplateManager(props) {

    const columns = [
        { field: 'libelle', headerName: 'Libelle', width: 968 },
        { field: 'categorie', headerName: 'categorie', width: 145 },
        { field: 'duree', headerName: 'duree', width: 123 },
    ]


    const [questions, setQuestions] = useState([]);
    const [hasError, setErrors] = useState(false);
    const [addquestions, setaddquestions] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3000/questions")
            .then((data) => data.json())
            .then((data) => setQuestions(data))
            .catch(err => setErrors(err));
    }, []);


    async function updatepush(e)  {
        e.preventDefault()
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(addquestions)
        };
        fetch("http://localhost:3000/templates/" + props.match.params.id, {
            method: 'put',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(addquestions)
        })
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Votre travail a été enregistré',
                showConfirmButton: false,
                timer: 1500
            })
    }

    return (
        <div className="others">
            <section className="contact-section pt-130">
                <div className="container">
                    <div className="topleft">
                        <div className="col-md-12">
                            <div className="section-title text-center animate__animated animate__fadeInDown">
                                <p>Ajouter des questions </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="contact-section pt-130">
                <form onSubmit={updatepush}>
                    <div className="top" >
                        <input className="btn btn-primary gf-submit-btn pixi-submit pixi-submit " type="submit" value="Confirmer" />
                    </div><br></br><br></br><br></br>
                    <div className="container">

                        <DataGrid style={{ height: 800, width: '100%' }}
                            rows={questions}
                            columns={columns}
                            enableCellSelect={true}
                            checkboxSelection
                            onSelectionModelChange={itm => setaddquestions(itm)}
                        />

                    </div>
                </form>
            </section>

        </div>
    );
}

export default TemplateManager;