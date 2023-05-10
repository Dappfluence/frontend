import React, {FC} from 'react';
import {Card} from "flowbite-react";
import CollaborationCard from "../ui/collaborations/components/CollaborationCard";

const Collaborations: FC = () => {
  return (
    <div className={'mt-12 container mx-auto'}>
      <h1>
        1 504 Collaborations
      </h1>

      <div className={'flex gap-5'}>
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
