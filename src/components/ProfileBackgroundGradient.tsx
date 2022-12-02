import classes from 'components/ProfileBackgroundGradient.module.scss';

const ProfileBackgroundGradient: React.FC = () => {
	return (
		<div className={classes.backgroundGradient}>
			<div className={classes.circle1}></div>
			<div className={classes.circle2}></div>
			<div className={classes.circle3}></div>
			<div className={classes.circle4}></div>
			<div className={classes.circle5}></div>
			<div className={classes.topLayer}></div>
		</div>
	);
};

export default ProfileBackgroundGradient;
