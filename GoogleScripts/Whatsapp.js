module.exports = function (debug) {

  var accountSid;
  var authToken;
  var from;

  accountSid = 'AC62a6063bd13836583e7078d0595c5bba'; // Your Account SID from www.twilio.com/console
  authToken = '5f22766bb752a6aa52a71a18850d87ca';
  from = 'whatsapp:+14155238886';

  const twilioClient = require('twilio')(accountSid, authToken, {
    lazyLoading: true
  });

  function Whatsapp(phone) {
    return {
      async sendMessage(content, file) {
        try {
          let message = {
            from,
            body: content,
            to: `whatsapp:${phone}`
          };
          if (file) {
            message.mediaUrl = [file];
          }
          console.log(message);
          const twilioResponse = await twilioClient.messages.create(message);
          console.log('SID:', twilioResponse.sid);
          return twilioResponse.sid;
        } catch (error) {
          console.log('ERROR', error);
          throw error;
        }
      },
      async sendLocationMessage(content, latitude, longitude) {
        try {
          let message = {
            from: 'whatsapp:+14155238886',
            body: content,
            to: `whatsapp:${phone}`
          };
          message.persistentAction = `geo:${latitude.toFixed(6)},${longitude.toFixed(6)}|${content}`;
          const twilioResponse = await twilioClient.messages.create(message);
          return twilioResponse.sid;
        } catch (error) {
          console.log(error);
          throw error;
        }
      },
    };
  }
  return Whatsapp;
}
