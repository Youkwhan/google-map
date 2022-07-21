import React, { useState, useMemo, useCallback, useRef } from "react";
import {
	GoogleMap,
	Marker,
	DirectionsRenderer,
	Circle,
	MarkerClusterer,
} from "@react-google-maps/api";
import Places from "./Places";

export default function Map() {
	return (
		<div className="container">
			<div className="controls">
				<h1>Commute?</h1>
			</div>
			Map
		</div>
	);
}

const defaultOptions = {
	strokeOpacity: 0.5,
	strokeWeight: 2,
	clickable: false,
	draggable: false,
	editable: false,
	visible: true,
};

const closeOptions = {
	...defaultOptions,
	zIndex: 3,
	fillOpacity: 0.05,
	strokeColor: "#8BC34A",
	fillColor: "#8BC34A",
};

const generateStores = (position) => {
	const stores = [];
	for (let x = 0; x < 100; x++) {
		const direction = Math.random() < 0.5 ? -75 : 75;
		stores.push({
			lat: position.lat + Math.random() / direction,
			lng: position.lng + Math.random() / direction,
		});
	}
	return stores;
};
