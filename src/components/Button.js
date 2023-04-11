import React from "react";
import "./Button.css";

const Button = ({ text, onClick, styles }) => {
	return (
		<button onClick={onClick} className={`button ${styles}`}>
			{text}
		</button>
	);
};

export default Button;
