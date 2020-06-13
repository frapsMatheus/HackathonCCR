var accountSid = 'SID';
var authToken = 'AUTHTOKEN';
var from = 'whatsapp:+14155238886';
var templateMessage = "Your code is \n\n{{2}}";

function Whatsapp(phone) {
  return {
    sendSms(content) {
      var messages_url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
    
      var payload = {
        "To": `whatsapp:+${phone}`,
          "Body" : templateMessage.replace('{{2}}', content),
        "From" : from
      };
      Logger.log('Phone', phone);

    
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