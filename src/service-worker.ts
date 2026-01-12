/// <reference lib="webworker" />

import { addItem } from './shared/db';

const sw = self as unknown as ServiceWorkerGlobalScope;

sw.addEventListener('install', (event) => {
  event.waitUntil(sw.skipWaiting());
});

sw.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    await sw.clients.claim();

    const clients = await sw.clients.matchAll({
      type: 'window',
      includeUncontrolled: true,
    });

    for (const client of clients) {
      client.postMessage({
        type: 'SW_ACTIVATED',
      });
    }
  })());
});

sw.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);

  if (req.method !== 'POST') return;
  if (url.origin !== self.location.origin) return;
  if (url.pathname !== '/share' && url.pathname !== '/share/') return;

  event.respondWith((async () => {
    try {
      const form = await req.clone().formData();

      const title = String(form.get('title') ?? '');
      const text = String(form.get('text') ?? '');
      const url = String(form.get('url') ?? '');
      const files = form.getAll('files') as File[];

      const { id } = await addItem({
        title,
        text,
        url,
        files,
      }, new Date());

      const res = Response.redirect(`/item/${encodeURIComponent(id)}`, 303);
      return res;
    } catch (err) {
      console.error('[SW] Failed to save item to database', err);
      const res = Response.redirect('/?shareError=1', 303);
      return res;
    }
  })());
});

sw.addEventListener('message', (event) => {
  if (event.data?.type === 'PING') {
    event.source?.postMessage({
      type: 'PONG',
    });
  }
});
