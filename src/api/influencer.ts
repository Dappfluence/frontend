import {doc, getDoc, getFirestore} from "firebase/firestore";
import {IInfluencer} from "../shared/types/account";
import {httpsCallable, getFunctions} from "firebase/functions";

export const fetchInfluencer = async (address: string): Promise<IInfluencer> => {
  const data = await getDoc(doc(getFirestore(), "accounts", address));
  if (data.exists()) {
    let result = data.data()!;

    let twDataCall = httpsCallable(getFunctions(), 'getTwitterUserInfo');
    console.log(await twDataCall({id: 2357891467}))
    return {name: result.name, email: result.email};
  }
  return {name: '', email: ''};

}
