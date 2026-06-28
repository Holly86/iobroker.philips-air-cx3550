'use strict';

const { spawnSync } = require('node:child_process');
const path = require('node:path');

const files = ['main.js', 'lib/coap.js', 'lib/http.js', 'lib/httpClient.js', 'lib/mapping.js'];

for (const file of files) {
    const result = spawnSync(process.execPath, ['--check', path.join(__dirname, '..', file)], {
        encoding: 'utf8',
    });

    if (result.status !== 0) {
        process.stderr.write(result.stderr || result.stdout);
        process.exit(result.status || 1);
    }
}

console.log(`Syntax check passed for ${files.length} files.`);
