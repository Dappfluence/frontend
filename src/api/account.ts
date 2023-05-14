import {doc, getDoc, updateDoc, setDoc, getFirestore} from "firebase/firestore";
import {IBrand, TAccountType} from "../shared/types/account";


export const getType = async (address: string | undefined): Promise<TAccountType> => {
  if (!address) return "unknown";
  let data = await getDoc(doc(getFirestore(), "accounts", address));
  if (data.exists()) {
    return data.get("type");
  }
  return "unknown";
}


export const setType = async (address: string, type: TAccountType) => {
  let document = doc(getFirestore(), "accounts", address);
  console.log(address, type);
  await setDoc(document, {type: type});

}



