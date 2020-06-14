function Whatsapp(phone) {
  var accountSid = 'ACCOUNTSID';
  var authToken = 'AUTHTOKEN';
  var from = 'whatsapp:+14155238886';
  var templateMessage = "{{2}}";
  
  const formattedPhone = `whatsapp:+${phone}`;
  const withExtra9Phone = [formattedPhone.slice(0, 14), '9', formattedPhone.slice(14)].join('');
  
  function createOptions(content, phoneString) {
    var payload = {
      "To": phoneString,
        "Body" : templateMessage.replace('{{2}}', content),
      "From" : from
    };
  
    var options = {
      "method" : "post",
      "payload" : payload
    };
  
    options.headers = { 
      "Authorization" : "Basic " + Utilities.base64Encode(`${accountSid}:${authToken}`),
    };
    Logger.log(options);
    return options;
  }
  
  return {
    sendSms(content) {
      var messages_url = `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`;
      UrlFetchApp.fetch(messages_url, createOptions(content, formattedPhone));
      UrlFetchApp.fetch(messages_url, createOptions(content, withExtra9Phone));
    },
  };
}

