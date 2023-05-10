import React, {FC} from 'react';

const CollaborationCard: FC = () => {
  return (
    <div className={'border border-blue-300 p-6 rounded-[12px] flex flex-col gap-4'}>
      <div className={'flex justify-between'}>
        <div className={'flex flex-col gap-1'}>
          <div className={'flex gap-2 text-xs text-[#111928]'}>
            <span>Video collaboration</span>
            <div className={'flex gap-1'}>
              <span>4 Mar 2023</span>
              <span> - </span>
              <span>5 Jun 2023</span>
            </div>
          </div>

            <h2 className={'text-xl font-bold'}>Gucci</h2>
            <a href="#" className={'text-xs text-blue-500'}>https://www.gucci.com</a>
        </div>
        <img src="https://via.placeholder.com/150x50" alt=""/>
      </div>
      <div className={'flex flex-col gap-1'}>
        <h3 className={'text-lg font-bold'}>Create an Engaging Video Featuring Gucci Products!</h3>
        <p className={'text-lg'}>We're looking for talented creators with a minimum of [number] subscribers on [relevant video platform] to create an engaging video showcasing our latest Gucci products. You'll receive a generous compensation package and all the products you need to create an amazing video. Your video should showcase our products in an authentic and engaging way, while also aligning with the overall look and feel of our brand.</p>
        <span className={'text-lg text-pink-500'}>#fashion #gucci #clothes</span>
      </div>
      <div className={'flex justify-between items-center'}>
        <button className={'inline-block py-3 px-5 rounded-lg bg-blue-600 text-white'}>View Details</button>
        <span className={'text-3xl font-bold'}>2000 <small className={'text-lg'}>$</small></span>
      </div>
    </div>
  );
};

export default CollaborationCard;
