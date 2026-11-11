const files = [
  'Customized Portfolio.png',
  'Future bite.png',
  'Nexus ops.png',
  'Tarot telling website.png',
];

export const flexCarouselItems = files.length
  ? files.map((f) => ({
      src: `/flex%20carousel/${encodeURIComponent(f)}`,
      alt: f,
      title: f.replace(/\.[^.]+$/, ''),
    }))
  : null;
