import { useState, useEffect } from 'react';
import { createContext } from 'react';

interface DataProviderProps {
	children: JSX.Element;
}

const defaultProfile = {
	name: 'Loading',
	age: 0,
	eyeColor: '',
	created: '',
	vehicles: [''],
};

export const ProfileDataContext = createContext({
	profile: {
		name: '',
		age: 0,
		eyeColor: '',
		created: '',
		vehicles: [''],
	},
	incrementEndpointCounter: () => {},
});

const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
	const [endpointCounter, setEndpointCounter] = useState(1);
	const [profile, setProfile] = useState(defaultProfile);
	const API_URL = `https://swapi.py4e.com/api/people/${endpointCounter}/`;

	const incrementEndpointCounter = () => {
		if (endpointCounter === 16) return;
		setEndpointCounter((prev) => prev + 1);
		setProfile(defaultProfile);
	};

	const handleAge = (age: string): any => {
		if (age === 'unknown') {
			return age;
		} else {
			return parseInt(age);
		}
	};

	useEffect(() => {
		fetch(API_URL)
			.then((response) => response.json())
			.then(({ name, birth_year, eye_color, created, vehicles }) =>
				setProfile({
					...profile,
					name,
					age: handleAge(birth_year),
					eyeColor: eye_color,
					created,
					vehicles,
				})
			);
	}, [endpointCounter]);

	return (
		<ProfileDataContext.Provider
			value={{
				profile,
				incrementEndpointCounter,
			}}
		>
			{children}
		</ProfileDataContext.Provider>
	);
};

export default DataProvider;
