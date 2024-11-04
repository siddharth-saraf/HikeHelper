import React, { useState, useEffect } from 'react'
import { Link, navigate } from 'react-router-dom'
import "./App.css";

const serverURL = "http://localhost:3000/"

function HikeSelect () {
	const [trailName, setTrailName] = useState("");
	const [trailData, setTrailData] = useState({});
	const [trails, setTrails] = useState([]);
	const [filteredTrails, setFilteredTrails] = useState([]);
	const [search, setSearch] = useState("");

	useEffect(() => {
		fetch(serverURL + "api/trails")
		.then(resp => resp.json() )
		.then(data => {
		    if (!data) throw new Error('No data received');
		    if (data === undefined) console.log("data undefined");
		    if (data.trails !== undefined) setTrails(data.trails);
  		})
		.catch(err => console.log("Error connecting to server: ", err));
	}, []);

	const searchHike = () => {
		fetch(serverURL + "api/trail?name=" + encodeURI(trailName))
		.then(resp => resp.json())
		.then(data => {
		    if (!data) throw new Error('No data received');
		    if (data === undefined) console.log("data undefined");
		    if (data.trail !== undefined) {
		    	setTrailData(data.trail);
		    	setTrailName(data.trail.properties.TRAIL_NAME);
		    };
  		})
		.catch(err => console.log("Error connecting to server: ", err));
	}

	const handleSearch = (e) => {
		const val = e.target.value;
		setSearch(val);
	}

	useEffect(() => {
		if (trails) {
			setFilteredTrails(trails.filter(trail => 
				trail.toLowerCase().includes(search.toLowerCase())
			));
		}
	}, [search])

	return (
		<div>
			<Link to="/map" state={{ trailData }} >Open Map</Link>
			<input 
		        type="text" 
		        value={search} 
		        onChange={handleSearch} 
		        placeholder="Search trails..."
	      	/>
	      	<ul>
	        	{filteredTrails.map((trail, index) => (
	          		<li key={index}><button onClick={() => {setTrailName(trail)}}>{trail}</button></li>
	        	))}
	      	</ul>
			<button onClick={searchHike}>Search Hike</button>
			<p>{trailData === {} ? "" : trailName}</p>
		</div>
	)

}

export default HikeSelect;