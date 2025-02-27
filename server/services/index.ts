import { createSchema } from 'graphql-yoga'

export const schema = createSchema({
  typeDefs: /* GraphQL */ `
      type Query {
        hello: String
        ping: String
      }
    `,
  resolvers: {
    Query: {
      hello: () => 'world',
      ping: () => 'pong',
    },
  },
})
