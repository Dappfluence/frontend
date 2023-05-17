import {IBrand} from "../shared/types/account";
import {faker} from "@faker-js/faker";
import {getBrandWebsite, getDisplayName} from "./account";
import {ICollaboration} from "../ui/collaborations/components/CollaborationCard.types";
import Web3 from "web3";
import CollaborationABI from "../assets/abi/Collaboration.json";

export const fetchBrand = async (address: string | undefined): Promise<IBrand | null> => {
  return {
    address: address || "0x00000",
    title: await getDisplayName(address),
    link: await getBrandWebsite(address),
    image: faker.image.urlPicsumPhotos({width: 300, height: 100})
  };
}


export const fetchCollaborationStatus = async (collaboration: ICollaboration, web3: Web3): Promise<ICollaboration> => {
  const contract = new web3.eth.Contract(CollaborationABI, collaboration.id);
  const accepted = await contract.methods.proposalAccepted().call();
  const inProgress = await contract.methods.workInProgress().call();
  const powProvided = await contract.methods.powProvided().call();
  const finished = await contract.methods.finished().call();

  return {...collaboration, accepted, inProgress, powProvided, finished};
}
