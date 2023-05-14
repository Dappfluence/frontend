import {doc, getDoc, getFirestore} from "firebase/firestore";
import {IInfluencer} from "../shared/types/account";

export const fetchInfluencer = async (address: string): Promise<IInfluencer> => {
  const data = await getDoc(doc(getFirestore(), "accounts", address));
  if (data.exists()) {
    let result = data.data()!;
    return {name: result.name, email: result.email};
  }
  return {name: '', email: ''};

}
