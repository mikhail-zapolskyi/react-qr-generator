import "./App.css";
import React, { useState, useRef } from "react";
import QrCode from "./components/QrCode";
import Button from "./components/Button";
import { jsPDF } from "jspdf";
import Message from "./components/Message";

function App() {
	const [qr, setQr] = useState("");
	const [text, setText] = useState("");
	const [qrImage, setQrImage] = useState("");
	const [message, setMessage] = useState("");
	const qrRef = useRef();

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!qr) {
			setMessage("Please enter a qr link");
			setTimeout(() => {
				setMessage("");
			}, 3000);
			return;
		}
		const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${qr}`;
		setQrImage(qrUrl);
	};

	const reset = () => {
		setQr("");
		setText("");
		setQrImage("");
		setMessage("");
	};

	const download = async () => {
		const pdf = new jsPDF("p", "pt", "a4");
		await pdf.html(qrRef.current, {
			callback: (pdf) => {
				pdf.save(`${text}.pdf`);
			},
			width: window.innerWidth / 2,
			windowWidth: 500,
			x: 75,
			y: 200,
		});
	};

	return (
		<div className="app">
			{!qrImage && (
				<form onSubmit={handleSubmit} className="form">
					<input
						type="text"
						value={qr}
						onChange={(e) => setQr(e.target.value)}
						className="input"
						placeholder="Enter your qr link here"
					/>
					<input
						type="text"
						value={text}
						onChange={(e) => setText(e.target.value)}
						className="input"
						placeholder="Enter your text here"
					/>
					<Button text="Generate QR" />
					{message && <Message message={message} />}
				</form>
			)}
			{qrImage && (
				<>
					<QrCode text={text} qrImage={qrImage} ref={qrRef} />
					<Button text="Reset" onClick={reset} styles="reset" />
					<Button
						text="Download"
						onClick={download}
						styles="download"
					/>
				</>
			)}
		</div>
	);
}

export default App;
