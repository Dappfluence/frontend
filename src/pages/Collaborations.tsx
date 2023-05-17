import React, {FC, useEffect} from 'react';
import {populateCollaboration} from "../ui/collaborations/components/CollaborationCard.types";
import {useQuery} from "@tanstack/react-query";
import CollaborationCard from "../ui/collaborations/components/CollaborationCard";
import {getDocs, collection, getFirestore} from 'firebase/firestore'
import collaborationCard from "../ui/collaborations/components/CollaborationCard";
import {fetchCollaborationStatus} from "../api/brand";
import Web3 from "web3";
import {useParticleProvider} from "@particle-network/connect-react-ui";
import {ArrowPathIcon} from "@heroicons/react/24/outline";
import binaryBg from "../assets/Binary_001.png";

const Collaborations: FC = () => {

  const provider = useParticleProvider();

  const {data = [], refetch, isLoading, isRefetching} = useQuery({
    queryKey: ['collaborations'],
    queryFn: async () => {
      if (provider === undefined) return []
      let web3 = new Web3(provider as any);
      let data = await getDocs(collection(getFirestore(), 'collaborations'))
      let collabs = await Promise.all(data.docs.map(e => populateCollaboration({id: e.id, ...e.data()})))
      return Promise.all(collabs.map((e) => fetchCollaborationStatus(e, web3)))
    },
    refetchOnWindowFocus: false
  })

  useEffect(() => {
    refetch()
  }, [provider]);


  if (isLoading || isRefetching) return <div className={'mt-[144px] container mx-auto'}>
    <ArrowPathIcon className={'animate-spin h-10 w-10 mx-auto'}/>
  </div>

  return (
    <div className={'mt-[144px] container mx-auto'} style={{backgroundImage: `url(${binaryBg})`}}>
      <h1 className={'text-5xl font-bold'}>
        {data.length} Collaborations
      </h1>

      <div className={'grid grid-cols-2 gap-4 py-5'}>
        {data.sort((a, b) => Number(a.finished) - Number(b.finished)).map((collaboration, index) => <div key={index}
                                                                                         className={'col-span-1'}>
          <CollaborationCard collaboration={collaboration}/>
        </div>)}
      </div>
    </div>
  );
};

export default Collaborations;
