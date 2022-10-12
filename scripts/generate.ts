/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const fs = require('fs');

const run = () => {
  const migrationPath: string = path.join(process.cwd(), 'src/migrations');
  const tpl = fs.readFileSync(path.join(migrationPath, '.tpl.ts'), 'utf-8');
  const timestamp = new Date().getTime();
  const migrationName = timestamp;
  const migrationFileContent = tpl
    .replace('{{name}}', migrationName)
    .replace('{{timestamp}}', timestamp);

  const filename = `${timestamp}_migration` + '.ts';
  const filepath = path.join(migrationPath, filename);
  fs.writeFileSync(filepath, migrationFileContent);
};

run();
