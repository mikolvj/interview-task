import { useState, useEffect } from 'react';
import { createContext } from 'react';

interface DataProviderProps {
	children: JSX.Element;
}

const defaultProfile = {
	characterName: 'Name',
	age: '',
	eyeColor: '',
	created: '',
	vehicles: [''],
};

export const ProfileDataContext = createContext({
	profile: defaultProfile,
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

	const ageToNumber = (age: string): string => {
		if (age === 'unknown') {
			return age;
		} else {
			return age.replace(/\D/g, '');
		}
	};

	useEffect(() => {
		fetch(API_URL)
			.then((response) => response.json())
			.then(({ name, birth_year, eye_color, created, vehicles }) =>
				setProfile({
					...profile,
					characterName: name,
					age: ageToNumber(birth_year),
					eyeColor: eye_color,
					created,
					vehicles,
				})
			)
			.catch((err) => console.log(err));
		// eslint-disable-next-line
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
