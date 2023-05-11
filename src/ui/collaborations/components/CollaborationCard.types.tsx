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

export interface Collaboration {
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
  reward: number
}


export interface CollaborationCardProps {
  collaboration: Collaboration
}


export function populateCollaboration(doc: DocumentData): Collaboration {
  let data = doc
  return {
    id: doc.id,
    type: data.type,
    dates: {
      start: data.dates.start,
      end: data.dates.end
    },
    brand: {
      title: data.brand.title,
      link: data.brand.link,
      image: data.brand.image

    },
    content: {
      title: data.content.title,
      description: data.content.description
    },
    tags: data.tags,
    reward: data.reward
  }
}
