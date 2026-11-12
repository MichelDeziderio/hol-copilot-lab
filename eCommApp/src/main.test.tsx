import { describe, expect, it } from 'vitest';

describe('main.tsx', () => {
  it('renders the app into the root element', async () => {
    document.body.innerHTML = '<div id="root"></div>';

    await import('./main.tsx');
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(document.body.textContent).toContain('The Daily Harvest');
  });
});
