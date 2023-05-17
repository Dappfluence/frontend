import {doc, getDoc, updateDoc, setDoc, getFirestore, getDocs, query, collection, where} from "firebase/firestore";
import {TAccountType} from "../shared/types/account";
import {ICollaboration, populateCollaboration} from "../ui/collaborations/components/CollaborationCard.types";


export const getType = async (address: string | undefined): Promise<TAccountType | null> => {
  if (!address) return null
  let data = await getDoc(doc(getFirestore(), "accounts", address));
  if (data.exists()) {
    return data.get("type");
  }
  return "unknown";
}

export const getDisplayName = async (address: string | undefined): Promise<string> => {
  if (!address) return "";
  let data = await getDoc(doc(getFirestore(), "accounts", address));
  if (data.exists()) {
    return data.get("displayName");
  }
  return "";
}

export const getBrandWebsite = async (address: string | undefined): Promise<string> => {
  if (!address) return "";
  let data = await getDoc(doc(getFirestore(), "accounts", address));
  if (data.exists()) {
    return data.get("website");
  }
  return "";
}


export const setType = async (address: string, type: TAccountType) => {
  let document = doc(getFirestore(), "accounts", address);
  await setDoc(document, {type});
}

export const setDisplayName = async (address: string, displayName: string) => {
  let document = doc(getFirestore(), "accounts", address);
  await updateDoc(document, {displayName});
}

export const setBrandWebsite = async (address: string, website: string) => {
  let document = doc(getFirestore(), "accounts", address);
  await updateDoc(document, {website});
}


export const fetchCollaborations = async (address: string, provider: any): Promise<ICollaboration[]> => {
  if (!provider || !address) return [];
  let docs = await getDocs(query(collection(getFirestore(), "collaborations"), where("approved", "==", address)));
  return Promise.all(docs.docs.map(e => ({id: e.id, ...e.data()})).map(populateCollaboration))
}



