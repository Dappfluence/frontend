import {IBrand} from "../shared/types/account";
import {faker} from "@faker-js/faker";

export const fetchBrand = async (address: string | undefined): Promise<IBrand | null> => {
  return {
    address: address || "0x00000",
    title: faker.commerce.productName(),
    link: faker.internet.url(),
    image: faker.image.urlPicsumPhotos({width: 300, height: 100})
  };
}
