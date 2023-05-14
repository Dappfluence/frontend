import React, {FC, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getFirestore, doc, getDoc, updateDoc} from "firebase/firestore";
import {ICollaboration, populateCollaboration} from "../ui/collaborations/components/CollaborationCard.types";
import {useConnectModal, useParticleProvider} from "@particle-network/connect-react-ui";
import RepresentativeBlock from "../ui/brand/collaboration/RepresentativeBlock";
import {useAccount} from "@particle-network/connect-react-ui";
import ProposalsBlock from "../ui/brand/collaboration/ProposalsBlock";
import CollaborationABI from "../assets/abi/Collaboration.json"
import Web3 from "web3";
import Footer from "../widgets/Footer";
import {Button} from "flowbite-react";
import ApplyForCollaborationModal from "../widgets/ApplyForCollaborationModal";
import {toast} from "react-toastify";
import {fetchInfluencer} from "../api/influencer";
import {CheckCircleIcon, ClockIcon} from "@heroicons/react/24/outline";
import UploadWorkModal from "../widgets/UploadWorkModal";


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

  const fetchStatus = async () => {
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
    setIsProofModalOpen(false)
    await toast.promise(async () => {
      try {
        await contract.methods.submitProofOfWork(data.proof).send({
          from: account,
        });
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
  const handleApprove = async (a: string) => {
    let web3 = new Web3(provider as any);
    // @ts-ignore
    const contract = new web3.eth.Contract(CollaborationABI, id);
    let index = 0;
    for (let i = 0; i < proposals.length; i++) {
      if (proposals[i].address === a) {
        index = i;
        break;
      }
    }

    await toast.promise(async () => {
      try {
        await contract.methods.acceptProposal(index).send({
          from: account,
        });
        await queryClient.invalidateQueries(['collaboration', id])
        await updateDoc(doc(getFirestore(), 'collaborations', id), {approved: a});
      } catch (e) {
        console.log(e)
      }
    }, {
      error: 'Error',
      pending: 'Accepting proposal...',
      success: 'Proposal accepted!',
    })
  }

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
      } catch (e) {
        console.log(e)
      }
    }, {
      error: 'Error',
      pending: 'Approving work...',
      success: 'Work approved!',
    })
  }

  const renderBrandFooter = () => {
    if (status.finished) {
      return <>
        <div>
          <p className={'text-xs'}>Proposals:</p>
          <h1 className={'text-lg font-bold'}>{proposals.length} Candidates</h1>
        </div>
        <div className={'text-3xl text-sky-700 uppercase'}>
          <CheckCircleIcon className={'w-12 h-12'}/>
        </div>
      </>
    }
    if (status.accepted && !status.powProvided) {
      return <>
        <div>
          <p className={'text-xs'}>Proposals:</p>
          <h1 className={'text-lg font-bold'}>{proposals.length} Candidates</h1>
        </div>
        <div className={'flex flex-row items-center gap-2'}>
          <span>Waiting for work</span>
          <ClockIcon className={'w-12 h-12 text-sky-700 animate-spin'}/>
        </div>

      </>
    }
    if (status.accepted && status.powProvided) {
      return <>
        <div>
          <p className={'text-xs'}>Proposals:</p>
          <h1 className={'text-lg font-bold'}>{proposals.length} Candidates</h1>
        </div>
        <div className={'flex flex-row items-end gap-2'}>
          <Button outline={true} color={'red'} onClick={() => alert('gfys')}>Request Changes</Button>
          <Button onClick={handleApproveWork}>Approve Work</Button>
        </div>
      </>
    }
    return <>
      <div>
        <p className={'text-xs'}>Proposals:</p>
        <h1 className={'text-lg font-bold'}>{proposals.length} Candidates</h1>
      </div>
      <div/>
    </>
  }

  if (!collaboration) return null;

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


        <div className={'w-[45%]'}>

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
            <RepresentativeBlock representatives={representatives}/>
          ) : (
            <ProposalsBlock approvable={!status.finished && !status.inProgress && !status.accepted}
                            onDeny={(a) => {
                              alert('deny ' + a)
                            }} onApprove={handleApprove} proposals={proposals}/>
          )}


          {/*{!isCurrentUserOwner && (*/}
          {/*  <div className={'mt-8 p-2 border rounded-lg border-green-600 bg-green-50'}>*/}
          {/*    <h3 className={'text-lg font-black'}>*/}
          {/*      Proof of work*/}
          {/*    </h3>*/}
          {/*    <p className={'text-xs mt-2'}>*/}
          {/*      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate doloremque et ex exercitationem*/}
          {/*      laborum nam nobis qui recusandae rerum vero. Asperiores beatae consectetur eveniet ex explicabo, labore*/}
          {/*      odit rem sequi.*/}
          {/*    </p>*/}
          {/*  </div>*/}
          {/*)*/}
          {/*}*/}
        </div>

        <Footer>
          {isCurrentUserOwner ? (
            renderBrandFooter()
          ) : (
            <>
              <div>
                <p className={'text-xs'}>Renumeration:</p>
                <h1 className={'text-base font-bold'}>{collaboration.reward}tBNB</h1>
              </div>
              {
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
                      <h1>The collaboration has already began.</h1>
                    </div>
                  ) : (
                    <div>
                      <Button onClick={handleApplicationModalOpen}>Apply for this collaboration</Button>
                      <ApplyForCollaborationModal collaborationAuthor={collaboration.brand.title}
                                                  isOpen={isApplicationModalOpen} onClose={handleApplicationModalClose}
                                                  onSubmit={handleApplicationModalSubmit}/>
                    </div>
                  )

                )
              }

            </>

          )}
        </Footer>
      </div>
    </div>
  );
};

export default Collaboration;
