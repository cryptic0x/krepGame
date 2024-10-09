/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://krepgames.com',  // Update the domain
  generateIndexSitemap: false,
  generateRobotsTxt: true,
  exclude: [
    '/leaderboard',  // Exclude other routes if you don't want them
    '/memeInvaders',
    '/share',
    '/taoshiEscape',
    '/taoshiJump',
  ],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/flappyKrep' },  // Only allow access to Flappy Krep
      { userAgent: '*', disallow: '/' }          // Disallow everything else
    ],
  },
};
