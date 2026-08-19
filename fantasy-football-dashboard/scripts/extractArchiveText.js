const fs = require('fs');
const path = require('path');

const newsletters = [
  ['preseason', 'src/components/NewsletterArchive.tsx'],
  ['week1', 'src/components/Week1Newsletter.tsx'],
  ['week2', 'src/components/Week2Newsletter.tsx'],
  ['week3', 'src/components/Week3Newsletter.tsx'],
  ['week4', 'src/components/Week4Newsletter.tsx'],
  ['week5', 'src/components/Week5Newsletter.tsx'],
  ['week6', 'src/components/Week6Newsletter.tsx'],
  ['week7', 'src/components/Week7Newsletter.tsx'],
  ['week8', 'src/components/Week8Newsletter.tsx'],
  ['week9', 'src/components/Week9Newsletter.tsx'],
  ['week10', 'src/components/Week10Newsletter.tsx'],
  ['week11', 'src/components/Week11Newsletter.tsx'],
  ['week12', 'src/components/Week12Newsletter.tsx'],
  ['week13', 'src/components/Week13Newsletter.tsx'],
  ['finale', 'src/components/FinaleNewsletter.tsx'],
];

const archiveDir = path.join('public', 'archive', '2025');
fs.mkdirSync(archiveDir, { recursive: true });

const decodeEntities = (value) =>
  value
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&mdash;|&ndash;/g, '-')
    .replace(/&rsquo;|&apos;/g, "'")
    .replace(/&ldquo;|&rdquo;|&quot;/g, '"');

const isolateReturnedJsx = (source) => {
  const returnStart = source.lastIndexOf('return (');
  const returnEnd = source.lastIndexOf(');');

  if (returnStart === -1 || returnEnd === -1 || returnEnd <= returnStart) {
    return source;
  }

  return source.slice(returnStart + 'return ('.length, returnEnd);
};

const stripToText = (source) =>
  decodeEntities(
    isolateReturnedJsx(source)
      .replace(/<style>\{`[\s\S]*?`\}<\/style>/g, ' ')
      .replace(/\{\/\*[\s\S]*?\*\/\}/g, ' ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .replace(/\s+([.,!?;:])/g, '$1')
      .trim()
  );

for (const [slug, componentPath] of newsletters) {
  const source = fs.readFileSync(componentPath, 'utf8');
  const archiveText = stripToText(source);
  fs.writeFileSync(path.join(archiveDir, `${slug}.txt`), `${archiveText}\n`);
}

console.log(`Wrote ${newsletters.length} archive text files to ${archiveDir}`);
