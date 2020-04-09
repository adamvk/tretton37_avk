import React, { useState, useEffect } from "react";
import "./styles.css";
import { Input, Card } from "semantic-ui-react";
import axios from "axios";

const Colleagues = () => {
    const [colleagues, setColleagues] = useState([]);

    useEffect( () => {
        axios.get('https://api.tretton37.com/ninjas')
            .then( res => {
                console.log(res.data)
                setColleagues(res.data)
            });
    }, []);

    const renderColleagues = () => (
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