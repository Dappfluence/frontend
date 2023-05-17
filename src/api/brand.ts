import {IBrand} from "../shared/types/account";
import {faker} from "@faker-js/faker";
import {getBrandWebsite, getDisplayName} from "./account";

export const fetchBrand = async (address: string | undefined): Promise<IBrand | null> => {
  return {
    address: address || "0x00000",
    title: await getDisplayName(address),
    link: await getBrandWebsite(address),
    image: faker.image.urlPicsumPhotos({width: 300, height: 100})
  };
}
