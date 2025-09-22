import {useEffect, useRef, useState} from "react";
import './App.css'
import styles from './styles/index.module.css';
import Introduction from "./components/Introduction.jsx";
import Card from "./components/Card.jsx";
import Navbar from "./components/Navbar.jsx";
import Wrapper from "./components/Wrapper.jsx"
import ProfileForm from "./components/ProfileForm.jsx";
import image1 from "./assets/guy.jpeg"
import image2 from "./assets/person2.jpg"
import image3 from "./assets/person3.jpg"

// /* TODO    Create a Add Profile form that includes:
//            Create a new section on the page:
//            Render cards with fetched data:
//            Add filters with a title select that is rendered with fetched data and controls the display of the cards
//             Available APIs:
//             Get titles:
//             https://web.ics.purdue.edu/~zong6/profile-app/get-titles.php
//             Get all data:
//            https://web.ics.purdue.edu/~zong6/profile-app/fetch-data.php
//            Get filtered data:
//            https://web.ics.purdue.edu/~zong6/profile-app/fetch-data-with-
//             filter.php?title=${title}&name=${search}&page=${page}&limit=10
//            Fetching and displaying data in the Profile app
//           •Displays of error and success messages*/

function App() {
/*    const profiles = [
        {name: "John Doe", title: "Software Engineer", email: "john@example.com", img: image1},
        {name: "Jane Doe", title: "Construction Manager", email: "jane@example.com", img: image2},
        {name: "Joe Doe", title: "Wedding planner", email: "joe@example.com", img: image3}
    ]*/
    // Get all unique titles
    // TODO: figure out a way to avoid recalculating this constantly on rerenders
/*    let titleArray = profiles.map(({title}) => (title));
    let titleSet = new Set(titleArray);
    titleArray = [...titleSet]*/

    const [textInput, setTextInput] = useState("");
    const [job, setJob] = useState('None Chosen');
    const [modeToggle, setModeToggle] = useState(true);
    const [formState, setFormState] = useState(0);
    const [profiles, setProfiles] = useState([]);
    const [loading, setLoading] = useState(true);


    async function fetchData(){
        const response = await fetch("https://web.ics.purdue.edu/~jshabel/fetch-data.php");
        const result = await response.json();
        setProfiles(result);
        if (loading === true){
            setLoading(false);
        }
    }

    useEffect( () => {

        fetchData();
    }, [formState, loading]);

    function handleFormState() {
        setFormState(formState + 1);
    }

/*    const handleChange = (event) => {
        setJob(event.target.value);
    };*/

    const appModeToggleFunction = () => {
        setModeToggle(prevModeToggle => !prevModeToggle);
    }

    return (
        <>
            <Navbar modeToggle={modeToggle} setModeToggleFunction={appModeToggleFunction}/>
            <div className={modeToggle ? styles.appBodyDark : styles.appBodyLight}>
                <h1>My React App</h1>
                <Wrapper children={<Introduction/>}/>
                <ProfileForm handleFormState={handleFormState}></ProfileForm>
                {/*<label>Choose Job:</label>
                <select value={job} onChange={handleChange}>
                    <option value="None Chosen">None Chosen</option>
                    {
                        titleArray.map((title, i) => (
                            <option key={i} value={title}>{title}</option>
                        ))
                    }
                </select>*/}
                <label>What is their name?</label>
                <input
                    type="text"
                    value={textInput}
                    onChange={(e) => setTextInput(e.target.value)}
                />
                <button onClick={
                    () => {
                        setTextInput("");
                        setJob("None Chosen");
                    }
                }>Reset
                </button>
                <br/>
                <div className={modeToggle ? styles.darkCardDisplayArea : styles.lightCardDisplayArea}>
                    {
                        profiles.map((profile) => (
                            <Card key={profile.email} name={profile.name} title={profile.title} email={profile.email}
                                  img={profile.image_url} textFilter={textInput} job={job}/>
                        ))

                    }
                </div>
                <footer></footer>
            </div>
        </>
    )
}

export default App

/*
                        {

profiles.map((profile) => (
    <Card key={profile.email} name={profile.name} title={profile.title} email={profile.email}
          img={profile.img} textFilter={textInput} job={job}/>
))

                    }
*/

