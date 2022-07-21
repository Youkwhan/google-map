import React from "react";
import { useLoadScript } from "@react-google-maps/api";
import Map from './components/Map'
import "./globals.css"

function App() {
	//LoadScript - Loads the Google Maps JavaScript API script
	const { isLoaded } = useLoadScript({
		googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
		libraries: ["places"],
	});

	if (!isLoaded) return <div>Loading...</div>;
	return (
		<div>
			<Map />
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

export default App;
