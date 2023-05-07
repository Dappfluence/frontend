import React from "react";
import {Game} from "../types";
import GameTile from "../components/tiles/GameTile";
import {useGamesQuery} from "../api/games";


const Home: React.FC = () => {

	const {data: games = []} = useGamesQuery();


	const renderGames = () => {
		return games.map((e: Game) => <div className={'col-span-1'}>
			<GameTile {...e} key={e.name} />
		</div>)
	}

	return <div className={'border border-sky-600 grid grid-cols-3'}>
		{renderGames()}
	</div>
}


export default Home
