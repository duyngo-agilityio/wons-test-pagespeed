import { MetadataRoute } from 'next';

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: '*',
    disallow: '',
  },
  sitemap: 'https://wons.vercel.app/sitemap.xml',
});

export default robots;
