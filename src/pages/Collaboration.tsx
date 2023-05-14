import React, {FC, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useQuery} from "@tanstack/react-query";
import {getFirestore, doc, getDoc, setDoc, collection} from "firebase/firestore";
import {ICollaboration, populateCollaboration} from "../ui/collaborations/components/CollaborationCard.types";
import {useParticleProvider} from "@particle-network/connect-react-ui";
import RepresentativeBlock from "../ui/brand/collaboration/RepresentativeBlock";
import {useAccount} from "@particle-network/connect-react-ui";
import ProposalsBlock from "../ui/brand/collaboration/ProposalsBlock";
import CollaborationABI from "../assets/abi/Collaboration.json"
import Web3 from "web3";
import Footer from "../widgets/Footer";
import {Button} from "flowbite-react";
import ApplyForCollaborationModal from "../widgets/ApplyForCollaborationModal";
import FactoryABI from "../assets/abi/Factory.json";
import {toast} from "react-toastify";
import {fetchInfluencer} from "../api/influencer";


const Collaboration: FC = () => {
  const [isCurrentUserOwner, setIsCurrentUserOwner] = useState(false);
  const {id = ''} = useParams();
  const account = useAccount();

  const provider = useParticleProvider();

  const [proposals, setProposals] = useState<any[]>([])
  const {data: collaboration, refetch} = useQuery<unknown, unknown, ICollaboration>({
    queryKey: ['collaboration', id],
    queryFn: async () => {
      let data = await getDoc(doc(getFirestore(), 'collaborations', id))
      if (!data.exists() || data.data() === undefined) {
        return undefined
      } else {
        return populateCollaboration(data.data()!, id)
      }
    }
  });
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);

  const handleApplicationModalOpen = () => {
    setIsApplicationModalOpen(true);
  }

  const handleApplicationModalClose = () => {
    setIsApplicationModalOpen(false);
  }

  const handleApplicationModalSubmit = async (data) => {
    if (account === undefined) return;
    let web3 = new Web3(provider as any);
    const contract = new web3.eth.Contract(CollaborationABI, id);
    setIsApplicationModalOpen(false)
    await toast.promise(async () => {
      try {
        await contract.methods.createProposal(data.skills).send({
          from: account,
        });
      } catch (e) {
        console.log(e)
        throw new Error(e)
      }
    }, {
      error: 'Error',
      pending: 'Creating proposal...',
      success: 'Proposal created!',
    })

  }

  useEffect(() => {

    if (provider) {
      fetchRepresentatives()
    }
  }, [provider])

  const fetchRepresentatives = async () => {
    let web3 = new Web3(provider as any);
    const contract = new web3.eth.Contract(CollaborationABI, id);
    const proposals = await contract.methods.getProposals().call();
    let result = await Promise.all(proposals.map(e => e[1]).map(fetchInfluencer))

    console.log(result)

    setProposals(result)

  }
  useEffect(() => {
    if (collaboration?.creator === account) {
      setIsCurrentUserOwner(true)
    } else {
      setIsCurrentUserOwner(false)
    }
  }, [collaboration])


  const handleApprove = async (a) => {
    let web3 = new Web3(provider as any);
    const contract = new web3.eth.Contract(CollaborationABI, id);
    await toast.promise(async () => {
      // try {
      //   let result = await contract.methods.createCollaboration(date).send({
      //     from: account,
      //     value: web3.utils.toWei(data.budget, 'ether')
      //   });
      //   await setDoc(doc(collection(getFirestore(), "collaborations"), result.events.CollaborationCreated.returnValues[0]), {
      //     title: data.title,
      //     deadline: date,
      //     budget: data.budget,
      //     creator: account
      //   });
      // } catch (e) {
      //   console.log(e)
      //   throw new Error(e)
      // }
    }, {
      error: 'Error',
      pending: 'Creating collaboration...',
      success: 'Collaboration created!',
    })
    console.log(a)
  }

  if (!collaboration) return null;

  return (
    <div className={'mt-[144px] container mx-auto'}>
      <div className={'flex justify-between items-center gap-16'}>
        <div className={'grow w-1/2'}>
          <h1 className={'text-5xl font-black'}>
            {collaboration?.brand.title}
          </h1>
          <div className={'mt-6 flex justify-between'}>
            <div>
              <p className={'text-xs'}>Collaboration type:</p>
              <p className={'text-base font-semibold mt-1'}>{collaboration.type} Collaboration</p>
            </div>
            <div>
              <p className={'text-xs'}>Dates:</p>
              <p className={'text-base font-semibold mt-1'}>
                <span>{new Date(collaboration.dates.start * 1000).toLocaleDateString()}</span>
                <span> - </span>
                <span>{new Date(collaboration.dates.end * 1000).toLocaleDateString()}</span>
              </p>
            </div>
            <div>
              <p className={'text-xs'}>Brand Link:</p>
              <div className={'mt-1'}>
                <a href='#' className={'text-base text-blue-500 font-semibold'}>{collaboration.brand.link}</a>
              </div>
            </div>
          </div>
        </div>
        <div className={'grow w-1/2 flex items-center justify-center'}>
          <img src={collaboration.brand.image} alt=""/>
        </div>
      </div>

      <div className={'flex mt-16 gap-16 justify-between'}>

        <div className={'w-[45%]'}>

          <h3 className={'text-lg font-bold'}>
            Create an Engaging Video Featuring Gucci Products!
          </h3>

          <p className={'text-lg mt-4'}>
            We're looking for fashion and style influencers to create a sponsored video showcasing our latest
            collection. Your video should feature one or more of our products from this collection in an authentic and
            engaging way, while also highlighting the unique history and significance behind this collection. For
            example, you could create a lookbook video featuring our new collection, or film a tutorial on how to style
            our products.
            <br/>
            <br/>
            For this video collaboration, we're specifically looking for influencers who can showcase their unique style
            and creativity while featuring our Bamboo 1947 Collection. You should highlight the versatility and elegance
            of the collection by incorporating it into your everyday life, whether that's through creating a lookbook, a
            day-in-the-life vlog, or any other creative video concept that showcases our products and the Gucci
            lifestyle.
          </p>

        </div>


        <div>

          <h3 className={'text-lg font-bold'}>Main Requirements</h3>

          <div className={'mt-4 flex gap-6'}>
            <div>
              <p className={'text-xs'}>Platform:</p>
              <p className={'text-base font-semibold mt-1'}>YouTube</p>
            </div>
            <div>
              <p className={'text-xs'}>Amount of Subscriptions:</p>
              <p className={'text-base font-semibold mt-1'}>{'>'} 1 200 000</p>
            </div>
            <div>
              <p className={'text-xs'}>Account Age:</p>
              <p className={'text-base font-semibold mt-1'}>{'>'} 2 years</p>
            </div>
            <div>
              <p className={'text-xs'}>Amount of videos:</p>
              <p className={'text-base font-semibold mt-1'}>{'>'} 1 000</p>
            </div>
          </div>

          {!isCurrentUserOwner ? (
            <RepresentativeBlock representatives={proposals}/>
          ) : (
            <ProposalsBlock onDeny={(a) => {
              alert('deny ' + a)
            }} onApprove={handleApprove} proposals={proposals}/>
          )}

        </div>

        <Footer>
          {isCurrentUserOwner ? (123) : (
            <>
              <div>
                <p className={'text-xs'}>Renumeration:</p>
                <h1 className={'text-base font-bold'}>1tBNB</h1>
              </div>
              <div>
                <Button onClick={handleApplicationModalOpen}>Apply for this collaboration</Button>
                <ApplyForCollaborationModal collaborationAuthor={collaboration.brand.title}
                                            isOpen={isApplicationModalOpen} onClose={handleApplicationModalClose}
                                            onSubmit={handleApplicationModalSubmit}/>
              </div>
            </>
          )}
        </Footer>
      </div>
    </div>
  );
};

export default Collaboration;
