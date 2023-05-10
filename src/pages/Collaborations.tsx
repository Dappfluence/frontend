import React, {FC} from 'react';
import {Card} from "flowbite-react";
import CollaborationCard from "../ui/collaborations/components/CollaborationCard";

const Collaborations: FC = () => {
  return (
    <div className={'mt-[144px] container mx-auto'}>
      <h1 className={'text-5xl font-bold'}>
        1 504 Collaborations
      </h1>

      <div className={'flex gap-5 mt-6'}>
        <div className={'flex flex-col gap-5'}>
          <CollaborationCard />
          <CollaborationCard />
        </div>
        <div className={'flex flex-col gap-5'}>
          <CollaborationCard />
          <CollaborationCard />
        </div>
      </div>
    </div>
  );
};

export default Collaborations;
