import usePlacesAutocomplete, {
	getGeocode,
	getLatLng,
} from "use-places-autocomplete";
import {
	Combobox,
	ComboboxInput,
	ComboboxPopover,
	ComboboxList,
	ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

export default function Places({ setAddress }) {
	/* 
   ready= is the script ready to be used,
   value = value the user input to the search input box,
   setValue = function set value when they change something in the box
   suggestions= suggestions themselves {status= If any were loaded, data= the actual suggestions}
   clearSuggestions= clear the rest when user clicks one
   */
	const {
		ready,
		value,
		setValue,
		suggestions: { status, data },
		clearSuggestions,
	} = usePlacesAutocomplete();

	// Selecting a Search Suggestion and Get the Cords
	const handleSelect = async (val) => {
		try {
			setValue(val, false);
			clearSuggestions();

			//GeoCode converts address into coords which we save into result then {lat lng}
			const result = await getGeocode({ address: val });
			const { lat, lng } = await getLatLng(result[0]);

			setAddress({ lat, lng });
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<Combobox onSelect={handleSelect}>
			{/* Search Bar  */}
			<ComboboxInput
				className="combobox-input"
				placeholder="Search Current Address"
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
			{/* Auto complete Search Suggestions */}
			<ComboboxPopover>
				<ComboboxList>
					{/* if status is true, Loop through Suggestion's data {place_id, description} */}
					{status === "OK" &&
						data.map(({ place_id, description }) => (
							<ComboboxOption key={place_id} value={description} />
						))}
				</ComboboxList>
			</ComboboxPopover>
		</Combobox>
	);
}
