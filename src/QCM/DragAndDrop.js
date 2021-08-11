import { Container, Flex, Heading, List, Stack } from "@chakra-ui/react";
import { useState } from "react";
import { useDrop } from "react-dnd";
import InsertQuestion from "./InsertQuestion";
import '../App.css';

import React, { useEffect } from "react";

function DragAndDrop(props) {

    const [players, setPlayer] = useState([]);
    const [hasError, setErrors] = useState(false);



    useEffect(() => {
        fetch("http://localhost:3000/questions")
            .then((data) => data.json())
            .then(res => setPlayer(res))
            .catch(err => setErrors(err));
    }, []);

    const [team, setTeam] = useState([]);

    const [{ isOver }, addToTeamRef] = useDrop({
        accept: "player",
        collect: (monitor) => ({ isOver: !!monitor.isOver() }),

    });

    const [{ isOver: isPlayerOver }, removeFromTeamRef] = useDrop({
        accept: "team",
        collect: (monitor) => ({ isOver: !!monitor.isOver() }),
    });

    const updatepush = (item) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
        };
        fetch("http://localhost:3000/templates/" + props.match.params.id + "/" + item._id, requestOptions)
            .then(response => response.json());
    }

    const updatepull = (item) => {
        const requestOptions = {
            method: 'Delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(item)
        };
        fetch("http://localhost:3000/templates/" + props.match.params.id + "/" + item._id, requestOptions)
            .then(response => response.json());
    }

    const movePlayerToTeam = (item) => {
        updatepush(item);
        setPlayer((prev) => prev.filter((_, i) => item.index !== i));
        setTeam((prev) => [...prev, item]);
    };
    const removePlayerFromTeam = (item) => {
        updatepull(item)
        setTeam((prev) => prev.filter((_, i) => item.index !== i));
        setPlayer((prev) => [...prev, item]);
    };

    useEffect(() => {
        fetch("http://localhost:3000/categories")
            .then((data) => data.json())
            .then((data) => setCategorie(data))
            .catch(err => setErrors(err));
    }, []);
    const [categories, setCategorie] = useState([]);
    const [selectedItem, setSelectedItem] = useState("All");

    function handleSelectChange(event) {
        setSelectedItem(event.target.value);
    }

    return (
        <Container maxW="unset" className="others">
            <Heading align="center" color="GrayText">
                Drag & Drop
            </Heading>
            <Flex justify="center" justify="space-evenly" height="90vh" align="center" >
                <Stack width="300px">
                    <Heading fontSize="3xl" color="green.150" textAlign="center">
                        Questions
                        <br></br>

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
                    </Heading>
                    <List
                        bgGradient={
                            isPlayerOver
                                ? "linear(to-b, teal.100, teal.200)"
                                : "linear(to-b, teal.300, teal.500)"
                        }
                        ref={removeFromTeamRef}
                        p="4"
                        minH="70vh"
                        boxShadow="xl"
                        borderRadius="md"
                    >
                        {players.filter((template) => {
                            if (selectedItem === "All" ) {
                                return template;
                            } else if ( template.categorie!==null) {
                                if(template.categorie.toLowerCase().includes(selectedItem.toLowerCase())){
                                    return template;
                                }
                            }
                        }).map((p, i) => (
                            <InsertQuestion
                                item={p}
                                key={i}
                                playerType="player"
                                onDropPlayer={movePlayerToTeam}
                                index={i}
                            />
                        ))}
                    </List>
                </Stack>
                <Stack width="300px">
                    <Heading fontSize="3xl" color="green.150" textAlign="center">
                        Template
                    </Heading>
                    <List
                        bgGradient={
                            isOver
                                ? "linear(to-b, teal.300, teal.500)"
                                : "linear(to-b, teal.100, teal.200)"
                        }
                        ref={addToTeamRef}
                        minH="70vh"
                        boxShadow="xl"
                        borderRadius="md"
                        p="4"
                    >
                        {team.map((p, i) => (
                            <InsertQuestion
                                item={p}
                                key={i}
                                index={i}
                                playerType="team"
                                onDropPlayer={removePlayerFromTeam}
                            />
                        ))}
                    </List>
                </Stack>
            </Flex>
        </Container>
    );
}

export default DragAndDrop;