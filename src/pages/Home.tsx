import React from "react";
import backgroundImage from "../assets/background.png";
import grid from "../assets/grid.png";
import {Button} from "flowbite-react";

const Home: React.FC = () => {
  return <div className={' w-full min-h-[100vh] pt-[96px]'}>
    <div
      className={'absolute top-0 left-0 w-full h-[80vh] z-0 rounded-[50px] rounded-t-none overflow-hidden bg-gradient-to-r from-purple-dark to-purple-light'}>
      <div className={'w-full h-full absolute bg-cover z-[1]'}
           style={{backgroundImage: `url(${backgroundImage})`}}></div>
      <div className={'w-full h-full absolute bg-cover opacity-50 '} style={{backgroundImage: `url(${grid})`}}></div>
    </div>
    <div className={' absolute md:max-w-[66vw] md:p-24 md:pr-12 text-white flex flex-col gap-4  z-10'}>
      <h1 className={'text-6xl font-bold '}>Dappfluence</h1>
      <h3 className={'text-3xl'}>Connect with Influential Bloggers and Build Your Brand with Dappfluence</h3>
      <p className={'text-xl'}>Looking to reach a wider audience and build your brand's online presence? Look no further
        than Brand Blogger
        Bridge. Our platform connects you with influential bloggers across a range of industries, giving you the
        opportunity to collaborate on sponsored content, product reviews, social media posts, and more. Whether you're a
        blogger looking to monetize your content or a brand looking to reach new customers, our platform makes it easy
        to find the right partners and build mutually beneficial relationships. Sign up today and start building your
        brand with Brand Blogger Bridge.</p>
      <Button className={'w-48'}>Get started</Button>
    </div>

  </div>
}


export default Home
