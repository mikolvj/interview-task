import ProfileBackgroundGradient from 'components/ProfileBackgroundGradient';
import { IconCheck, IconStar } from 'components/Icons';
import classes from 'views/ProfilePage.module.scss';
import { useContext } from 'react';
import { ProfileDataContext } from 'providers/DataProvider';

import { NavLink } from 'react-router-dom';

const ProfilePage: React.FC = () => {

	const ctx = useContext(ProfileDataContext);

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
					<ProfileBackgroundGradient />
					<div className={classes.profileImage} />
					<div className={classes.profileContent}>
						<h1 className={ctx.profile.name.length > 15 ? classes.smaller : ''}>
							{ctx.profile.name}
						</h1>
						<h2>age: {ctx.profile.age}</h2>
						<h2>eye color: {ctx.profile.eyeColor}</h2>
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
					onClick={ctx.incrementEndpointCounter}
				>
					next profiles
				</div>
			</section>
		</div>
	);
};

export default ProfilePage;
