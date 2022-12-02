import classes from 'App.module.scss';
import ProfilePage from 'views/ProfilePage';
import RegisterPage from 'views/RegisterPage';
import DataProvider from 'providers/DataProvider';
import {
	BrowserRouter as Router,
	Routes,
	Route,
} from 'react-router-dom';



const App: React.FC = () => {
	return (
		<Router>
			<div className={classes.wrapper}>
				<DataProvider>
				<Routes>
					<Route path='/' element={<ProfilePage />} />
					<Route path='/register' element={<RegisterPage />} />
				</Routes>
				</DataProvider>
			</div>
		</Router>
	);
};

export default App;
