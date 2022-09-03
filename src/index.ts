/*
 * 🏏 git-tag-action: Noelware's utilities package to not repeat code in our TypeScript projects.
 * Copyright (c) 2022 Noel <cutie@floofy.dev>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { setFailed, setOutput, info } from '@actions/core';
import { SemVer } from 'semver';

async function main() {
  info('collecting metadata...');

  const ref = process.env.GITHUB_REF;
  if (!ref) throw new Error('`GITHUB_REF` was not specified in environment variables.');
  if (!ref.startsWith('ref/tags/')) throw new Error(`Reference tag [${ref}] was not a tagged reference.`);

  const version = ref.replace(/^ref\/tags\//, '');
  setOutput('version', version);

  const semver = new SemVer(version);
  setOutput(
    'json',
    JSON.stringify({
      major: semver.major,
      minor: semver.minor,
      patch: semver.patch,
      prerelease: semver.prerelease.length === 0
    })
  );

  setOutput('prerelease', semver.prerelease.length === 0);
  for (const method of ['major', 'minor', 'patch']) {
    setOutput(method, semver[method]);
  }
}

main()
  .then(() => process.exit(0))
  .catch((ex) => setFailed(ex));
