import { serve } from 'bun';
import index from './index.html';

const server = serve({
  routes: {
    '/service-worker.js': {
      async GET(_req) {
        try {
          const result = await Bun.build({
            entrypoints: ['./src/service-worker.ts'],
            target: 'browser',
          });

          if (!result.success) {
            return new Response('Failed to build service worker', { status: 500 });
          }

          const js = result.outputs[0]!.stream();

          return new Response(js, {
            headers: {
              'content-type': 'application/javascript; charset=utf-8',
              // Avoid the browser caching an old SW during dev.
              'cache-control': 'no-store',
              // Allow root scope even if you later move the SW under a subpath.
              'service-worker-allowed': '/',
            },
          });
        } catch (err) {
          return new Response(String(err), { status: 500 });
        }
      },
    },

    // Serve index.html for all unmatched routes.
    '/*': index,

    '/api/hello': {
      async GET(_req) {
        return Response.json({
          message: 'Hello, world!',
          method: 'GET',
        });
      },
      async PUT(_req) {
        return Response.json({
          message: 'Hello, world!',
          method: 'PUT',
        });
      },
    },

    '/api/hello/:name': async (req) => {
      const name = req.params.name;
      return Response.json({
        message: `Hello, ${name}!`,
      });
    },
  },

  development: process.env.NODE_ENV !== 'production' && {
    // Enable browser hot reloading in development
    hmr: true,

    // Echo console logs from the browser to the server
    console: true,
  },
});

console.log(`🚀 Server running at ${server.url}`);
