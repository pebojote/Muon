const scripts = [];

if (process.env.NODE_ENV === 'development') {
  // Dynamically insert the DLL script in development env in the
  // renderer process
  scripts.push('../.erb/dll/renderer.dev.dll.js');

  // Dynamically insert the bundled app script in the renderer process
  const port = process.env.PORT || 1212;
  scripts.push(`http://localhost:${port}/dist/renderer.dev.js`);
} else {
  scripts.push('./dist/renderer.prod.js');
}

if (scripts.length) {
  document.write(
    scripts
      .map((script) => `<script defer src="${script}"><\/script>`)
      .join('')
  );
}
