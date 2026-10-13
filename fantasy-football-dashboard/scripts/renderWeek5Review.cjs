// Render the exact React newsletter into an offline, self-contained review copy.
const fs = require('fs');
const path = require('path');
const babel = require('@babel/core');
for (const ext of ['.ts', '.tsx']) require.extensions[ext] = (module, filename) => {
  const result = babel.transformSync(fs.readFileSync(filename, 'utf8'), {
    filename, babelrc: false, configFile: false,
    presets: [require.resolve('@babel/preset-typescript'), require.resolve('@babel/preset-react')],
    plugins: [require.resolve('@babel/plugin-transform-modules-commonjs')],
  });
  module._compile(result.code, filename);
};
require.extensions['.css'] = () => {};
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const Component = require('../src/components/Week5RecapNewsletter.tsx').default;
const css = ['Week1RecapNewsletter.css', 'Week3RecapNewsletter.css'].map(file => fs.readFileSync(path.join(__dirname, '../src/components', file), 'utf8')).join('\n');
const body = renderToStaticMarkup(React.createElement(Component)).replace(/href="\/(?!\/)/g, 'href="https://amberwoodfantasy.com/');
const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="color-scheme" content="light"><title>The Amberwood Times · Week 5 Recap & Week 6 Preview</title><style>body{margin:0}*{box-sizing:border-box}${css}</style></head><body>${body}</body></html>`;
const output = process.argv[2] || '/workspace/scratch/26db648c0e1f/amberwood-week5-review.html';
fs.writeFileSync(output, html);
console.log(output);
