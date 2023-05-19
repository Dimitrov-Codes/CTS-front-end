import classes from "./Login.module.css";

export const Input = (props) => {
    return (
        <div
            className={`${classes.control} ${
                props.isValid === false ? classes.invalid : ''
            }`}
        >
            <label htmlFor={props.id}>{props.name}</label>
            <input
                type={props.type}
                id={props.id}
                value={props.value}
                onChange={props.onChangeHandler}
                onBlur={props.onBlurHandler}
                autoComplete="off"
            />
        </div>
    )
}