import React, {FC} from 'react';
import {IInfluencer} from "../../../shared/types/account";
import {useNavigate} from "react-router-dom";
import classNames from "classnames";

interface Props extends IInfluencer {
  onDeny: (address: string) => void;
  onApprove: (address: string) => void;
  address: string;
  approved?: boolean,
  approvable?: boolean
}

const Proposal: FC<Props> = ({
                               email,
                               name,
                               photoURL,
                               onDeny,
                               onApprove,
                               address,
                               approved = false,
                               approvable = true
                             }) => {
  const navigate = useNavigate()
  return (
    <div className={classNames('flex py-3 items-center', {'bg-sky-500 bg-opacity-20': approved})}>
      <div
        className={'rounded-full w-[64px] h-[64px] flex items-center justify-center overflow-hidden border cursor-pointer'}
        onClick={() => navigate('/influencer/' + address)}>
        <img src={photoURL} alt={name}/>
      </div>
      <div className={'grow ml-4 cursor-pointer'} onClick={() => navigate('/influencer/' + address)}>
        <h4 className={'text-base font-semibold'}>{name}</h4>
        <p className={'text-xs'}>{email}</p>
      </div>
      {approvable && <div className={'flex gap-2'}>
        <button className={'px-4 py-2 text-red-700 border border-red-700 rounded-xl'}
                onClick={() => onDeny(address)}>Deny
        </button>
        <button className={'px-4 py-2 text-blue-700 border border-blue-700 rounded-xl'}
                onClick={() => onApprove(address)}>Approve
        </button>

      </div>}
    </div>
  );
};

export default Proposal;
