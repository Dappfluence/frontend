import {Game} from "../../types";
import React from "react";


const GameTile: React.FC<Game> = ({name}) => {
  return <div>{name}</div>
}


export default GameTile;
