const {initializeApp, getApps, getApp, applicationDefault} = require('firebase-admin/app')
const { getAuth } = require('firebase-admin/auth');

let adminApp = ''
export let adminAuth = ''
if (getApps().length){
  adminApp = getApp()
  adminAuth = getAuth(adminApp)
}
else{
  const app = initializeApp({
    credential: applicationDefault()
  });
  adminAuth = getApps(app)
}
export default adminApp
