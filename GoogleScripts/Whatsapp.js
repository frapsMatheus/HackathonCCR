module.exports = function (debug) {

  var accountSid;
  var authToken;
  var from;

  accountSid = 'AC62a6063bd13836583e7078d0595c5bba'; // Your Account SID from www.twilio.com/console
  authToken = '5f22766bb752a6aa52a71a18850d87ca';
  from = 'whatsapp:+14155238886';

  function Whatsapp(phone) {
    return {
      async sendSms(content) {
        var messages_url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
      
        var payload = {
          "To": `whatsapp:${phone}`,
          "Body" : content,
          "From" : from
        };
      
        var options = {
          "method" : "post",
          "payload" : payload
        };
      
        options.headers = { 
          "Authorization" : "Basic " + Utilities.base64Encode(`${accountSid}:${authToken}`),
        };
      
        UrlFetchApp.fetch(messages_url, options);
      },
    };
  }
  return Whatsapp;
}
