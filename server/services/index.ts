/**
 * GraphQL Schema Configuration
 * 
 * This file defines the GraphQL schema and resolvers for the application.
 * It uses GraphQL Yoga's createSchema function to establish the GraphQL API.
 */
import { createSchema } from 'graphql-yoga'

/**
 * Main GraphQL schema definition
 * 
 * - typeDefs: Defines the GraphQL schema types and operations
 * - resolvers: Implements the logic for each field in the schema
 */
export const schema = createSchema({
  typeDefs: /* GraphQL */ `
      type Query {
        """
        A simple hello world query that returns a greeting
        """
        hello: String

        """
        Health check query to verify the GraphQL service is running
        """
        ping: String
      }
    `,
  resolvers: {
    Query: {
      /**
       * Hello world resolver
       * @returns {string} A greeting message
       */
      hello: () => 'world',
      
      /**
       * Ping resolver for health checks
       * @returns {string} "pong" confirmation response
       */
      ping: () => 'pong',
    },
  },
})
