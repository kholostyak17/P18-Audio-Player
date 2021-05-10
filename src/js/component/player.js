import React, { useState, useEffect, useRef } from "react";

const Player = () => {
	const urlAPI = "https://assets.breatheco.de/apis/sound/";
	const [urlSong, setUrlSong] = useState(
		"files/videogame/songs/sonic_brain-zone.mp3"
	);
	const [songPlaying, setSongPlaying] = useState(11);
	const [list, setList] = useState([]);
	const myAudio = useRef();

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
					setSongPlaying(index);
				}}>
				{song.name}
			</li>
		);
	});
	console.log(list);

	const previousSong = index => {
		console.log(index);
		if (index == 0) {
			setUrlSong(list[21].url);
		} else {
			setUrlSong(list[index - 1].url);
		}
	};
	const nextSong = index => {
		console.log(index);
		if (index == 21) {
			setUrlSong(list[0].url);
		} else {
			setUrlSong(list[index + 1].url);
		}
	};

	/*const previous = () => {
		return true;
	};
	const next = () => {
		return true;
	};*/

	//let myAudio = document.querySelector("#myAudio");

	return (
		<div className="container bg-dark text-white my-2">
			<section className="col">
				<ul>{songsList}</ul>
			</section>

			<video
				controls
				height="20rem"
				width="100%"
				ref={myAudio}
				src={urlAPI.concat(urlSong)}
				autoPlay
			/>

			<footer className="col d-flex justify-content-center ml-3 py-2">
				<i
					className="fas fa-arrow-circle-left"
					onClick={() => {
						previousSong(songPlaying);
						if (songPlaying != 0) {
							setSongPlaying(songPlaying - 1);
						} else {
							setSongPlaying(21);
						}
						myAudio.current.play();
					}}></i>
				<i
					className="fas fa-play-circle"
					onClick={() => {
						myAudio.current.play();
					}}></i>
				<i
					className="fas fa-pause-circle"
					onClick={() => {
						myAudio.current.pause();
					}}></i>
				<i
					className="fas fa-arrow-circle-right"
					onClick={() => {
						nextSong(songPlaying);
						if (songPlaying != 21) {
							setSongPlaying(songPlaying + 1);
						} else {
							setSongPlaying(0);
						}
						myAudio.current.play();
					}}></i>
			</footer>
		</div>
	);
};

export default Player;
