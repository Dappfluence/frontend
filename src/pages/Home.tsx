import React from "react";
import backgroundImage from "../assets/background.png";
import grid from "../assets/grid.png";
import {Button} from "flowbite-react";
import homeSectionBg from "../assets/home-section-bg.png"
import {useAccount} from "@particle-network/connect-react-ui";
import {Link} from "react-router-dom";
import BenefitTabs from "../ui/home/component";

const Home: React.FC = () => {

  const address = useAccount()

  console.error(address)

  return <div className={'mt-[-96px] w-full min-h-[100vh] pt-[96px]'}>
    <div
      className={'absolute top-0 left-0 w-full min-h-[690px] z-10 rounded-[50px] rounded-t-none overflow-hidden bg-gradient-to-r from-purple-dark to-purple-light'}>
      <div className={'w-full h-full absolute bg-cover z-[1]'}
           style={{backgroundImage: `url(${backgroundImage})`}}></div>
      <div className={'w-full h-full absolute bg-cover opacity-50 '} style={{backgroundImage: `url(${grid})`}}></div>
    </div>
    <div className={' md:max-w-[80vw] md:p-24 md:pr-12 text-white flex flex-col gap-4 z-[10]'}>
      <h1 className={'text-6xl font-bold z-10 '}>CollabY</h1>
      <h3 className={'text-2xl z-10'}>Collaborate. Create. Explore the Web3 Influence Realm.</h3>
      <p className={'text-base font-normal z-10'}>
        Welcome to CollabY, your gateway to the thrilling world of the Web3 Creator Economy! Discover the power of
        collaboration and trend-setting as we redefine digital influence. <br/><br/>
        Our platform connects you with a diverse community of influencers and brands. Effortlessly collaborate on
        sponsored content, reviews, and captivating social media posts. Find perfect partners and foster beneficial
        relationships easily. <br/><br/>
        Join CollabY now to shape the future of influencer marketing in the decentralized realm, where trends are born,
        influence soars, and possibilities are endless.
      </p>
      <Button className={'w-48 z-10'}><Link to={'/collaborations'}>Get Started</Link></Button>
    </div>
    <div className={' -mt-24 bg-opacity-90 bg-cover w-full min-h-[130vh] absolute'}
         style={{backgroundImage: `url(${homeSectionBg})`, filter: 'brightness(40%)'}}>
    </div>
    <div className={'container mx-auto z-20 relative text-white'}>
      <h1 className={'mt-[132px] text-5xl font-extrabold '}>So, what are the benefits?</h1>
      <div className={'mt-[94px] flex justify-between'}>
        <div>

          <BenefitTabs />


        </div>

        <div></div>
      </div>
    </div>
  </div>
}


export default Home
