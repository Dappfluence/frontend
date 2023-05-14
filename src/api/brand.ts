import {doc, getDoc, getFirestore} from "firebase/firestore";
import {IBrand} from "../shared/types/account";
import {faker} from "@faker-js/faker";

export const fetchBrand = async (address: string | null): Promise<IBrand | null> => {
  if (!address) {
    return null
  }
  const data = await getDoc(doc(getFirestore(), "accounts", address));
  if (data.exists()) {
    let result = data.data()!;
    return {title: faker.commerce.productName(), link: faker.internet.url(), image: faker.image.urlPicsumPhotos({width: 300, height: 100})};
  }
  return null
}
