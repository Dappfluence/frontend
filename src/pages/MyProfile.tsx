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
import {Modal} from "flowbite-react";
import {useNavigate} from "react-router-dom";

export const MyProfile: FC = () => {

  const {accountLoading, account} = useAccountInfo()

  const {data: type = 'unknown', refetch} = useQuery<unknown, unknown, TAccountType>({
    queryKey: ['accountType'],
    queryFn: async () => getType(account!)
  })

  const navigate = useNavigate();

  useEffect(() => {
    if(!accountLoading) {
      if(account === undefined) {
        navigate('/')
      } else {
        refetch()
      }
    }
  }, [accountLoading])

  const {mutate} = useMutation<unknown, unknown, TAccountType>({
    mutationKey: ['accountType'],
    mutationFn: async (type: TAccountType) => setType(account!, type)
  })

  const handleChoice = async (mutationOption: TAccountType) => {
    await mutate(mutationOption);
    await refetch();
  }


  if (accountLoading) return <div>Loading...</div>

  if (type === 'brand') return <Brand/>
  if (type === 'influencer') return <InfluencerProfile/>
  return (
      <Modal
        show={true}
        size="md"
        popup={true}
      >
        <Modal.Body className={'bg-white'}>
          <div className="text-center p-8 pt-12">
            <h3 className="mb-8 text-3xl font-thin">
              Who are you?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                className={'py-2 px-4 text-blue-700 border border-blue-700 rounded-xl'}
                onClick={() => handleChoice('brand')}
              >
                Brand
              </button>
              <button
                className={'py-2 px-4 text-green-700 border border-green-700 rounded-xl'}
                onClick={() => handleChoice('influencer')}
              >
                Influencer
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    )
}
