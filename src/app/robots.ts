import { MetadataRoute } from 'next';

const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://wons.vercel.app/sitemap.xml',
  };
};

export default robots;
