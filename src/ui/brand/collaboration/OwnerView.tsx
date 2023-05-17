import React, {FC, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getFirestore, doc, getDoc, updateDoc} from "firebase/firestore";

import {useConnectModal, useParticleProvider} from "@particle-network/connect-react-ui";
import {useAccount} from "@particle-network/connect-react-ui";
import Web3 from "web3";
import {Button} from "flowbite-react";
import {toast} from "react-toastify";
import {ArrowPathIcon, CheckCircleIcon, ClockIcon} from "@heroicons/react/24/outline";
import {fetchInfluencer} from "../../../api/influencer";
import CollaborationABI from "../../../assets/abi/Collaboration.json"
import RepresentativeBlock from "./RepresentativeBlock";
import ProposalsBlock from "./ProposalsBlock";
import Footer from "../../../widgets/Footer";
import {ICollaboration, populateCollaboration} from "../../collaborations/components/CollaborationCard.types";
import Card from "../components/Card";


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

const OwnerView: FC = () => {
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

        fetchStatus();
      } catch (e) {
        throw new Error((e as { message: string }).message);
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

  const renderBrandFooter = () => {
    if (statusLoading) {
      return <ArrowPathIcon className={'w-6 h-6 animate-spin'}/>
    }

    if (status.finished) {
      return <>
        <div>
          <p className={'text-xs'}>Proposals:</p>
          <h1 className={'text-lg font-bold'}>{proposals.length} Candidates</h1>
        </div>
        <div className={'text-xl text-green-600 flex gap-4 items-center'}>
          <h1>The collaboration is finished</h1>
          <CheckCircleIcon className={'w-12 h-12'}/>
        </div>
      </>
    }
    if (status.accepted) {
      if (!status.powProvided) {
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
      } else {
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
    <div className={'mt-[144px] container mx-auto mb-[100px] flex gap-5'}>
      <div className={'w-1/2 flex flex-col gap-5'}>
        <Card>
          <h1 className={'text-3xl font-black'}>
            {collaboration?.content.title}
          </h1>
        </Card>

        <Card>
          <p className={'text-lg'}>
            {collaboration.content.description}
          </p>
        </Card>

        <Card>
          <RepresentativeBlock representatives={representatives}/>
        </Card>


      </div>

      <div className={'w-1/2 flex flex-col gap-5'}>
        <Card>
          <ProposalsBlock statusLoading={statusLoading}
                          approvable={!status.finished && !status.inProgress && !status.accepted}
                          onDeny={(a) => {
                            alert('deny ' + a)
                          }} onApprove={handleApprove} proposals={proposals}/>
        </Card>

        <Card flex={false}>
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
        </Card>

        <Card flex={false}>
          <h3 className={'text-lg font-bold'}>Additional information</h3>

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
        </Card>

      </div>


      <div className={'flex mt-5 gap-16 justify-between'}>

        <Footer>
          {renderBrandFooter()}
        </Footer>
      </div>
    </div>
  );
};

export default OwnerView;
