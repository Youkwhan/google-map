import React, { useState, useMemo, useCallback, useRef } from "react";
import {
	GoogleMap,
	Marker,
	DirectionsRenderer,
	Circle,
	MarkerClusterer,
} from "@react-google-maps/api";
import Places from "./places";
import { toHaveFormValues } from "@testing-library/jest-dom/dist/matchers";

export default function Map() {
	const [office, setOffice] = useState();
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
	//Create random buildings around center
	const buildings = useMemo(() => {
		if (office) return generateBuildings(office);
	}, [office]);

	return (
		<div className="container">
			<div className="controls">
				<h1>Near by me</h1>
				{/* Get the cords from Search Bar and update position/cords and pan map to cords */}
				<Places
					setOffice={(position) => {
						setOffice(position);
						mapRef.current?.panTo(position);
					}}
				/>
			</div>

			<div className="map">
				<GoogleMap
					zoom={10}
					center={center}
					mapContainerClassName="map-container"
					options={options}
					onLoad={onLoad}
				>
					{/* If there is an office then,*/}
					{office && (
						<>
							{/* show the Marker at the coords, office ={lat,lng} */}
							<Marker
								position={office}
								icon="https://icon-library.com/images/nuke-icon-png/nuke-icon-png-14.jpg"
							/>

							
							{/* Display the random building markers */}
							{buildings.map((building) => (
								<Marker key={building.lat} position={building} />
							))}

							<Circle center={office} radius={15000} options={closeOptions} />
							<Circle center={office} radius={30000} options={middleOptions} />
							<Circle center={office} radius={45000} options={farOptions} />
						</>
					)}
				</GoogleMap>
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

//generating between a random range of 11-80 buildings 
const generateBuildings = (position) => {
	const buildings = [];
	const numberRange = Math.floor(Math.random() * (80-10+1)) + 10
	for (let i = 0; i < numberRange; i++) {
		const direction = Math.random() < 0.5 ? -4 : 4;
		buildings.push({
			lat: position.lat + Math.random() / direction,
			lng: position.lng + Math.random() / direction,
		});
	}
	return buildings;
};
