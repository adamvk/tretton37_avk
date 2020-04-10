import React, { useState, useEffect } from "react";
import "./styles.css";
import { Input, Card, Dropdown } from "semantic-ui-react";
import { Modal } from "react-bootstrap";
import axios from "axios";

import gitHub from "../images/github.png";
import linkedIn from "../images/linkedin.png";
import stackOverflow from "../images/stackoverflow.png";
import twitter from "../images/twitter.png";

const Colleagues = () => {
    const [colleagues, setColleagues] = useState([]);
    const [currentColleague, setCurrentColleague] = useState(0);
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState("");
    const [office, setOffice] = useState("All offices");
    const [socialMedia, setSocialMedia] = useState("All social media");
    const [showModal, setShowModal] = useState(false);

    useEffect( () => {
        // fetch all colleagues by making API call
        axios.get('https://api.tretton37.com/ninjas')
            .then( res => {
                setColleagues(res.data);
                setFiltered(res.data);
            });
    }, []);

    const filter = (newFilter, newValue) => {
        // filter colleagues on provided filters
        let filterName = search;
        let filterOffice = office;
        let filterSocialMedia = socialMedia;
        if (newFilter === "name")
            filterName = newValue;
        else if (newFilter === "office")
            filterOffice = newValue;
        else if (newFilter === "social media")
            filterSocialMedia = newValue;
        let tempFiltered = colleagues.filter(colleague =>
            colleague.name.toLowerCase().includes(filterName.toLowerCase())
        );
        if (filterOffice !== "All offices")
            tempFiltered = tempFiltered.filter(colleague =>
                colleague.office === filterOffice
            );
        if (filterSocialMedia !== "All social media")
            tempFiltered = tempFiltered.filter(colleague =>
                colleague[`${filterSocialMedia}`]
            );
        setFiltered(tempFiltered);
    };

    const handleSearch = (e) => {
        // filter colleagues by name
        setSearch(e.target.value);
        filter("name", e.target.value);
    };

    const handleOffice = (e, { value }) => {
        setOffice(value);
        filter("office", value);
    }

    const handleSocialMedia = (e, { value }) => {
        setSocialMedia(value);
        filter("social media", value);
    }

    const officeList = [
        // list of offices for filtering
        {
            key: 'All offices',
            text: 'All offices',
            value: 'All offices'
        },
        {
            key: 'Lund',
            text: 'Lund',
            value: 'Lund'
        },
        {
            key: 'Helsingborg',
            text: 'Helsingborg',
            value: 'Helsingborg'
        },
        {
            key: 'Stockholm',
            text: 'Stockholm',
            value: 'Stockholm'
        },
        {
            key: 'Borlänge',
            text: 'Borlänge',
            value: 'Borlänge'
        },
        {
            key: 'Ljubljana',
            text: 'Ljubljana',
            value: 'Ljubljana'
        }
    ];

    const socialMediaList = [
        // list of social media platforms for filtering
        {
            key: 'All social media',
            text: 'All social media',
            value: 'All social media'
        },
        {
            key: 'LinkedIn',
            text: 'LinkedIn',
            value: 'linkedIn',
            image: { avatar: true, src: linkedIn }
        },
        {
            key: 'GitHub',
            text: 'GitHub',
            value: 'gitHub',
            image: { avatar: true, src: gitHub }
        },
        {
            key: 'Twitter',
            text: 'Twitter',
            value: 'twitter',
            image: { avatar: true, src: twitter }
        },
        {
            key: 'Stack Overflow',
            text: 'Stack Overflow',
            value: 'stackOverflow',
            image: { avatar: true, src: stackOverflow }
        },
    ];

    const renderFilters = () => (
        // render the different filter options
        <>
            <Input className="text" icon='search' placeholder='Search name...' value={search} onChange={handleSearch} />
            <div className="dropdown-filters">
                <Dropdown
                    placeholder='All offices'
                    fluid
                    selection
                    options={officeList}
                    onChange={handleOffice}
                    value={office}
                    style={{marginRight: "10px"}}
                />
                <Dropdown
                    placeholder='All social media'
                    fluid
                    selection
                    options={socialMediaList}
                    onChange={handleSocialMedia}
                    value={socialMedia}
                />
            </div>
        </>
    );

    const clickCard = (index) => {
        setCurrentColleague(index);
        setShowModal(true);
    }

    const renderColleagues = () => (
        // render all colleagues as cards
        <Card.Group style={{marginTop: "2%"}}>
            { filtered.map((colleague, index) => (
                <Card
                    className="card"
                    onClick={event => {event.preventDefault(); clickCard(index)}}
                >
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

    const colleagueInformation = (
        (filtered && filtered.length > 0) &&
        <Modal
            show={showModal}
            className="modal"
            onHide={() => setShowModal(false)}
            onClick={() => setShowModal(false)}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <div className="modal-text">
                <div className="colleague-header">
                    { filtered[currentColleague].name }
                </div>
                <div className="modal-symbols">
                    { filtered[currentColleague].linkedIn &&
                        <a href={`https://linkedin.com${filtered[currentColleague].linkedIn}`} target="_blank" rel="noopener noreferrer">
                            <img src={linkedIn} className="modal-symbol" alt="LinkedIn" />
                        </a>
                    }
                    { filtered[currentColleague].gitHub &&
                        <a href={`https://github.com/${filtered[currentColleague].gitHub}`} target="_blank" rel="noopener noreferrer">
                            <img src={gitHub} className="modal-symbol" alt="GitHub" />
                        </a>
                    }
                    { filtered[currentColleague].twitter &&
                        <a href={`https://twitter.com/${filtered[currentColleague].twitter}`} target="_blank" rel="noopener noreferrer">
                            <img src={twitter} className="modal-symbol" alt="Twitter" />
                        </a>
                    }
                    { filtered[currentColleague].stackOverflow &&
                        <a href={`https://stackoverflow.com/users/${filtered[currentColleague].stackOverflow}`} target="_blank" rel="noopener noreferrer">
                            <img src={stackOverflow} className="modal-symbol" alt="StackOverflow" />
                        </a>
                    }
                </div>
                <div 
                    className="colleague-text" 
                    dangerouslySetInnerHTML={{
                        __html: filtered[currentColleague].mainText
                    }}
                />
            </div>
            <div className="modal-photo">
                <img src={filtered[currentColleague].imageBodyUrl} alt="Large colleague photograph" />
            </div>
        </Modal>
    );

    return (
        <>
            <div className="page-container">
                <div className="header">
                    The fellowship of the tretton37
                </div>
                { renderFilters() }
                { renderColleagues() }
                { colleagueInformation }
            </div>
        </>
    );
};

export default Colleagues;