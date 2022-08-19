
const {initializeApp, getApps, getApp, applicationDefault, cert} = require('firebase-admin/app')
const {getAuth} = require('firebase-admin/auth');

console.log("cert = " + cert)
let adminApp = ''
export let adminAuth = ''
if (getApps().length) {
  adminApp = getApp()
  adminAuth = getAuth(adminApp)
} else {
  const app = initializeApp({
    credential: cert({
      "type": "service_account",
      "project_id": "find-me-a-doctor-dev",
      "private_key_id": "79d0983bcca265f426a0e3e8873333e3101e35bf",
      "private_key": '"-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCnzhtB13gM8qck\nwMUOdD75ZdaLtzG6SF/YXVSep7Hnk5S/krXkqXCwNbt01mP9w9oQG2KjgSBXQjdY\nenUpSOZIEELgK5hlVgeSM5PITcP849m/H0r4y7akf2uz1xrE2hmIdN4/vMkZZam+\n629fd9tq8ltQcYj5H2wokJhvKS/mBhTGhVtB1gF39C+sgIjCXAO+258VnTlDbt6Z\ntdn9oFkQ7CZUMYB4kZqQ8DNSagoCjZpYVhVr1zP74YIVBMbPkLKB0kSbc1wFIltY\newtmPlMhXUUSuzwCPwS3MOh6iuJdtRJg2d+HB4F1DUz4CpGM5kcH5/cWpRpX2r/P\nPvG+IxafAgMBAAECggEASBZYy04/OoC7oSRXA0CZFRbUtiy65iXVVuOxSH8OBEf4\nLNxf252W1Xwfza+UQR3z/dtl4ovEUvgVQqNI1bWFiAvETv0reM0eb4ZMxE30Fh3k\nGyDcWklZaw16PUX5L/vp4B8kowj88zYjV+tYaxDYZ/c5lzNO/oarNjn34jk1ZIEi\nH9+OjGU2dr0UXT5APuqX2JGGpNlevXWuKIvz2Hj9na5igo/P2ltfOYPDOUyqqUr/\nBgFs42HE2bLDRQaQd5JM9MSa1aJI113k+h9smuQY/Dk7UKNmRWWgIsxS+Iyf3u9z\n9jzCU5fUObeYYghmn5gNQ8teDK/0sNF0ul5WbdeH4QKBgQDVbYnquuJku2WQH2DN\nxOgKe0BfhHgmeyLcAWMqxZDArOz1i2BVUXOPujXlWp9yPFQi6eI71v3fi5c13A8t\nLNtC2ApRenB014w32pLVZ3BeioBTK5DT2no6em+pgAv6Kv8czbKiG5Hqd/oT8lTn\ncIfi2QqAPRm/a32tSn1M2tyrpwKBgQDJRuPr74op7kNFF7rN8nYTiCduSFjsrQO5\nuQ5kw00ZNkKDI4rlMN827leMrkSClp4RILkJ0hxOPf37VZ8dFJ3vexDlai4uQD0B\n5xbnuKNBrPBDKGjP18n6JxwV7OoplGRstky3K3ZkQS6gryN7X6ZO1Z9FRmwLiSQe\nborAno08SQKBgBx2c0Iekjqk0zKZPKu0as2bCkayv+NB4LA+bx8xIdDQPvmwELTQ\nG/069B0WLNVrPj05u7YHQewiDZRdOJjptoP/k8Cx93VdmZGJULOtC8tP5TUyRio6\npLpPwbx1GyPNwB/zPrNnwdnnDi7Czpfe5gBWuZPIkjp491W47WTmey9ZAoGBAIfo\n22xsMjJAFaJo9JWuG/byYBXCunEOHs7g24xEqCHXFrBwZpB+IKt54xo2bkJzq8ZK\n/0dXXg+jIoX8+dTsH/0eb3lJ6mcGr2tCfJ/5eBuXyCDA/40g29yTXg6cDD4JWoph\nyomAyo/Fx9Nuj5n2K1lePA7OD5T2hLIb2ItaRGopAoGABnewuU1O2BBsTbda3GPF\npmf2DQtxtW1ii3RbhE1Fzs0yeyDbqLc1VUAYpfOc0KgREGyo0Ky+PeTO/5oekT0K\nC7SkJFd+x+zNhZ2YdYXguc+klv79E3ye5bzbZBCeYdpeOUOqcBM1jb218/knQlf1\nF5bvnPhQK2ZV3TzV1KlT3WI=\n-----END PRIVATE KEY-----\n"',
      "client_email": "firebase-adminsdk-vvbm7@find-me-a-doctor-dev.iam.gserviceaccount.com",
      "client_id": "118220822726314931932",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-vvbm7%40find-me-a-doctor-dev.iam.gserviceaccount.com"
    })
  });

  adminAuth = getAuth(app)
}
export default adminApp
