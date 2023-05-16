export const environment = {
  production: false,
  fbProject: process.env['FIREBASE_PROJECT_ID'] || '',
  fbKey: process.env['FIREBASE_KEY'] || '',
  databaseUrl: process.env['FIREBASE_REAL_TIME_MARKET'] || ''
};
