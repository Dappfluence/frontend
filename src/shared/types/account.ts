export interface IBrand {
  title: string;
  link: string;
  image: string;
}


export type TAccountType = "brand" | "influencer" | "unknown";


export interface IInfluencer {
  name: string;
  email: string;
  photoURL: string;
  [key: string]: any;
}
