import React, { Component, useState, useEffect } from "react";
import { DataGrid } from '@material-ui/data-grid';
import emailjs, { send } from 'emailjs-com';
const SendQUIZ = (props) => {

    const columns = [
        { field: 'libelle', headerName: 'Libelle', width: 618 },
        { field: 'categorie', valueFormatter: ({ value }) => value.libelle, headerName: 'Categorie', width: 618 },
    ]

    const [templates, setTemplate] = useState([]);
    const [hasError, setErrors] = useState(false);
    const [categories, setCategorie] = useState([]);
    const [selectedItem, setSelectedItem] = useState("All");
    const [quizid, setQuizId] = useState([])

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

    function handleSelectChange(event) {
        setSelectedItem(event.target.value);
    }

    async function sendEmail(e) {
        e.preventDefault()
        emailjs.sendForm('gmail', 'template_dyh0t7j', e.target, 'user_m8QyJVfzo4XccAITEIlbI')
        .then((result) => {
          console.log(result.text);
        }, (error) => {
          console.log(error.text);
        });
    }

    return (
        <div className="others ">
            <form onSubmit={sendEmail}>
                <section className="contact-section pt-130">
                    <div className="container">
                        <div className="row g-4 align-items-center">
                            <div className="gf-field-wrapper gf-field-select gf-field-object col-auto" >
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
                            <div className="col-auto gf-field-string gf-field-fonction  " >
                                <label>
                                    <input class="form-control" type="hidden" name="message" value={quizid}

                                    />
                                </label>
                            </div>
                            <div className=" col-auto" >
                                <input className="btn btn-primary gf-submit-btn pixi-submit pixi-submit x" type="submit" value="Envoyer" />
                            </div>
                            <div className="col-auto gf-field-string gf-field-fonction  " >
                                <label>
                                    <input class="form-control" type="hidden" name="email" value={props.match.params.id}
                                    />
                                    <input class="form-control" type="hidden" name="to_name" value={props.match.params.prenom}
                                    />
                                    <input class="form-control" type="hidden" name="from_name" value="PIXIMIND"
                                    />
                                    <input class="form-control" type="hidden" name="subject" value="Quiz"
                                    />
                                </label>
                            </div>
                        </div>
                        <div>
                            <DataGrid  style={{ height: 400, width: '100%' }}
                                rows={templates.filter((template) => {
                                    if (template.categorie !== null && template.categorie !== undefined && template.categorie !== "") {
                                        if (selectedItem === "All") {

                                            return template;
                                        }
                                        else if (template.categorie.libelle.toLowerCase().includes(selectedItem.toLowerCase())) {
                                            return template;
                                        }
                                    }
                                })}
                                columns={columns}
                                checkboxSelection
                                onSelectionModelChange={itm => setQuizId([...quizid, "http://localhost:3001/QuizManager/" +itm+"/"+ props.match.params.id + "          "])}
                                enableCellSelect={true}
                            />
                        </div>
                    </div>
                </section>
            </form>
        </div>
    );
};
export default SendQUIZ;