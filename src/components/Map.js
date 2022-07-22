import React, { useState, useMemo, useCallback, useRef } from "react";
import {
	GoogleMap,
	Marker,
	DirectionsRenderer,
	Circle,
	MarkerClusterer,
} from "@react-google-maps/api";
import Places from "./Places";
import Distance from "./Distance";

// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactTostify.css";

// toast.configure();
export default function Map() {
	const [address, setAddress] = useState();
	const [directions, setDirections] = useState();
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
		if (address) return generateBuildings(address);
	}, [address]);

	const fetchDirections = (building) => {
		if (!address) return;

		const service = new window.google.maps.DirectionsService();
		service.route(
			{
				origin: building,
				destination: address,
				travelMode: window.google.maps.TravelMode.DRIVING,
			},
			(result, status) => {
				if (status === "OK" && result) {
					setDirections(result);
				}
			}
		);
	};

	// const notify = (building) => {
	// 	toast("Basic notification", {position: toast.POSITION.TOP_LEFT, autoClose: 8000});
	// };

	return (
		<div className="container">
			<div className="controls">
				<h1>Near by me</h1>
				{/* Get the cords from Search Bar and update position/cords and pan map to cords */}
				<Places
					setAddress={(position) => {
						setAddress(position);
						mapRef.current?.panTo(position);
					}}
				/>
				{!address && <p>Enter the address of your current location</p>}
				{directions && <Distance leg={directions.routes[0].legs[0]} />}
			</div>

			<div className="map">
				<GoogleMap
					zoom={10}
					center={center}
					mapContainerClassName="map-container"
					options={options}
					onLoad={onLoad}
				>
					{directions && (
						<DirectionsRenderer
							directions={directions}
							options={{
								polylineOptions: {
									zIndex: 50,
									strokeColor: "#1976D2",
									strokeWeight: 5,
								},
							}}
						/>
					)}

					{/* If there is an address then,*/}
					{address && (
						<>
							{/* show the Marker at the coords, address ={lat,lng} */}
							<Marker
								position={address}
								//icon="https://icon-library.com/images/nuke-icon-png/nuke-icon-png-14.jpg"
								icon="https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png"
							/>

							{/* Display the random building markers */}
							<MarkerClusterer>
								{(clusterer) =>
									buildings.map((building) => (
										<Marker
											key={building.lat}
											position={building}
											clusterer={clusterer}
											onClick={() => {
												fetchDirections(building);
												// notify(building);
											}}
										/>
									))
								}
							</MarkerClusterer>

							<Circle center={address} radius={15000} options={closeOptions} />
							<Circle center={address} radius={30000} options={middleOptions} />
							<Circle center={address} radius={45000} options={farOptions} />
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
	const numberRange = Math.floor(Math.random() * (80 - 10 + 1)) + 10;
	for (let i = 0; i < numberRange; i++) {
		const direction = Math.random() < 0.5 ? -4 : 4;
		buildings.push({
			lat: position.lat + Math.random() / direction,
			lng: position.lng + Math.random() / direction,
		});
	}
	return buildings;
};
