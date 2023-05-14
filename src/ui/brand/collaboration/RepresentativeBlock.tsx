import React, {FC} from 'react';
import Representative from "./Representative";

interface Props {
  representatives: Array<{name: string, email:string}>
}
const RepresentativeBlock: FC<Props> = ({representatives}) => {
  return (
    <div className={'mt-8'}>
      <h3 className={'text-lg font-bold'}>4 Representatives</h3>
      <p className={'text-xs'}>Feel free to ask our representative any questions regarding the task</p>

      <div className={'mt-4'}>
        {representatives.map(repr => (
          <>
            <Representative name={repr.name} email={repr.email} />
            <hr/>
          </>
        ))}

      </div>
    </div>
  );
};

export default RepresentativeBlock;
