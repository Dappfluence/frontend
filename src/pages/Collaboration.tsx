import React, {FC, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getFirestore, doc, getDoc} from "firebase/firestore";
import {ICollaboration, populateCollaboration} from "../ui/collaborations/components/CollaborationCard.types";
import {useConnectModal, useParticleProvider} from "@particle-network/connect-react-ui";
import RepresentativeBlock from "../ui/brand/collaboration/RepresentativeBlock";
import {useAccount} from "@particle-network/connect-react-ui";
import CollaborationABI from "../assets/abi/Collaboration.json"
import Web3 from "web3";
import Footer from "../widgets/Footer";
import {Button} from "flowbite-react";
import ApplyForCollaborationModal from "../widgets/ApplyForCollaborationModal";
import {toast} from "react-toastify";
import {fetchInfluencer} from "../api/influencer";
import {ArrowPathIcon} from "@heroicons/react/24/outline";
import UploadWorkModal from "../widgets/UploadWorkModal";
import OwnerView from "../ui/brand/collaboration/OwnerView";


const representatives = [{
  name: 'Wellington Smytheington',
  email: 'w.smytheington@gucci.com'
}, {
  name: 'Abernathy Buckminster',
  email: 'abuckminster@gucci.com'
}, {
  name: 'Beauchamp Beaumontworth',
  email: 'beaumontworth.b@gucci.com'
}]

