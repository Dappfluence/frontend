import React, {FC} from 'react';
import {populateCollaboration} from "../ui/collaborations/components/CollaborationCard.types";
import {useQuery} from "@tanstack/react-query";
import CollaborationCard from "../ui/collaborations/components/CollaborationCard";
import {getDocs, collection, getFirestore} from 'firebase/firestore'

const Collaborations: FC = () => {

  const {data = []} = useQuery({
    queryKey: ['collaborations'],
    queryFn: async () => {
      let data = await getDocs(collection(getFirestore(), 'collaborations'))
      return data.docs.map(e => populateCollaboration(e.data()))
    },
  })

  return (
    <div className={'mt-[144px] container mx-auto'}>
      <h1 className={'text-5xl font-bold'}>
        {data.length} Collaborations
      </h1>

      <div className={'grid grid-cols-2 gap-4 py-5'}>
        {data.map((collaboration) => <div className={'col-span-1'}>
          <CollaborationCard collaboration={collaboration}/>
        </div>)}
      </div>
    </div>
  );
};

export default Collaborations;
