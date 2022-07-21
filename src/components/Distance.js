import React from "react";

function Distance({ leg }) {
	if (!leg.distance || !leg.duration) return null;
	console.table(leg);
	return (
		<div>
			<p>
				This building is <span className="highlight">{leg.distance.text}</span>
				away from your current location. Estimated travel time:{" "}
				<span className="highLight">{leg.duration.text}</span>
			</p>
		</div>
	);
}

export default Distance;
