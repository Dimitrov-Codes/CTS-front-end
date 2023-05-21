import React, {useState} from 'react';
import Card from '../UI/Card/Card';
import HomeClasses from './Home.module.css';
import Button from "../UI/Button/Button";
import classes from '../Login/Login.module.css'
import axios from "axios";

const Home = (props) => {
	const [serverResponse, setServerResponse] = useState("Server Response");
	const publicEndpoint = () => {
		axios.get("http://localhost:8080/api/auth/public")
			.then(response => {
				setServerResponse(response.data);
			})
			.catch(err => console.log(err))
	}
	const securedEndpoint = () => {
		axios.get("http://localhost:8080/api/auth/dev", {headers:
            {Authorization: "Bearer " + localStorage.getItem('id_token')}})
			.then(response => {
				setServerResponse(response.data);
			})
			.catch(err => setServerResponse("ERROR: 401 Unauthorized User"))
	}
	return (
		<Card className={HomeClasses.home}>
			<h1>{serverResponse}</h1>
			<div className={classes.actions}>
				<Button onClick={publicEndpoint}>Public Endpoint</Button>
				<Button onClick={securedEndpoint}>Secured Endpoint</Button>
			</div>
		</Card>

	);
};

export default Home;
