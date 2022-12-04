import classes from 'views/RegisterPage.module.scss';
import { Checkbox, CheckboxInvalid } from 'components/Icons';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { ProfileDataContext } from 'providers/DataProvider';

interface Profile {
	login: string;
	password: string;
	email: string;
	phone: string;
	checkbox: boolean;
}

const isValidEmail = (email: string) =>
	// eslint-disable-next-line no-useless-escape
	/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
		email
	);

const RegisterPage: React.FC = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Profile>();

	const {
		profile: { characterName, created, vehicles },
	} = useContext(ProfileDataContext);

	const star_wars_data = JSON.stringify([characterName, created, vehicles]);

	const onSubmit = handleSubmit(({ login, password, phone, email }) => {
		fetch('https://example', {
			method: 'POST',
			body: JSON.stringify({ login, password, phone, email, star_wars_data }),
		});
	});

	return (
		<div className={classes.wrapper}>
			<h1>Formularz rejestracyjny</h1>

			<form onSubmit={onSubmit}>
				<label
					className={`${classes.labelLogin} ${
						errors.login ? classes.invalid : ''
					}`}
					htmlFor='login'
				>
					Login:
				</label>
				<input
					id='login'
					type='text'
					{...register('login', {
						required: true,
					})}
				/>
				<label
					className={`${classes.labelPassword} ${
						errors.password ? classes.invalid : ''
					}`}
					htmlFor='password'
				>
					Hasło:
				</label>
				<input
					id='password'
					type='password'
					{...register('password', {
						required: true,
					})}
				/>

				<label
					className={`${classes.labelEmail} ${
						errors.email ? classes.invalid : ''
					}`}
					htmlFor='email'
				>
					E-mail:
				</label>
				<input
					id='email'
					type='email'
					{...register('email', {
						required: true,
						validate: (value) => isValidEmail(value),
					})}
				/>

				<label
					className={`${classes.labelPhone} ${
						errors.phone ? classes.invalid : ''
					}`}
					htmlFor='phone'
				>
					Numer telefonu:
				</label>
				<input
					id='phone'
					type='tel'
					{...register('phone', {
						required: true,
						minLength: 9,
						maxLength: 9,
						pattern: /^\d+$/,
					})}
				/>

				<div
					className={`${classes.checkboxContainer} ${
						errors.checkbox ? classes.invalid : ''
					}`}
				>
					<label>
						<input
							type='checkbox'
							id='checkbox'
							{...register('checkbox', {
								required: true,
							})}
						/>
						<span className={classes.altCheckbox}>
							{errors.checkbox ? <CheckboxInvalid /> : <Checkbox />}
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
