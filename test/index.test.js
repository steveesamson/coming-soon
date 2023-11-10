import React from 'react';
import { describe, it, expect } from 'vitest';
import { renderToString } from 'react-dom/server';
import Index from '../pages/en/index.page.mdx';
import { load } from 'cheerio';

describe('index test', function () {
  it('tests for h1 of coming soon', function () {
    const sHtml = renderToString(React.createElement(Index));
    const $ = load(sHtml);
    expect($('h1').html()).toBe('Coming Soon');
  });
});
