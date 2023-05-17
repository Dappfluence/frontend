import {IInfluencer} from "../shared/types/account";
import {faker} from "@faker-js/faker";
import {getDisplayName} from "./account";

export const fetchInfluencer = async (address: string): Promise<IInfluencer> => {
  return {
    displayName: await getDisplayName(address),
    name: faker.internet.displayName(),
    email: faker.internet.userName(),
    photoURL: faker.image.avatar(),
    address
  };


}
