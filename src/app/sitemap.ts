import { MetadataRoute } from 'next';

const sitemap = (): MetadataRoute.Sitemap => {
  return [
    {
      url: 'https://wons.vercel.app/sign-in',
      lastModified: new Date(),
    },
    {
      url: 'https://wons.vercel.app/sign-up',
      lastModified: new Date(),
    },
    {
      url: 'https://wons.vercel.app/account-success',
      lastModified: new Date(),
    },
    {
      url: 'https://wons.vercel.app/',
      lastModified: new Date(),
    },
    {
      url: 'https://wons.vercel.app/invoices',
      lastModified: new Date(),
    },
    {
      url: 'https://wons.vercel.app/customers',
      lastModified: new Date(),
    },
    {
      url: 'https://wons.vercel.app/calendar',
      lastModified: new Date(),
    },
    {
      url: 'https://wons.vercel.app/tasks',
      lastModified: new Date(),
    },
  ];
};

export default sitemap;
