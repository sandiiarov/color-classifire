import ApolloClient from 'apollo-boost';

const client = new ApolloClient({
  uri: 'https://us1.prisma.sh/color-classifire/db/dev',
});

export default client;
