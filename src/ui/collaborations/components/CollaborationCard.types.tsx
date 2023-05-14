import {DocumentData} from "firebase/firestore";

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
  brand: {
    title: string
    link: string,
    image: string
  },
  content: {
    title: string,
    description: string,
  },
  tags: string[],
  reward: number,
  status: TStatus
}

export type TStatus = "CREATED" | "IN_PROGRESS" | "COMPLETED" | "ACCEPTED"


export interface CollaborationCardProps {
  collaboration: ICollaboration
}


export function populateCollaboration(doc: DocumentData): ICollaboration {
  let data = doc

  console.log(data)
  return {
    id: doc.id,
    type: data.type || "VIDEO",
    dates: {
      start: data.deadline,
      end: data.deadline
    },
    brand: {
      title: "GUCCI",
      link: "test",
      image: "https://via.placeholder.com/150x50"

    },
    content: {
      title: data.title,
      description: data.title
    },
    tags: [],
    reward: data.budget,
    status: 'IN_PROGRESS' //todo
  }
}
