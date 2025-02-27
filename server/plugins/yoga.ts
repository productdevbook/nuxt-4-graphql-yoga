/**
 * GraphQL Yoga Server Integration for Nuxt
 *
 * This plugin integrates GraphQL Yoga with Nuxt's Nitro server, providing
 * a full-featured GraphQL API with Apollo Sandbox interface.
 */
import { createYoga } from 'graphql-yoga'
import type { H3Event } from 'h3'
import { defineEventHandler, sendWebResponse, toWebRequest } from 'h3'
import { schema } from '../services'

// API endpoint configuration
const routePath = '/api/graphql'
const healthCheckPath = '/api/graphql/health'

/**
 * Creates the GraphQL Yoga server instance with Apollo Sandbox UI
 */
const createYogaServer = createYoga<{
  event?: H3Event<object>
}>({
  graphqlEndpoint: routePath,
  healthCheckEndpoint: healthCheckPath,
  graphiql: true,
  schema: schema,
  // Custom Apollo Sandbox UI implementation
  renderGraphiQL: () => {
    return `
    <!DOCTYPE html>
    <html lang="en">
      <body style="margin: 0; overflow-x: hidden; overflow-y: hidden">
      <div id="sandbox" style="height:100vh; width:100vw;"></div>
      <script src="https://embeddable-sandbox.cdn.apollographql.com/02e2da0fccbe0240ef03d2396d6c98559bab5b06/embeddable-sandbox.umd.production.min.js"></script>
      <script>
      new window.EmbeddedSandbox({
        target: "#sandbox",
        // Pass through your server href if you are embedding on an endpoint.
        // Otherwise, you can pass whatever endpoint you want Sandbox to start up with here.
        initialEndpoint: window.location.href,
        hideCookieToggle: false,
        initialState: {
          includeCookies: true
        }
      });
      // advanced options: https://www.apollographql.com/docs/studio/explorer/sandbox#embedding-sandbox
      </script>
      </body>
    </html>`
  },
  landingPage: false,
})

/**
 * H3 event handler for GraphQL requests
 * Processes incoming GraphQL queries and returns responses
 */
const graphQlHandler = defineEventHandler(async (event) => {
  const data = await createYogaServer.handle({ request: toWebRequest(event) }, { event })
  return sendWebResponse(event, data)
})

/**
 * Type definition for GraphQL ping response
 * Ensures type safety when working with the health check endpoint
 */
interface PingQueryResponse {
  data: {
    ping: string | object
  }
}

/**
 * Health check handler to verify GraphQL service functionality
 * Makes a simple ping query to test if the GraphQL service is running correctly
 */
const healthCheckHandler = defineEventHandler(async () => {
  const data = await $fetch<PingQueryResponse>(routePath, {
    body: '{"query":"query Query {\\n  ping\\n}","variables":{},"operationName":"Query"}',
    method: 'POST',
  })
  return data?.data.ping || {}
})

/**
 * Nitro plugin that registers the GraphQL and health check endpoints
 */
export default defineNitroPlugin((nitroApp) => {
  // Register the main GraphQL endpoint
  nitroApp.router.use(routePath, graphQlHandler)

  // Register the health check endpoint
  nitroApp.router.use(healthCheckPath, healthCheckHandler)
})
