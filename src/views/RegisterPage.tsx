import classes from 'views/RegisterPage.module.scss';
import { Checkbox, CheckboxInvalid } from 'components/Icons';
import { useState, useContext } from 'react';
import { ProfileDataContext } from 'providers/DataProvider';

const defualtFormValue = {
	login: '',
	password: '',
	email: '',
	phone: '',
};

const defaultErrorValue = {
	email: false,
	phone: false,
	checkbox: false,
};

const digitOnly = /^\d+$/;

const RegisterPage: React.FC = () => {
	const [formValue, setFormValue] = useState(defualtFormValue);
	const [checkboxState, setCheckboxState] = useState(false);
	const [error, setError] = useState(defaultErrorValue);

	const {
		profile: { characterName, created, vehicles },
	} = useContext(ProfileDataContext);

	const star_wars_data = JSON.stringify([characterName, created, vehicles]);

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		if (
			e.target.id === 'phone' &&
			(!digitOnly.test(e.target.value) || e.target.value['length'] === 10)
		)
			return;
		if (e.target.id === 'email' && e.target.value === '@') return;
		setFormValue({
			...formValue,
			[e.target.id]: e.target.value,
		});
	};

	const handleCheckbox = () => {
		setCheckboxState((prev) => !prev);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (
			!formValue.email.includes('@') ||
			formValue.phone.length < 9 ||
			!checkboxState
		)
			setError({
				email: !formValue.email.includes('@'),
				phone: formValue.phone.length < 9,
				checkbox: !checkboxState,
			});
		else {
			setError(defaultErrorValue);
			fetch('https://example', {
				method: 'POST',
				body: JSON.stringify({ formValue, star_wars_data }),
			});
		}
	};

	return (
		<div className={classes.wrapper}>
			<h1>Formularz rejestracyjny</h1>

			<form onSubmit={handleSubmit}>
				<label htmlFor='login' className={classes.labelLogin}>
					Login:
				</label>
				<input
					id='login'
					type='text'
					value={formValue.login}
					onChange={handleOnChange}
				/>
				<label htmlFor='password' className={classes.labelPassword}>
					Hasło:
				</label>
				<input
					id='password'
					type='password'
					value={formValue.password}
					onChange={handleOnChange}
				/>

				<label
					htmlFor='email'
					className={`${classes.labelEmail} ${
						error.email ? classes.invalid : ''
					}`}
				>
					E-mail:
				</label>
				<input
					id='email'
					type='email'
					value={formValue.email}
					onChange={handleOnChange}
				/>

				<label
					htmlFor='phone'
					className={`${classes.labelPhone} ${
						error.phone ? classes.invalid : ''
					}`}
				>
					Numer telefonu:
				</label>
				<input
					id='phone'
					type='tel'
					value={formValue.phone}
					onChange={handleOnChange}
				/>

				<div
					className={`${classes.checkboxContainer} ${
						error.checkbox ? classes.invalid : ''
					}`}
				>
					<label>
						<input type='checkbox' id='checkbox' onClick={handleCheckbox} />
						<span className={classes.altCheckbox}>
							{error.checkbox ? <CheckboxInvalid /> : <Checkbox />}
						</span>
						<p>Akceptuję Regulamin</p>
					</label>
				</div>
				<button type='submit' className={classes.submitBtn}>
					<p>zapisz</p>
				</button>
			</form>
		</div>
	);
};

export default RegisterPage;
