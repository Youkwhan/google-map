import React from "react";
import "../globals.css";

function Distance({ leg }) {
	if (!leg.distance || !leg.duration) return null;

	return (
		<div>
			{/* <p>
				We want to go to{" "}
				<span className="highlight">{leg.start_address.text}</span>
			</p> */}
			<p>
				This building is <span className="highlight">{leg.distance.text}</span>{" "}
				away from your current location.
			</p>
			<p>
				Estimated travel time:{" "}
				<span className="highLight">{leg.duration.text}</span>
			</p>
		</div>
	);
}

export default Distance;