const Collaboration: FC = () => {
  const [isCurrentUserOwner, setIsCurrentUserOwner] = useState(false);
  const [isCurrentUserParticipating, setIsCurrentUserParticipating] = useState(false);
  const {id = ''} = useParams();
  const account = useAccount();

  const provider = useParticleProvider();

  const [proposals, setProposals] = useState<any[]>([])
  const {data: collaboration = null} = useQuery<unknown, unknown, ICollaboration>({
    queryKey: ['collaboration', id],
    queryFn: async () => {
      let data = await getDoc(doc(getFirestore(), 'collaborations', id))
      if (!data.exists() || data.data() === undefined) {
        return null
      } else {
        return populateCollaboration(data.data()!)
      }
    }
  });
  useEffect(() => {
    if (provider) {
      fetchStatus()
    }
  }, [provider])


  const [status, setStatus] = useState<any>({finished: true});

  const [statusLoading, setStatusLoading] = useState(false);
  const fetchStatus = async () => {
    setStatusLoading(true)
    let web3 = new Web3(provider as any);
    // @ts-ignore
    const contract = new web3.eth.Contract(CollaborationABI, id);
    const accepted = await contract.methods.proposalAccepted().call();
    const inProgress = await contract.methods.workInProgress().call();
    const powProvided = await contract.methods.powProvided().call();
    const finished = await contract.methods.finished().call();
    setStatus({
      accepted,
      inProgress,
      powProvided,
      finished
    })
    setStatusLoading(false)
  }
  const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);
  const [isProofModalOpen, setIsProofModalOpen] = useState(false);

  const {openConnectModal} = useConnectModal()
  const address = useAccount()
  const handleApplicationModalOpen = () => {
    if (address) return setIsApplicationModalOpen(true);
    openConnectModal!()
  }

  const handleApplicationModalClose = () => {
    setIsApplicationModalOpen(false);
  }

  const handleProofModalOpen = () => {
    setIsProofModalOpen(true);
  }

  const handleProofModalClose = () => {
    setIsProofModalOpen(false);
  }

  const handleApplicationModalSubmit = async (data: any) => {
    if (account === undefined) return;
    let web3 = new Web3(provider as any);
    // @ts-ignore
    const contract = new web3.eth.Contract(CollaborationABI, id);
    setIsApplicationModalOpen(false)
    await toast.promise(async () => {
      try {
        await contract.methods.createProposal(data.skills).send({
          from: account,
        });
        await fetchStatus();
      } catch (e) {
        console.log(e)
      }
    }, {
      error: 'Error',
      pending: 'Creating proposal...',
      success: 'Proposal created!',
    })

  }

  const handleUploadProofOfWork = async (data: any) => {
    if (account === undefined) return;
    let web3 = new Web3(provider as any);
    // @ts-ignore
    const contract = new web3.eth.Contract(CollaborationABI, id);
    setIsProofModalOpen(false);
    await toast.promise(async () => {
      try {
        await contract.methods.submitProofOfWork(data.proof).send({
          from: account,
        });
        fetchStatus();

      } catch (e) {
        console.log(e)
      }
    }, {
      error: 'Error',
      pending: 'Sending proof...',
      success: 'Proof sent!',
    })

  }

  useEffect(() => {
    if (provider) {
      fetchProposals()
    }
  }, [provider])


  const fetchProposals = async () => {
    let web3 = new Web3(provider as any);

    // @ts-ignore
    const contract = new web3.eth.Contract(CollaborationABI, id);
    const proposals = await contract.methods.getProposals().call();
    let result = await Promise.all(proposals.map((e: any) => e[1]).map(fetchInfluencer))

    setProposals(result)
  }
  useEffect(() => {
    if (collaboration?.creator === account) {
      setIsCurrentUserOwner(true)
    } else {
      setIsCurrentUserOwner(false)
    }

    if (collaboration?.approved === account) {
      setIsCurrentUserParticipating(true)
    } else {
      setIsCurrentUserParticipating(false);
    }
  }, [collaboration])


  const queryClient = useQueryClient();

  const handleApproveWork = async () => {
    let web3 = new Web3(provider as any);
    // @ts-ignore
    const contract = new web3.eth.Contract(CollaborationABI, id);

    await toast.promise(async () => {
      try {
        await contract.methods.approveWork().send({
          from: account,
        });
        await queryClient.invalidateQueries(['collaboration', id])
        fetchStatus();
      } catch (e) {
        throw new Error((e as { message: string }).message);
      }
    }, {
      error: 'Error',
      pending: 'Approving work...',
      success: 'Work approved!',
    })
  }

  if (!collaboration) return null;

  if (isCurrentUserOwner) return <OwnerView/>

  return (
    <div className={'mt-[144px] container mx-auto mb-[100px]'}>
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
          <img className={'w-full'} src={collaboration.brand.image} alt=""/>
        </div>
      </div>

      <div className={'flex mt-16 gap-16 justify-between'}>

        <div className={'w-[45%]'}>

          <h3 className={'text-lg font-bold'}>
            {collaboration.content.title}
          </h3>

          <p className={'text-lg mt-4'}>
            {collaboration.content.description}
          </p>

        </div>


        <div className={'w-[45%]'}>

          <h3 className={'text-lg font-bold'}>Main Requirements</h3>

          <div className={'mt-5 flex gap-6'}>
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
          </div>

          <div className={'mt-8'}>
            <RepresentativeBlock representatives={representatives}/>
          </div>

        </div>

        <Footer>
          <div>
            <p className={'text-xs'}>Renumeration:</p>
            <h1 className={'text-base font-bold'}>{collaboration.reward}tBNB</h1>
          </div>
          {
            statusLoading ? (
              <ArrowPathIcon className={'w-6 h-6 animate-spin'}/>
            ) : (
              isCurrentUserParticipating ? (
                status.accepted && (
                  status.powProvided ? (
                    status.finished ? (
                      <h1>The renumeration was sent to your wallet: {account}</h1>
                    ) : (
                      <h1>Waiting for company representative to review your work. <br/>You don’t need to do anything
                        for now.</h1>
                    )
                  ) : (
                    <div>
                      <div className={'flex gap-2'}>
                        <div>
                          <p>Company representative approved your participation.</p>
                          <p>Time left to upload your work: 1 month 25 days 14 hours</p>
                        </div>
                        <Button onClick={handleProofModalOpen}>Upload work</Button>
                      </div>

                      <UploadWorkModal collaborationAuthor={collaboration.brand.title}
                                       isOpen={isProofModalOpen} onClose={handleProofModalClose}
                                       onSubmit={handleUploadProofOfWork}/>
                    </div>
                  )
                )
              ) : (
                status.accepted ? (
                  <div>
                    <h1>The collaboration has already began or finished.</h1>
                  </div>
                ) : proposals.some(proposal => proposal.address === account) ? (
                  <h1>Waiting for company representative to approve your participation. <br/>
                    You don’t need to do anything for now..</h1>
                ) : (
                  <div>
                    <Button onClick={handleApplicationModalOpen}>Apply for this collaboration</Button>
                    <ApplyForCollaborationModal collaborationAuthor={collaboration.brand.title}
                                                isOpen={isApplicationModalOpen}
                                                onClose={handleApplicationModalClose}
                                                onSubmit={handleApplicationModalSubmit}/>
                  </div>
                )

              )
            )
          }
        </Footer>
      </div>
    </div>
  );
};

export default Collaboration;
