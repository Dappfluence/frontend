import {GraphQLClient} from "graphql-request";

console.log(import.meta.env)
export const graphQLClient = new GraphQLClient(`https://graphql.contentful.com/content/v1/spaces/${import.meta.env.VITE_CONTENTFUL_SPACE}/environments/${import.meta.env.VITE_CONTENTFUL_ENV}`, {
	headers: {
		Authorization: `Bearer ${import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN}`
	}
});


