//  @type {import('next-sitemap').IConfig}
const siteUrl = 'https://memart.online';
module.exports = {
  siteUrl,
  generateRobotsTxt: true, // (optional)
  robotsTxtOptions: {
    additionalSitemaps: [`${siteUrl}/server-sitemap.xml`],
  },
};
