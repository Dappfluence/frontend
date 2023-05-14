import {doc, getDoc, getFirestore} from "firebase/firestore";
import {IInfluencer} from "../shared/types/account";
import {httpsCallable, getFunctions} from "firebase/functions";
import {faker} from "@faker-js/faker";

export const fetchInfluencer = async (address: string): Promise<IInfluencer> => {
  const data = await getDoc(doc(getFirestore(), "accounts", address));
  if (data.exists()) {
    let result = data.data()!;
    return {name: result.name, email: result.email, photoURL: faker.image.avatar()};
  }
  return {name: '', email: ''};

}
