export const environment = {
  production: true,
  fbProject: process.env['FIREBASE_PROJECT_ID'] || '',
  fbKey: process.env['FIREBASE_KEY'] || '',
  databaseUrl: process.env['FIREBASE_REAL_TIME_MARKET'] || ''
};
