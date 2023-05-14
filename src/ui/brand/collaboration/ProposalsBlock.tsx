import React, {FC} from 'react';
import {IInfluencer} from "../../../shared/types/account";
import Proposal from "./Proposal";

interface Props {
  proposals: Array<IInfluencer>;
  onApprove: (address: string) => void;
  onDeny: (address: string) => void;
  approvable?: boolean
}

const ProposalsBlock: FC<Props> = ({proposals, onApprove, onDeny, approvable = false}) => {
  return (
    <div className={'mt-8'}>
      <h3 className={'text-lg font-bold'}>{proposals.length} candidates</h3>

      <div className={'mt-4'}>
        {proposals.map((proposal, index) => (
          <div key={index}>
            <Proposal name={proposal.name} email={proposal.email} address={proposal.address}
                      photoURL={proposal.photoURL} approved={proposals.findIndex(e => e.approved) >= 0}
                      approvable={approvable} onDeny={onDeny}
                      onApprove={onApprove}/>
            <hr/>
          </div>
        ))}

      </div>
    </div>
  );
};

export default ProposalsBlock;
