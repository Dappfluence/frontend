import {doc, getDoc, updateDoc, setDoc, getFirestore, getDocs, query, collection, where} from "firebase/firestore";
import {IBrand, TAccountType} from "../shared/types/account";
import {ICollaboration, populateCollaboration} from "../ui/collaborations/components/CollaborationCard.types";


export const getType = async (address: string | undefined): Promise<TAccountType> => {
  if (!address) return "unknown";
  let data = await getDoc(doc(getFirestore(), "accounts", address.toLowerCase()));
  if (data.exists()) {
    return data.get("type");
  }
  return "unknown";
}


export const setType = async (address: string, type: TAccountType) => {
  let document = doc(getFirestore(), "accounts", address.toLowerCase());
  await setDoc(document, {type: type});
}


export const fetchCollaborations = async (address: string, provider: any): Promise<ICollaboration[]> => {
  if (!provider || !address) return [];
  let docs = await getDocs(query(collection(getFirestore(), "collaborations"), where("approved", "==", address.toLowerCase())));
  return Promise.all(docs.docs.map(e => ({id: e.id, ...e.data()})).map(populateCollaboration))
}



