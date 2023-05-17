import React, {FC, useEffect, useState} from "react";
import {useAccountInfo} from "@particle-network/connect-react-ui";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {TAccountType} from "../shared/types/account";
import {getType, setBrandWebsite, setDisplayName, setType} from "../api/account";
import InfluencerProfile from "./InfluencerProfile";
import Brand from "./Brand";
import {useNavigate} from "react-router-dom";
import {RegisterModal} from "../ui/profile/component";


export const MyProfile: FC = () => {
  const [step, setStep] = useState(1);
  const [intermediateType, setIntermediateType] = useState<TAccountType | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const {accountLoading, account} = useAccountInfo()

  const {data: type = null, refetch, isLoading} = useQuery<unknown, unknown, TAccountType>({
    queryKey: ['accountTypeGetter'],
    queryFn: async () => getType(account!),
  })

  const navigate = useNavigate()

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!accountLoading) {
      if (account === undefined) {
        navigate('/')
      } else {
        refetch()
      }
    }
  }, [accountLoading]);

  useEffect(() => {
    console.log(type)
    if (type === 'brand' || type === 'influencer' || type == null) {
      setOpenModal(false)
    } else {
      setOpenModal(true)
    }
  }, [type])

  const {mutate} = useMutation<unknown, unknown, TAccountType>({
    mutationKey: ['accountType'],
    mutationFn: async (type: TAccountType) => setType(account!, type)
  })

  const {mutate: nameMutate} = useMutation<unknown, unknown, string>({
    mutationKey: ['displayName'],
    mutationFn: async (displayName: string) => setDisplayName(account!, displayName),
    onSettled: () => queryClient.invalidateQueries(['displayName'])
  })
  const {mutate: websiteMutate} = useMutation<unknown, unknown, string>({
    mutationKey: ['brandWebsite'],
    mutationFn: async (website: string) => setBrandWebsite(account!, website)
  })

  const handleTypeChoice = (type: TAccountType) => {
    setIntermediateType(type);
    if (type === 'influencer') {
      setStep(2);
    } else if (type === 'brand') {
      setStep(3);
    }
  }


  const handleSubmit = async (name: string, website?: string) => {
    if (intermediateType) {
      await mutate(intermediateType);
    }
    await nameMutate(name);
    if (website) {
      await websiteMutate(website);
    }

    await refetch();
  }

  if (accountLoading || isLoading) return <div>Loading...</div>

  return (
    <>

      {type === 'brand' && <Brand/>}
      {type === 'influencer' && <InfluencerProfile/>}

      <RegisterModal open={openModal} step={step} handleTypeChoice={handleTypeChoice}
                     handleSubmit={handleSubmit}/>
    </>

  )
}
