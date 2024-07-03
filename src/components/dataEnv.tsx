


const nodeEnv = process.env.NODE_ENV;
export const hostURL = nodeEnv==='development'?process.env.NEXT_PUBLIC_DEV_ENV: process.env.NEXT_PUBLIC_PRD_ENV;

export const VAPID_PUBLIC_KEY=process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
export const LOCAL_STORAGE_KEY = process.env.NEXT_PUBLIC_LOCAL_STORAGE_KEY;
export const LOCAL_STORAGE_KEY_SHOPPING_CART = process.env.NEXT_PUBLIC_LOCAL_STORAGE_KEY_SHOPPING_CART;
export const STRIPE_PUBLIC_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;
export const STRIPE_PUBLIC_KEY_DEV = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY_DEV;

export const mainAppTitle = 'CornerShop RorApp';
export const mainAppShortDescription = 'Basic store app for small business';
export const mainAppLongDescription = 'This is a basic store app for small business. It is a full stack app with a Next.js frontend and an Nest.js backend. It uses MongoDB as the database and is hosted on Vercel and Railway.';
export const mainAppFeaturesDescription = `This PWA aims to support small businesses to have 
a web presence, create and edit their business profile, publish and edit their products and services, 
share them on social networks, as well as being able to receive comments and ratings from their customers,
be able to respond to them, create promotions and discounts for their customers, 
as well as being able to keep an inventory and basic control of their products and services`;

export const mainAppFeatures = 'The app has the following features: 1. Sign in, sign up and sign out. 2. Publish products. 3. View products. 4. Edit products. 5. Delete products. 6. View product details. 7. View user profile. 8. Edit user profile. 9. Delete user profile. ';
export const mainAppKeywords = 'store, small business, full stack, Next.js, Nest.js, MongoDB, AWS S3 Bucket, Vercel, Railway';
export const mainAppAuthor = 'RorApps';
export const mainAppPurpose = 'This app is for educational purposes only. It is a demo app to show how to build a full stack app with Next.js and Nest.js.';



