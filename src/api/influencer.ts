import {IInfluencer} from "../shared/types/account";
import {faker} from "@faker-js/faker";

export const fetchInfluencer = async (address: string): Promise<IInfluencer> => {
  return {
    name: faker.internet.displayName(),
    email: faker.internet.userName(),
    photoURL: faker.image.avatar(),
    address
  };


}
