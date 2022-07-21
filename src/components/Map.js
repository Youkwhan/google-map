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
	const mapRef = useRef();
	const center = useMemo(() => ({ lat: 40.7, lng: -74 }), []);
	const options = useMemo(
		() => ({
			mapId: "6e7b880f1521e697",
			disableDefaultUI: true,
			clickableIcons: false,
		}),
		[]
	);
	//optimize rerending with fucntion calls
	const onLoad = useCallback((map) => (mapRef.current = map), []);
	return (
		<div className="container">
			<div className="controls">
				<h1>Commute?</h1>
			</div>

			<div className="map">
				<GoogleMap
					zoom={10}
					center={center}
					mapContainerClassName="map-container"
					options={options}
					onLoad={onLoad}
				></GoogleMap>
			</div>
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
const middleOptions = {
	...defaultOptions,
	zIndex: 2,
	fillOpacity: 0.05,
	strokeColor: "#FBC02D",
	fillColor: "#FBC02D",
};
const farOptions = {
	...defaultOptions,
	zIndex: 1,
	fillOpacity: 0.05,
	strokeColor: "#FF5252",
	fillColor: "#FF5252",
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
