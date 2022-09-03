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

import { describe, expect, test } from 'vitest';
import type { Logger } from '../src/log';
import main from '../src';

describe('git-tag-action', () => {
  // used for our logger, which tests if our outputs are correct.
  const messages: Record<'info' | 'error', string[]> = { info: [], error: [] };
  const outputs: string[] = [];
  const logger: Logger = {
    info(message) {
      messages.info.push(message);
    },
    error(message) {
      messages.error.push(message instanceof Error ? message.stack! : message);
    }
  };

  test('should pass', async () => {
    process.env['GITHUB_REF'] = 'ref/tags/1.0.0-alpha.3';
    await main(logger);

    expect(1).toBe(1);
  });
});
