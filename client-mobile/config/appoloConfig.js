import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';

const client = new ApolloClient({
    uri: 'https://orchestragraphql-production.up.railway.app/',
    cache: new InMemoryCache(),
  });

  export default client