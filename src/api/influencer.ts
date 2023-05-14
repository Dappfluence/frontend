import {doc, getDoc, getFirestore} from "firebase/firestore";
import {IInfluencer} from "../shared/types/account";
import {faker} from "@faker-js/faker";

export const fetchInfluencer = async (address: string): Promise<IInfluencer> => {
  const data = await getDoc(doc(getFirestore(), "accounts", address));
  if (data.exists()) {
    let result = data.data()!;
    return {name: faker.internet.displayName(), email: faker.internet.userName(), photoURL: faker.image.avatar(), address};
  }

}
