import Button from "../UI/Button/Button";
import classes from "../Login/Login.module.css";
import Card from "../UI/Card/Card";
import css from './CustomToken.module.css'

const CustomToken = (props) => {
	const onChangeHandler = (event) => {
		const token = event.target.value;
		props.setToken(token);
	}
	return (<Card className={classes.login}>
		<div className={'control'}>
			<label htmlFor={'token'}>
				<h3>
					Enter your token
				</h3>
			</label>
			<textarea id='token' className={css.textarea} onChange={onChangeHandler}/>
		</div>
		<div className={classes.actions}>
			<Button onClick={props.loginWithCustomToken}> Use Token </Button>
			<Button onClick={props.goBack}>Go Back</Button>
		</div>
		<div>
		</div>
	</Card>);
};
export default CustomToken;
