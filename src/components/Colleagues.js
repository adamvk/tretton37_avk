import React, { useState, useEffect } from "react";
import "./styles.css";
import { Input, Card, Dropdown, List, Image, Icon } from "semantic-ui-react";
import { Modal } from "react-bootstrap";
import axios from "axios";

import gitHub from "../images/github.png";
import linkedIn from "../images/linkedin.png";
import stackOverflow from "../images/stackoverflow.png";
import twitter from "../images/twitter.png";
import email from "../images/email.png";
import grid_active from "../images/grid_active.png";
import grid_inactive from "../images/grid_inactive.png";
import row_active from "../images/row_active.png";
import row_inactive from "../images/row_inactive.png";
import newNinja_photo from "../images/newninja.jpg";

const Colleagues = () => {
    const [colleagues, setColleagues] = useState([]);
    const [currentColleague, setCurrentColleague] = useState(0);
    const [filtered, setFiltered] = useState([]);
    const [search, setSearch] = useState("");
    const [office, setOffice] = useState("All offices");
    const [socialMedia, setSocialMedia] = useState("All social media");
    const [layout, setLayout] = useState("grid");
    const [showModal, setShowModal] = useState(false);
    const [sorting, setSorting] = useState("");
    const [sortedNames, setSortedNames] = useState([]);
    const [sortedOffices, setSortedOffices] = useState([]);

    useEffect( () => {
        // fetch all colleagues by making API call
        axios.get('https://api.tretton37.com/ninjas')
            .then( res => {
                addNewNinja(res.data);
                setColleagues(res.data);
                setFiltered(res.data);
                prepareSortedColleagues(res.data);
            });
    }, []);

    const addNewNinja = (colleagueList) => {
        const newNinja = {
            "name": "NEW AWESOME NINJA",
            "office": "Which office?",
            "imagePortraitUrl": {newNinja_photo}
        };
        colleagueList.push(newNinja);
    };

    const prepareSortedColleagues = (colleagueList) => {
        // preparing sorted arrays for possible sorting by user
        var tempSortedNames = [];
        var tempSortedOffices = [];
        colleagueList.forEach(colleague => {
            tempSortedNames.push(colleague.name);
            tempSortedOffices.push(colleague.office);
        });
        setSortedNames(tempSortedNames.sort());
        setSortedOffices(tempSortedOffices.sort());
        return [tempSortedNames, tempSortedOffices];
    }

    const filter = (newFilter, newValue) => {
        // filter colleagues on the provided filter
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
        let [tempSortedNames, tempSortedOffices] = prepareSortedColleagues(tempFiltered);
        if (sorting === "")
            setFiltered(tempFiltered);
        else
            applySortingToFiltered(tempFiltered, tempSortedNames, tempSortedOffices);
    };

    const handleSearch = (e) => {
        // filter colleagues by name
        setSearch(e.target.value);
        filter("name", e.target.value);
    };

    const handleOffice = (e, { value }) => {
        // filter colleagues by office
        setOffice(value);
        filter("office", value);
    };

    const handleSocialMedia = (e, { value }) => {
        // filter colleagues by social media
        setSocialMedia(value);
        filter("social media", value);
    };

    const handleSorting = (e, { value }) => {
        // sorting colleagues on name or office
        setSorting(value);
        let tempSorted = filtered;
        if (value === "name_atoz" || value === "name_ztoa") {
            tempSorted.sort((a, b) => {  
                return sortedNames.indexOf(a["name"]) - sortedNames.indexOf(b["name"]);
            });
        } else if (value === "office_atoz" || value === "office_ztoa") {
            tempSorted.sort((a, b) => {  
                return sortedOffices.indexOf(a["office"]) - sortedOffices.indexOf(b["office"]);
            });
        };
        if (value === "name_ztoa" || value === "office_ztoa")
            tempSorted.reverse();
        setFiltered(tempSorted);
    };

    const applySortingToFiltered = (tempSorted, tempSortedNames, tempSortedOffices) => {
        // apply sorting to filtered colleagues
        if (sorting === "name_atoz" || sorting === "name_ztoa") {
            tempSorted.sort((a, b) => {  
                return tempSortedNames.indexOf(a["name"]) - tempSortedNames.indexOf(b["name"]);
            });
        } else if (sorting === "office_atoz" || sorting === "office_ztoa") {
            tempSorted.sort((a, b) => {  
                return tempSortedOffices.indexOf(a["office"]) - tempSortedOffices.indexOf(b["office"]);
            });
        };
        if (sorting === "name_ztoa" || sorting === "office_ztoa")
            tempSorted.reverse();
        setFiltered(tempSorted);
    };

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

    const sortingList = [
        // list of the different sorting options
        {
            key: 'Name',
            text: 'Name',
            value: 'name_atoz',
            icon: 'sort alphabet ascending'
        },
        {
            key: 'Name',
            text: 'Name',
            value: 'name_ztoa',
            icon: 'sort alphabet descending'
        },
        {
            key: 'Office',
            text: 'Office',
            value: 'office_atoz',
            icon: 'sort alphabet ascending'
        },
        {
            key: 'Office',
            text: 'Office',
            value: 'office_ztoa',
            icon: 'sort alphabet descending'
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
            <div className="dropdown-filters">
                <div className="sorting-dropdown">
                    <Icon name='sort' />
                    <Dropdown
                        placeholder='Sort by...'
                        floating
                        labeled
                        options={sortingList}
                        onChange={handleSorting}
                        value={sorting}
                        icon={null}
                    />
                </div>
                <div className="change-layout">
                    { layout==="grid" ?
                        <>
                            <img src={grid_active} className="change-layout-icon" alt="Grid layout" />
                            <img src={row_inactive} className="change-layout-icon" alt="Row layout" onClick={() => setLayout("row")} />
                        </>
                    :
                        <>
                            <img src={grid_inactive} className="change-layout-icon" alt="Grid layout" onClick={() => setLayout("grid")} />
                            <img src={row_active} className="change-layout-icon" alt="Row layout" />
                        </>
                    }
                </div>
            </div>
        </>
    );

    const clickCard = (index) => {
        // opening the modal when clicking a card
        setCurrentColleague(index);
        setShowModal(true);
    }

    const renderSocialMediaSymbols = (colleague, view) => (
        // render the symbols for the colleague's social media
        <div className={`${view}-symbols`}>
            { colleague.linkedIn &&
                <a href={`https://linkedin.com${colleague.linkedIn}`} target="_blank" rel="noopener noreferrer">
                    <img src={linkedIn} className={`${view}-symbol`} alt="LinkedIn" />
                </a>
            }
            { colleague.gitHub &&
                <a href={`https://github.com/${colleague.gitHub}`} target="_blank" rel="noopener noreferrer">
                    <img src={gitHub} className={`${view}-symbol`} alt="GitHub" />
                </a>
            }
            { colleague.twitter &&
                <a href={`https://twitter.com/${colleague.twitter}`} target="_blank" rel="noopener noreferrer">
                    <img src={twitter} className={`${view}-symbol`} alt="Twitter" />
                </a>
            }
            { colleague.stackOverflow &&
                <a href={`https://stackoverflow.com/users/${colleague.stackOverflow}`} target="_blank" rel="noopener noreferrer">
                    <img src={stackOverflow} className={`${view}-symbol`} alt="StackOverflow" />
                </a>
            }
            { (view === "modal" && colleague.email) &&
                <a href={`mailto:${colleague.email}`} target="_blank" rel="noopener noreferrer">
                    <img src={email} className={`${view}-symbol`} alt="Email" />
                </a>
            }
        </div>
    );

    const renderColleagues = () => (
        // render all colleagues
        layout === "grid" ?
            <Card.Group style={{marginTop: "1%"}}>
                { filtered.map((colleague, index) => (
                    <Card
                        className="card"
                        onClick={() => colleague.name.startsWith("NEW") ? window.open("https://tretton37.com/join") : clickCard(index)}
                    >
                        <Card.Content>
                            <div className="image-container">
                                <img 
                                    src={colleague.name.startsWith("NEW") ? newNinja_photo : colleague.imagePortraitUrl} 
                                    className="image" 
                                    alt="Colleague photograph" 
                                />
                            </div>
                            <div className="card-text">
                                <div>
                                    { colleague.name }
                                </div>
                                <div>
                                    Office: { colleague.office }
                                </div>
                            </div>
                            { renderSocialMediaSymbols(colleague, "card") }
                        </Card.Content>
                    </Card>
                ))}
            </Card.Group>
        :
            <List style={{marginTop: "2%"}} selection verticalAlign='middle'>
                { filtered.map((colleague, index) => (
                    <List.Item
                        onClick={() => clickCard(index)}
                    >
                        <Image 
                            avatar 
                            src={colleague.name.startsWith("NEW") ? newNinja_photo : colleague.imagePortraitUrl} 
                            className="image-small" 
                            alt="Colleague photograph" 
                        />
                        <List.Content>
                            <div className="row-name">{ colleague.name }</div>
                            <div className="row-office">Office: { colleague.office }</div>
                            <List.Description>
                                { renderSocialMediaSymbols(colleague, "row") }
                            </List.Description>
                        </List.Content>
                    </List.Item>
                ))}
            </List>
    );

    const colleagueInformation = (
        // render colleague description in the modal
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
                    { renderSocialMediaSymbols(filtered[currentColleague], "modal") }
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
        <div className="page-container">
            <div className="header">
                The fellowship of the tretton37
            </div>
            { renderFilters() }
            { renderColleagues() }
            { colleagueInformation }
        </div>
    );
};

export default Colleagues;