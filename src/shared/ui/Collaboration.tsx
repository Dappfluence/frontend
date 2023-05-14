import React, {FC} from "react";
import {ICollaboration} from "../../ui/collaborations/components/CollaborationCard.types";
import {Link} from "react-router-dom";


interface IProps {
  collaboration: ICollaboration,
}

export const Collaboration: FC<IProps> = ({collaboration: collab}) => {



  return (
    <div
         className='grow p-6 rounded-lg border border-blue-200 w-full flex justify-between items-center gap-4'>
      <div>
        <img src={collab.brand.image} alt={collab.brand.title}/>
      </div>
      <div>
        <p className={'flex gap-3 text-xs'}>
          {collab.tags.map(tag => (
            <span key={tag}>{tag}</span>
          ))}
        </p>
        <h4 className={'text-lg font-extrabold mt-1'}>
          {collab.content.title}
        </h4>
      </div>
      <div>
        <h4 className={'whitespace-nowrap text-lg font-extrabold'}>{collab.reward}tBnB</h4>
        <Link to={`/collaboration/${collab.id}`}><span className={'text-base font-bold text-blue-700'}>View more</span></Link>
      </div>
    </div>
  )
}
