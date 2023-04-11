import React, { forwardRef } from "react";
import "./QrCode.css";

const QrCode = forwardRef(({ text, qrImage }, ref) => {
	return (
		<div id="qrcode" className="qr" ref={ref}>
			<div className="qr-border">
				<img src={qrImage} alt="qr" className="qr-image" />
				<p className="qr-text">{text ? text : "Scan Me"}</p>
			</div>
		</div>
	);
});

export default QrCode;
