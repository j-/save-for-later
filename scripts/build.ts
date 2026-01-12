// build.ts
// Build the SPA (HTML entry) and a root-scoped service worker using Bun.build().
// Run via: `bun run build`

// 1) SPA build (HTML entry)
try {
  const result = await Bun.build({
    publicPath: '/',
    entrypoints: ['./src/index.html'],
    outdir: './dist',
    target: 'browser',
    sourcemap: 'linked',
    minify: true,

    // Inline env vars that start with BUN_PUBLIC_
    env: 'BUN_PUBLIC_*',

    // Replace global identifiers at build time (values must be JSON strings)
    define: {
      'process.env.NODE_ENV': JSON.stringify('production'),
    },
  });

  if (!result.success) {
    console.error(result.logs);
    process.exit(1);
  }
} catch (err) {
  console.error(err);
  process.exit(1);
}

// 2) Service worker build (separate entrypoint)
// Important: `naming: '[name].[ext]'` ensures the output lands at `dist/service-worker.js` (root),
// not `dist/src/service-worker.js`, which matters for scope + your Nginx rule.
try {
  const result = await Bun.build({
    publicPath: '/',
    entrypoints: ['./src/service-worker.ts'],
    outdir: './dist',
    target: 'browser',
    sourcemap: 'linked',
    minify: true,

    env: 'BUN_PUBLIC_*',

    define: {
      'process.env.NODE_ENV': JSON.stringify('production'),
    },

    naming: '[name].[ext]',
  });

  if (!result.success) {
    console.error(result.logs);
    process.exit(1);
  }
} catch (err) {
  console.error(err);
  process.exit(1);
}

try {
  const glob = new Bun.Glob('assets/**/*');

  for await (const srcPath of glob.scan({ onlyFiles: true })) {
    await Bun.write(`dist/${srcPath}`, Bun.file(srcPath));
  }
} catch (err) {
  console.error(err);
  process.exit(1);
}
