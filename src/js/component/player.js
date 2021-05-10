import React, { useState, useEffect, useRef } from "react";

const Player = () => {
	const urlAPI = "https://assets.breatheco.de/apis/sound/";
	const [list, setList] = useState([]);
	const [urlSong, setUrlSong] = useState(
		"files/videogame/songs/sonic_brain-zone.mp3"
	);
	const [songIndex, setSongIndex] = useState(11);
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
					setSongIndex(index);
					console.log(index, song.name, song.url);
				}}>
				{song.name}
			</li>
		);
	});

	const previousSong = index => {
		if (index == 0) {
			setUrlSong(list[list.length - 1].url);
		} else {
			setUrlSong(list[index - 1].url);
		}
	};
	const nextSong = index => {
		if (index == list.length - 1) {
			setUrlSong(list[0].url);
		} else {
			setUrlSong(list[index + 1].url);
		}
	};

	return (
		<div className="box">
			<section className="col">
				<ul>{songsList}</ul>
			</section>

			<video
				controls
				height="20rem"
				width="80%"
				ref={myAudio}
				src={urlAPI.concat(urlSong)}
				autoPlay
			/>

			<footer>
				<i
					className="fas fa-arrow-circle-left"
					onClick={() => {
						previousSong(songIndex);
						if (songIndex != 0) {
							setSongIndex(songIndex - 1);
						} else {
							setSongIndex(list.length - 1);
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
						nextSong(songIndex);
						if (songIndex != list.length - 1) {
							setSongIndex(songIndex + 1);
						} else {
							setSongIndex(0);
						}
						myAudio.current.play();
					}}></i>
			</footer>
		</div>
	);
};

export default Player;
