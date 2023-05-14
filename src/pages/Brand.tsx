import React, {FC, useEffect, useState} from 'react'
import Card from "../ui/brand/components/Card";
import BrandCard from "../ui/brand/components/BrandCard";
import Footer from "../widgets/Footer";
import {Button} from "flowbite-react";
import {Link, useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {fetchBrand} from "../api/brand";
import {IBrand} from "../shared/types/account";
import CreateCollaborationModal from "../widgets/CreateCollaborationModal";
import FactoryABI from "../assets/abi/Factory.json"
import CollaborationABI from "../assets/abi/Collaboration.json"
import {useAccount, useAccountInfo, useParticleConnect, useParticleProvider} from "@particle-network/connect-react-ui";
import Web3 from "web3";
import {toast} from "react-toastify";
import {ICollaboration} from "../ui/collaborations/components/CollaborationCard.types";
import {addDoc, collection, doc, getFirestore, query, where, onSnapshot, setDoc, getDoc} from "firebase/firestore";
import {Collaboration} from "../shared/ui/Collaboration";
import {ArrowPathIcon} from "@heroicons/react/24/outline";

const Brand: FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const provider = useParticleProvider();

  const account = useAccount()

  const [collabs, setCollabs] = useState<ICollaboration[]>([])

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!account) return;
    let web3 = new Web3(provider as any);
    setLoading(true)
    let listener = onSnapshot(query(collection(getFirestore(), "collaborations"), where("creator", '==', account)), async (snapshot) => {
      let colls = await Promise.all(snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()})).map(async e => {
        const contract = new web3.eth.Contract(CollaborationABI, e.id);
        const accepted = await contract.methods.proposalAccepted().call();
        const inProgress = await contract.methods.workInProgress().call();
        const powProvided = await contract.methods.powProvided().call();
        const finished = await contract.methods.finished().call();
        let brand = await fetchBrand(e.creator)
        return {
          id: e.id,
          type: e.type || "POST",
          reward: e.budget,
          dates: {start: e.deadline, end: e.deadline},
          brand: brand,
          tags: [],
          content: {title: e.title, description: e.title},
          accepted: accepted,
          inProgress: inProgress,
          powProvided: powProvided,
          finished: finished
        } as ICollaboration
      }))
      setLoading(false)
      setCollabs(colls);
    })

    return () => listener()
  }, [account])


  const onClose = () => {
    setModalOpen(false)
  }
  const onOpen = () => {
    setModalOpen(true);
  }


  const submitModal = async (data) => {
    if (account === undefined) return;
    let web3 = new Web3(provider as any);
    const contract = new web3.eth.Contract(FactoryABI, "0xb644986c9f3ed0F49d064c54052847B17fD0E0b1");
    let date = new Date(data.deadline).getTime() / 1000;
    setModalOpen(false)
    await toast.promise(async () => {
      try {
        let result = await contract.methods.createCollaboration(date).send({
          from: account,
          value: web3.utils.toWei(data.budget, 'ether')
        });
        await setDoc(doc(collection(getFirestore(), "collaborations"), result.events.CollaborationCreated.returnValues[0]), {
          title: data.title,
          deadline: date,
          budget: data.budget,
          creator: account
        });
      } catch (e) {
        console.log(e)
        throw new Error(e)
      }
    }, {
      error: 'Error',
      pending: 'Creating collaboration...',
      success: 'Collaboration created!',
    })

  }

  const {data: brand = null} = useQuery<{}, unknown, IBrand>({
    queryKey: ['brand', account],
    queryFn: async (): Promise<IBrand> => {
      return fetchBrand(account)
    }
  })

  if (brand === null) {
    return null;
  }

  return <div className={'p-12 py-[126px] -mt-[96px]  bg-gray-100 min-h-screen'}>
    <h2 className={'text-5xl font-bold'}>{brand.title}</h2>
    <div className={'grid grid-cols-3 mt-12 gap-8'}>
      <BrandCard title={brand.title} link={brand.link} image={brand.image}/>
      <Card className={'col-span-1'}>
        <div className={'flex flex-col gap-1'}>
          <span className={'text-2xl font-bold'}>Active collaborations</span>
          {loading ? <ArrowPathIcon className={'w-6 h-6 animate-spin'}/> :
            collabs.length === 0 ?
              <p className={'text-gray-400'}>Here will be a detailed information about your active
                collaborations</p> : collabs.filter((a) => a.accepted).map((collab, index) => <Collaboration
                collaboration={collab} key={index}/>)}
        </div>
      </Card>
      <Card className={'col-span-2'}>
        <div className={'flex flex-col w-full gap-1'}>
          <span className={'text-2xl font-bold'}>Collaborations</span>
          <div className={'w-full flex flex-col items-center gap-2 justify-center'}>
            {loading ? <ArrowPathIcon className={'w-6 h-6 animate-spin'}/> :
              collabs.length === 0 ?
                <p className={'text-gray-400'}>Here will be a detailed information about your collaborations, as soon as
                  your first one will be created</p> : collabs.map((collab, index) => <Collaboration
                  collaboration={collab} key={index}/>)}
          </div>

        </div>
      </Card>

    </div>
    <Footer>
      <Button onClick={onOpen}>Create new collaboration</Button>
      <CreateCollaborationModal onClose={onClose} isOpen={modalOpen} onSubmit={submitModal}/>
    </Footer>
  </div>
}


export default Brand;
