import React, {FC} from 'react';
import {IInfluencer} from "../../../shared/types/account";
import Proposal from "./Proposal";
import {ArrowPathIcon} from "@heroicons/react/24/outline";

interface Props {
  proposals: Array<IInfluencer>;
  onApprove: (address: string) => void;
  onDeny: (address: string) => void;
  approvable?: boolean;
  statusLoading: boolean
}

const ProposalsBlock: FC<Props> = ({proposals, onApprove, onDeny, approvable = false, statusLoading}) => {
  return (
    <div className={'grow'}>
      <h3 className={'text-lg font-bold'}>{proposals.length} candidates</h3>

      <div className={'mt-4'}>
        {
          statusLoading ? (
            <ArrowPathIcon className={'w-6 h-6 animate-spin'}/>
          ) : (
            proposals.map((proposal, index) => (
              <div key={index}>
                <Proposal name={proposal.displayName} email={proposal.email} address={proposal.address}
                          photoURL={proposal.photoURL} approved={proposals.findIndex(e => e.approved) >= 0}
                          approvable={approvable} onDeny={onDeny}
                          onApprove={onApprove}/>
                <hr className={'mt-4'}/>
              </div>
            ))
          )
        }


      </div>
    </div>
  );
};

export default ProposalsBlock;
