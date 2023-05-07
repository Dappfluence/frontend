import {gql, GraphQLClient} from "graphql-request";
import {useQuery} from "@tanstack/react-query";
import {Game} from "../types";
import {graphQLClient} from "./index";


const games = gql`
    query gameEntryQuery {
        gameCollection {
            items {
                dataFeed
                name
                icon {
                    url
                }
            }
        }
    }
`


export const useGamesQuery = () => useQuery<any, any, Game[]>(['games'], async () => {
	const result = await graphQLClient.request<{ gameCollection: { items: Game[] } }>(games);
	return result.gameCollection.items
})