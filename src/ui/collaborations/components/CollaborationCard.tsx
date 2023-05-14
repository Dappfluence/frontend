import React, {FC} from 'react';
import {Link} from "react-router-dom";
import {CollaborationCardProps} from "./CollaborationCard.types";

const CollaborationCard: FC<CollaborationCardProps> = ({collaboration}) => {

  return (

    <div className={'border border-blue-300 p-6 rounded-[12px] flex flex-col gap-4'}>
      <div className={'flex justify-between'}>
        <div className={'flex flex-col gap-1'}>
          <div className={'flex gap-2 text-xs text-[#111928]'}>
            <span>{collaboration.type} collaboration</span>
            <div className={'flex gap-1'}>
              <span>{new Date(collaboration.dates.start * 1000).toLocaleDateString()}</span>
              <span> - </span>
              <span>{new Date(collaboration.dates.end * 1000).toLocaleDateString()}</span>
            </div>
          </div>
          <h2 className={'text-xl font-bold'}>{collaboration.brand.title}</h2>
          <a href={collaboration.brand.link} className={'text-xs text-blue-500'}>{collaboration.brand.link}</a>
        </div>
        <img src={collaboration.brand.image} alt=""/>
      </div>
      <div className={'flex flex-col gap-1'}>
        <h3 className={'text-lg font-bold'}>{collaboration.content.title}</h3>
        <p className={'text-lg'}>{collaboration.content.description}</p>
        <span className={'text-lg text-pink-500'}>#{collaboration.tags.join(" #")}</span>
      </div>
      <div className={'flex justify-between items-center'}>
        <Link to={'/collaboration/' + collaboration.id}>
          <button className={'inline-block py-3 px-5 rounded-lg bg-blue-600 text-white'}>View Details</button>
        </Link>
        <span className={'text-3xl font-bold'}>{collaboration.reward} <small className={'text-lg'}>tBnB</small></span>
      </div>
    </div>

  );
};

export default CollaborationCard;
