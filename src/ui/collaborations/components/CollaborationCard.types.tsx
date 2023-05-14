import {DocumentData} from "firebase/firestore";
import {fetchBrand} from "../../../api/brand";
import {IBrand} from "../../../shared/types/account";

export enum CollaborationType {
  VIDEO = 'VIDEO',
  POST = 'POST',
  BLOG_POST = 'BLOG_POST',
  INSTAGRAM_POST = 'INSTAGRAM_POST',
  TWITTER_POST = 'TWITTER_POST',
  FACEBOOK_POST = 'FACEBOOK_POST',
  TELEGRAM_POST = 'TELEGRAM_POST'
}

export interface ICollaboration {
  id: string
  type: CollaborationType,
  dates: {
    start: number, //unix timestamp
    end: number //unix timestamp
  },
  brand: IBrand,
  content: {
    title: string,
    description: string,
  },
  creator: string,
  tags: string[],
  reward: number,
  approved?: string;
  proposals: string[],
  accepted?: boolean,
  inProgress?: boolean,
  powProvided?: boolean,
  finished?: boolean
}

export type TStatus = "CREATED" | "IN_PROGRESS" | "COMPLETED" | "ACCEPTED"


export interface CollaborationCardProps {
  collaboration: ICollaboration
}


export async function populateCollaboration(doc: DocumentData): Promise<ICollaboration> {
  let data = doc
  return {
    id: doc.id,
    type: data.type || "POST",
    dates: {
      start: data.deadline,
      end: data.deadline
    },
    brand: await fetchBrand(data.creator),
    content: {
      title: data.title,
      description: data.title
    },
    creator: data.creator,
    tags: [],
    approved: data.approved,
    reward: data.budget,
    proposals: [],
    approved: data.approved,
  } as ICollaboration
}
