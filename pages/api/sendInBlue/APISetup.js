const SibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization: api-key
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.SIB_API_KEY

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

const APISetup = (sendSmtpEmail) => {
  apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
    return true;
  }, function(error) {
    console.error(error);
    return false;
  });
}

module.exports = APISetup