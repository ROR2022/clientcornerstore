/* const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
}) */

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  register: true,
  disable: process.env.NODE_ENV === "development",
  cacheOnFrontEndNav: true,
  aggressiveFrontEndNavCaching: true,
  cacheStartUrl: true,
  dynamicStartUrl: true,
  buildExcludes: [/middleware-manifest.json$/],
  extendDefaultRuntimeCaching: true,
  workboxOptions: {
    skipWaiting: true,
  }
});



module.exports = withPWA({
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'chismogafo.s3.us-east-2.amazonaws.com',
        pathname: '**',
      },
    ],
},
});