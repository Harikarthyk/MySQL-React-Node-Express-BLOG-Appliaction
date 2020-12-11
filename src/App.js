import "./App.css";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import Navbar from "./Components/Navbar";
import Login from "./Components/Login";
import CreateAccount from "./Components/CreateAccount";
import Home from "./Components/Home";
import Addpost from "./Components/Addpost";
import {FaPlusCircle} from "react-icons/fa";
import Viewblog from "./Components/Viewblog";
import UserContext from "./UserContext";
import {useState} from "react";
import Favourite from "./Components/Favourite";
import User from "./Components/User";
import Footer from "./Components/Footer";

function App() {
	const [stateUser, setStateUser] = useState(false);
	return (
		<div className='App'>
			<UserContext.Provider value={{stateUser, setStateUser}}>
				<BrowserRouter>
					<Navbar />

					<Switch>
						<div className='App__body'>
							<Route exact path='/' component={Home} />
							<Route exact path='/login' component={Login} />
							<Route exact path='/createAccount' component={CreateAccount} />
							<Route exact path='/addPost' component={Addpost} />
							<Route exact path='/view/blog/*' component={Viewblog} />
							<Route exact path='/favouirtes' component={Favourite} />
							<Route exact path='/user' component={User} />
							<Link to='/addPost' className='home__add'>
								<FaPlusCircle />
							</Link>
						</div>
					</Switch>
					<Footer />
				</BrowserRouter>
			</UserContext.Provider>
		</div>
	);
}

export default App;
