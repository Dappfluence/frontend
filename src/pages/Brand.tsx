import React, {FC, useState} from 'react'
import Card from "../ui/brand/components/Card";
import WalletCard from "../ui/brand/components/WalletCard";
import BrandCard from "../ui/brand/components/BrandCard";
import Footer from "../widgets/Footer";
import {Button} from "flowbite-react";
import {Link, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {fetchBrand} from "../api/brand";
import {IBrand} from "../shared/types/account";
import CreateCollaborationModal from "../widgets/CreateCollaborationModal";

const Brand: FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const onClose = () => {
    setModalOpen(false)
  }
  const onOpen = () => {
    setModalOpen(true);
  }

  const sumbitModal = () => {
    console.log('submit');
  }

  const {address = null} = useParams();

  const {data: brand} = useQuery<{}, unknown, IBrand>({
    queryKey: ['brand', address],
    queryFn: async (): Promise<IBrand> => fetchBrand(address)
  })

  if (brand === undefined) {
    return null;
  }

  return <div className={'p-12 py-[126px] -mt-[96px] bg-gray-100 h-screen'}>
    <h2 className={'text-5xl font-bold'}>{brand.name}</h2>
    <div className={'grid grid-cols-3 mt-12 gap-8'}>
      <BrandCard name={brand.name} link={brand.link}/>
      <Card className={'col-span-1'}>
        <div className={'flex flex-col gap-1'}>
          <span className={'text-2xl font-bold'}>Active collaborations</span>
          <p className={'text-gray-400'}>Here will be a brief information about your active collaborations</p>
        </div>
      </Card>
      <Card className={'col-span-2'}>
        <div className={'flex flex-col gap-1'}>
          <span className={'text-2xl font-bold'}>Collaborations</span>
          <p className={'text-gray-400'}>Here will be a detailed information about your collaborations, as soon as your
            first one will be
            created</p>
        </div>
      </Card>

    </div>
    <Footer>
      <Button onClick={onOpen}>Create new collaboration</Button>
      <CreateCollaborationModal onClose={onClose} isOpen={modalOpen} onSubmit={sumbitModal}/>
    </Footer>
  </div>
}


export default Brand;
