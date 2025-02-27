import { createYoga } from 'graphql-yoga'
import type { H3Event } from 'h3'
import { defineEventHandler, sendWebResponse, toWebRequest } from 'h3'
import { schema } from '../services'

const routePath = '/api/graphql'
const healthCheckPath = '/api/graphql/health'

const createYogaServer = createYoga<{
  event?: H3Event<{}>
}>({
  graphqlEndpoint: routePath,
  healthCheckEndpoint: healthCheckPath,
  graphiql: true,
  schema: schema,
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

// GraphQL h3 handler
const graphQlHandler = defineEventHandler(async (event) => {
  const data = await createYogaServer.handle({ request: toWebRequest(event) }, { event })
  return sendWebResponse(event, data)
})

const healthCheckHandler = defineEventHandler(async () => {
  const data = await $fetch(routePath, {
    body: '{"query":"query Query {\\n  ping\\n}","variables":{},"operationName":"Query"}',
    method: 'POST',
  }) as any
  return data?.data.ping || {}
})

export default defineNitroPlugin((nitroApp) => {
  // GraphQL endpoint'ini kaydet
  nitroApp.router.use(routePath, graphQlHandler)
  nitroApp.router.use(healthCheckPath, healthCheckHandler)
})
