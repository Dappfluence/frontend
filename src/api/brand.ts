import {doc, getDoc, getFirestore} from "firebase/firestore";
import {IBrand} from "../shared/types/account";

export const fetchBrand = async (address: string | null): Promise<IBrand> => {
  if(!address) {
    return {name: '', link: ''};
  }
  const data = await getDoc(doc(getFirestore(), "accounts", address));
  if (data.exists()) {
    let result = data.data()!;
    return {name: result.name, link: result.link};
  }
  return {name: '', link: ''};
}
