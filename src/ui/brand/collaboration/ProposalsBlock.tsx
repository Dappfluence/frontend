import React, {FC} from 'react';
import Representative from "./Representative";
import {IInfluencer} from "../../../shared/types/account";
import Proposal from "./Proposal";

interface Props {
  proposals: Array<IInfluencer>;
  onApprove: (address: string) => void;
  onDeny: (address: string) => void;

}

const ProposalsBlock: FC<Props> = ({proposals, onApprove, onDeny}) => {
  return (
    <div className={'mt-8'}>
      <h3 className={'text-lg font-bold'}>{proposals.length} New cadidates</h3>

      <div className={'mt-4'}>
        {proposals.map(proposal => (
          <>
            <Proposal name={proposal.name} email={proposal.email} address={proposal.address} photoURL={proposal.photoURL} onDeny={onDeny} onApprove={onApprove}/>
            <hr/>
          </>
        ))}

      </div>
    </div>
  );
};

export default ProposalsBlock;
