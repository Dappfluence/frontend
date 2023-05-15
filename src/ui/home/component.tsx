import React from 'react';
import Tabs from "./Tabs";

const BenefitTabs = () => {
  const tabs = [
    {
      id: 1,
      label: 'influencers',
      content: <div className={'flex flex-col gap-4'}>
        <div className={'p-4 rounded-lg bg-gray-100 bg-opacity-[0.1]'}>
          <div className={'border-b-2 border-blue-400'} />
          <h1 className={'text-lg mt-2'}>Scale your Web3 influence</h1>
        </div>
        <div className={'p-4 rounded-lg bg-gray-100 bg-opacity-[0.1]'}>
          <div className={'border-b-2 border-blue-400'} />
          <h1 className={'text-lg mt-2'}>Collaborate with top brands one-on-one</h1>
        </div>
        <div className={'p-4 rounded-lg bg-white bg-opacity-[0.1]'}>
          <div className={'border-b-2 border-blue-400'} />
          <h1 className={'text-lg mt-2'}>Monetize in crypto</h1>
        </div>
      </div>,
    },
    {
      id: 2,
      label: 'brands',
      content: <div className={'flex flex-col gap-4'}>
        <div className={'p-4 rounded-lg bg-gray-100 bg-opacity-[0.1]'}>
          <div className={'border-b-2 border-blue-400'} />
          <h1 className={'text-lg mt-2'}>Web3 Influencer Network Access</h1>
        </div>
        <div className={'p-4 rounded-lg bg-gray-100 bg-opacity-[0.1]'}>
          <div className={'border-b-2 border-blue-400'} />
          <h1 className={'text-lg mt-2'}>Direct-to-Influencer Cost Efficiency</h1>
        </div>
        <div className={'p-4 rounded-lg bg-white bg-opacity-[0.1]'}>
          <div className={'border-b-2 border-blue-400'} />
          <h1 className={'text-lg mt-2'}>Improved Campaign ROI through Decentralization</h1>
        </div>
      </div>,
    },
  ];

  return (
      <Tabs tabs={tabs} />
  );
};

export default BenefitTabs;
