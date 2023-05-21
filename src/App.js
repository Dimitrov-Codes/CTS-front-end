import React, {useEffect, useState} from 'react';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from "./store/auth-context";
import axios from "axios";
import CustomToken from "./components/CustomToken/CustomToken";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [token, setToken] = useState("");
	const [customTokenMode, setCustomTokenMode] = useState(false);
	useEffect(() => {
		const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

		if (storedUserLoggedInInformation === '1') {
			setIsLoggedIn(true);
		}
	}, []);
	const customToken = () => {
		localStorage.setItem('id_token', token)
		setIsLoggedIn(true);
		setCustomTokenMode(false);
		localStorage.setItem('isLoggedIn', '1');
	}
	const guestMode = () => {
		localStorage.removeItem('id_token');
		setIsLoggedIn(true);
	}

	const loginHandler = (email, password) => {

		axios.post(`http://localhost:8080/api/auth/login`, {
			"username": email,
			"password": password
		})
			.then(res => {
				console.log(res.data);
				localStorage.setItem("id_token", res.data)
				localStorage.setItem('isLoggedIn', '1');
				setIsLoggedIn(true);
			}).catch(err => {
			console.log(err);
		})

	};

	const logoutHandler = () => {
		localStorage.removeItem('isLoggedIn');
		localStorage.removeItem('id_token');
		setIsLoggedIn(false);
	};

	return (<React.Fragment>
		<AuthContext.Provider value={{
			isLoggedIn: isLoggedIn, onLogout: logoutHandler
		}}>
			<MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler}/>
			<main>
				{!customTokenMode && !isLoggedIn && <Login onLogin={loginHandler} continueAsGuest={guestMode} setCustomTokenMode={setCustomTokenMode}/>}
				{!customTokenMode && isLoggedIn && <Home/>}
				{customTokenMode && <CustomToken loginWithCustomToken={customToken} setToken={setToken}
															goBack={() => setCustomTokenMode(false)}
				/>}
				{}
			</main>
		</AuthContext.Provider>
	</React.Fragment>);
}

export default App;
