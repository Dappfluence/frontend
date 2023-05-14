import {doc, getDoc, getFirestore} from "firebase/firestore";
import {IBrand} from "../ui/company/components/BrandCard.types";

export const fetchBrand = async (address: string): Promise<IBrand> => {
  const data = await getDoc(doc(getFirestore(), "accounts", address));
  if (data.exists()) {
    let result = data.data()!;
    return {name: result.name, link: result.link};
  }
}
