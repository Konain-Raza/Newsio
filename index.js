const { ApolloServer, gql } = require('apollo-server');
const { fetchNews } = require('./controllers/fetchNews');

const typeDefs = gql`
  type Article {
    title: String
    link: String
    description: String
    publishedAt: String
    source: String
  }

  type Query {
    news: [Article]
  }
`;

const resolvers = {
  Query: {
    news: async () => {
      return await fetchNews();
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
