import React, { useState, useEffect } from "react";

const Player = () => {
	const urlAPI = "https://assets.breatheco.de/apis/sound/";
	const [urlSong, setUrlSong] = useState("files/mario/songs/castle.mp3");
	const [list, setList] = useState([]);

	useEffect(() => {
		fetch(urlAPI.concat("songs"))
			.then(function(response) {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then(function(responseAsJson) {
				setList(responseAsJson);
			})
			.catch(function(error) {
				console.log("There was a problem: \n", error);
			});
	}, []);

	let songsList = list.map((song, index) => {
		return (
			<li
				key={index.toString()}
				onClick={() => {
					setUrlSong(song.url);
					console.log(song.url);
				}}>
				{song.name}
			</li>
		);
	});

	console.log(list);

	const play = () => {
		return true;
	};
	const next = () => {
		return true;
	};

	let myAudio = document.querySelector("#myAudio");

	return (
		<div className="container bg-dark text-white my-2">
			<section className="col">
				<ul>{songsList}</ul>
			</section>
			<div>
				<audio id="myAudio" src={urlAPI.concat(urlSong)} />
			</div>

			<footer className="col d-flex justify-content-center ml-3">
				<button>
					<i className="fas fa-arrow-circle-left "></i>
				</button>
				<button
					onClick={() => {
						myAudio.play();
						console.log(urlSong);
					}}>
					<i className="fas fa-play-circle"></i>
				</button>
				<button
					onClick={() => {
						myAudio.pause();
					}}>
					<i className="fas fa-pause-circle"></i>
				</button>
				<button>
					<i className="fas fa-arrow-circle-right"></i>
				</button>
			</footer>
		</div>
	);
};

export default Player;
