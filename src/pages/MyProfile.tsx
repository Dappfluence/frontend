import React, {FC, useEffect} from "react";
import {useAccountInfo} from "@particle-network/connect-react-ui";
import {useMutation, useQuery} from "@tanstack/react-query";
import {TAccountType} from "../shared/types/account";
import {getType, setType} from "../api/account";
import InfluencerProfile from "./InfluencerProfile";
import Brand from "./Brand";
import classNames from "classnames";
import Card from "../ui/brand/components/Card";
import {BuildingStorefrontIcon, UserPlusIcon} from "@heroicons/react/24/outline";

export const MyProfile: FC = () => {

  const {accountLoading, account} = useAccountInfo()

  const {data: type = 'unknown', refetch} = useQuery<unknown, unknown, TAccountType>({
    queryKey: ['accountType'],
    queryFn: async () => getType(account!)
  })

  useEffect(() => {

    if (!accountLoading && account !== undefined) refetch()

  }, [accountLoading])

  const {mutate} = useMutation<unknown, unknown, TAccountType>({
    mutationKey: ['accountType'],
    mutationFn: async (type: TAccountType) => setType(account!, type)
  })


  if (accountLoading) return <div>Loading...</div>

  if (type === 'brand') return <Brand/>
  if (type === 'influencer') return <InfluencerProfile/>
  return <div className={'text-center'}>
    <h2 className={'text-5xl py-16'}>Who are you?</h2>
    <div className={classNames(' flex flex-row justify-center gap-12')}>
      <Card className={'w-1/3 text-3xl cursor-pointer hover:text-blue-500 hover:shadow transition-all duration-200'}
            onClick={() => mutate('brand')}>
        <BuildingStorefrontIcon className={'w-12 h-12'}/>
        Brand
      </Card>
      <Card className={'w-1/3 text-3xl cursor-pointer hover:shadow hover:text-red-600 transition-all duration-200'}
            onClick={() => mutate('influencer')}>
        <UserPlusIcon className={'w-12 h-12'}/>
        Influencer
      </Card>
    </div>
  </div>
}
