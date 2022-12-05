import classes from 'views/ProfilePage.module.scss';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { IconCheck, IconStar } from 'components/Icons';
import { ProfileDataContext } from 'providers/DataProvider';

const ProfilePage: React.FC = () => {
	const {
		incrementEndpointCounter,
		profile: { characterName, age, eyeColor },
	} = useContext(ProfileDataContext);

	return (
		<div className={classes.wrapper}>
			<header className={classes.header}>
				<p className={classes.author}>Mikołaj Borowski</p>
				<NavLink to='/register'>
					<div className={classes.buttonRegister}>formularz rejestracyjny</div>
				</NavLink>
			</header>
			<section className={classes.section}>
				<div className={classes.profileContainer}>
					<div className={classes.profileImage} />
					<div className={classes.profileContent}>
						<div className={classes.profileText}>
							<h1
								className={characterName.length > 15 ? classes.smallerText : ''}
							>
								{characterName}
							</h1>
							<h2>age: {age}</h2>
							<h2>eye color: {eyeColor}</h2>
						</div>
						<div className={classes.iconStar}>
							<IconStar />
						</div>
						<div className={classes.iconCheck}>
							<IconCheck />
						</div>
					</div>
				</div>
				<div
					className={classes.buttonNextProfile}
					onClick={incrementEndpointCounter}
				>
					next profiles
				</div>
			</section>
		</div>
	);
};

export default ProfilePage;
