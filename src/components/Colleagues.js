import React, { useState, useEffect } from "react";
import "./styles.css";
import { Input, Card } from "semantic-ui-react";
import axios from "axios";

import gitHub from "../images/github.png";
import linkedIn from "../images/linkedin.png";
import stackOverflow from "../images/stackoverflow.png";
import twitter from "../images/twitter.png";

const Colleagues = () => {
    const [colleagues, setColleagues] = useState([]);

    useEffect( () => {
        // fetch all colleagues by making API call
        axios.get('https://api.tretton37.com/ninjas')
            .then( res => {
                console.log(res.data)
                setColleagues(res.data)
            });
    }, []);

    const renderColleagues = () => (
        // render all colleagues as cards
        <Card.Group style={{marginTop: "2%"}}>
            { colleagues.map(colleague => (
                <Card className="card">
                    <Card.Content>
                        <div className="image-container">
                            <img src={colleague.imagePortraitUrl} className="image" alt="Colleague photograph" />
                        </div>
                        <div className="card-text">
                            <div>
                                { colleague.name }
                            </div>
                            <div>
                                Office: { colleague.office }
                            </div>
                        </div>
                        <div className="card-symbols">
                            { colleague.linkedIn &&
                                <a href={`https://linkedin.com${colleague.linkedIn}`} target="_blank" rel="noopener noreferrer">
                                    <img src={linkedIn} className="card-symbol" alt="LinkedIn" />
                                </a>
                            }
                            { colleague.gitHub &&
                                <a href={`https://github.com/${colleague.gitHub}`} target="_blank" rel="noopener noreferrer">
                                    <img src={gitHub} className="card-symbol" alt="GitHub" />
                                </a>
                            }
                            { colleague.twitter &&
                                <a href={`https://twitter.com/${colleague.twitter}`} target="_blank" rel="noopener noreferrer">
                                    <img src={twitter} className="card-symbol" alt="Twitter" />
                                </a>
                            }
                            { colleague.stackOverflow &&
                                <a href={`https://stackoverflow.com/users/${colleague.stackOverflow}`} target="_blank" rel="noopener noreferrer">
                                    <img src={stackOverflow} className="card-symbol" alt="StackOverflow" />
                                </a>
                            }
                        </div>
                    </Card.Content>
                </Card>
            ))}
        </Card.Group>
    );

    return (
        <div className="page-container">
            <div className="header">
                The fellowship of the tretton37
            </div>
            <Input icon='search' placeholder='Search name...' />
            { renderColleagues() }
        </div>
    );
};

export default Colleagues;