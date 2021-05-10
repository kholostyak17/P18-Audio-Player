import React from "react";
import Player from "./player.js";
export function Home() {
	return (
		<div>
			<div className="bg-warning font-weight-bold d-flex justify-content-center py-1">
				<span>CUIDADO CON EL VOLUMEN INICIAL!!!!!</span>
			</div>
			<Player />
		</div>
	);
}
