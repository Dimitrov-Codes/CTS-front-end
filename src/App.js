import React, {useEffect, useState} from 'react';
import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from "./store/auth-context";
import axios from "axios";

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		const storedUserLoggedInInformation = localStorage.getItem('isLoggedIn');

		if (storedUserLoggedInInformation === '1') {
			setIsLoggedIn(true);
		}
	}, []);

	const guestMode  = () => {
		window.sessionStorage.removeItem('id_token');
		localStorage.removeItem('id_token');
		setIsLoggedIn(true);
	}

	const loginHandler = (email, password) => {
		// We should of course check email and password
		// But it's just a demo anyway
		const clientId = '1c2a541b-e170-46d6-937c-223c553c1494';
		const clientSecret = 'c6L8Q~sRZUyuN254zroz02KYGIV1HOTrX93Bydg3'
		axios.post(`https://login.microsoftonline.com/bf58d208-4c98-44e6-9038-f51ff05cdc41/oauth2/v2.0/token
		?username=${email}&password=${password}&client_id=1c2a541b-e170-46d6-937c-223c553c1494
		&client_secret=c6L8Q~sRZUyuN254zroz02KYGIV1HOTrX93Bydg3&scope=openid&response_type=token&grant_type=client_credentials`)
			.then(res => {
			console.log(res);
			localStorage.setItem('isLoggedIn', '1');
			setIsLoggedIn(true);
		}).catch(err => {
			console.log(err);
		})

	};

	const logoutHandler = () => {
		localStorage.removeItem('isLoggedIn');
		sessionStorage.removeItem('id_token');
		setIsLoggedIn(false);
	};

	return (<React.Fragment>
			<AuthContext.Provider value={{
				isLoggedIn: isLoggedIn, onLogout: logoutHandler
			}}>
				<MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler}/>
				<main>
					{!isLoggedIn && <Login onLogin={loginHandler} continueAsGuest={guestMode}/>}
					{isLoggedIn && <Home/>}
				</main>
			</AuthContext.Provider>
		</React.Fragment>);
}

export default App;
