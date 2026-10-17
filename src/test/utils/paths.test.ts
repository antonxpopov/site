import { describe, it, expect } from 'vitest';
import { withBase } from '../../utils/paths';

describe('withBase', () => {
  it('prefixes root-relative paths with the base', () => {
    expect(withBase('/audio/demo1.mp3', '/site')).toBe('/site/audio/demo1.mp3');
    expect(withBase('/audio/demo1.mp3', '/site/')).toBe('/site/audio/demo1.mp3');
  });

  it('handles paths without a leading slash', () => {
    expect(withBase('images/a.jpg', '/site/')).toBe('/site/images/a.jpg');
  });

  it('builds the root and hash links', () => {
    expect(withBase('/', '/site')).toBe('/site/');
    expect(withBase('/#about', '/site')).toBe('/site/#about');
  });

  it('is a no-op for a root base', () => {
    expect(withBase('/project/1', '/')).toBe('/project/1');
  });

  it('leaves absolute and special URLs untouched', () => {
    expect(withBase('https://vimeo.com/1', '/site')).toBe('https://vimeo.com/1');
    expect(withBase('//cdn.example.com/x.png', '/site')).toBe('//cdn.example.com/x.png');
    expect(withBase('mailto:a@b.c', '/site')).toBe('mailto:a@b.c');
    expect(withBase('data:image/svg+xml,abc', '/site')).toBe('data:image/svg+xml,abc');
  });
});
