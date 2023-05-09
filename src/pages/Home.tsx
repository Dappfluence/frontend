import React from "react";
import backgroundImage from "../assets/background.png";
import grid from "../assets/grid.png";

const Home: React.FC = () => {
  return <div className={' w-full min-h-[100vh] pt-[96px]'}>
    <div
      className={'absolute top-0 left-0 w-full h-[80vh] z-0 rounded-[50px] rounded-t-none overflow-hidden bg-gradient-to-r from-purple-dark to-purple-light'}>
      <div className={'w-full h-full absolute bg-cover z-[1]'}
           style={{backgroundImage: `url(${backgroundImage})`}}></div>
      <div className={'w-full h-full absolute bg-cover opacity-50 '} style={{backgroundImage: `url(${grid})`}}></div>
    </div>
    <div className={' absolute border border-red-500 w-full  my-48 z-10'}>
      hey
    </div>
  </div>
}


export default Home
