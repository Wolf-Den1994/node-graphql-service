import { ApolloServer } from 'apollo-server';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';
import 'dotenv/config';

const PORT = process.env.PORT || 4000;

const types = loadFilesSync('./**/**/*.graphql');
const typeDefs = mergeTypeDefs(types);

const resolver = loadFilesSync('./**/**/*.resolver.ts');
const resolvers = mergeResolvers(resolver);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',
  context: ({ req }) => ({
    config: {
      headers: {
        Authorization: req.headers.authorization,
      },
    },
  }),
});

server.listen(PORT).then(({ url }) => {
  console.log(`Server has been started on the ${url}`);
});
