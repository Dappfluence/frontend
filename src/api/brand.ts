import {doc, getDoc, getFirestore} from "firebase/firestore";
import {IBrand} from "../shared/types/account";
import {faker} from "@faker-js/faker";

export const fetchBrand = async (address: string | null): Promise<IBrand> => {
  if (!address) {
    return {title: '', link: '', image: faker.image.avatar()};
  }
  const data = await getDoc(doc(getFirestore(), "accounts", address));
  if (data.exists()) {
    let result = data.data()!;
    return {title: result.name, link: result.link, image: faker.image.avatar()};
  }
  return {title: '', link: '', image: faker.image.avatar()};
}
