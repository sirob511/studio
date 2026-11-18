// Vercel exposes this value during the build. Preview and local builds stay unindexed.
export const isProductionDeployment = process.env.VERCEL_ENV === 'production';
