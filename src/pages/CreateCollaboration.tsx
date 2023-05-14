import React, {FC} from 'react'
import Card from "../ui/company/components/Card";
import {Link} from "react-router-dom";
import {Button} from "flowbite-react";
import Footer from "../widgets/Footer";
import {useMutation} from "@tanstack/react-query";
import {writeContract, prepareWriteContract} from "@wagmi/core";

import FactoryABI from "../assets/abi/Factory.json"

const FACTORY = '0x387b46af1f289f0590156ed26c7d04ab1ceaf719'


const CreateCollaboration: FC = () => {
  const [reward, setReward] = React.useState(1)
  const [startTime, setStartTime] = React.useState(Date.now());
  const [endTime, setEndTime] = React.useState(Date.now() + 60 * 60 * 24 * 9 * 1000);


  const {mutate} = useMutation({
    mutationKey: ['createCollaboration'],
    mutationFn: async () => {
      const config = await prepareWriteContract({
        address: FACTORY,
        abi: FactoryABI,
        functionName: 'createCollaboration',
        args: [endTime, '0x0000000', reward]
      })

      let result = writeContract(config);
      console.log(result)
    }
  })

  const handleCreate = () => {
    mutate()
  }

  return <div className={'p-12 py-[126px] -mt-[96px] bg-gray-100 h-screen'}>
    <span className={'text-md '}>Back</span>
    <div className={'grid grid-cols-2 mt-6 gap-8'}>
      <Card className={'col-span-1'}>
        <div className={'flex flex-col gap-1'}>
          <span className={'text-2xl font-bold'}>Create an Engaging Twitter Post Featuring Gucci Products!</span>
          <p className={'text-gray-700'}>Reward: {reward} tBNB</p>
        </div>
      </Card>
      <Card className={'col-span-1'}>
        <div className={'flex flex-col gap-1'}>
          <span className={'text-xl font-bold'}>Additional Information</span>
          <span>Dates</span>
          <span
            className={'text-lg font-bold'}>{new Date(startTime).toLocaleDateString()} - {new Date(endTime).toLocaleDateString()}</span>
        </div>
      </Card>
    </div>
    <Footer>
      <Link to={'/collaboration/new'}>
        <Button onClick={handleCreate}>Create Collaboration</Button>
      </Link>
    </Footer>
  </div>
}


export default CreateCollaboration;
