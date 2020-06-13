const MessagingResponse = require('twilio').twiml.MessagingResponse;
const Storage = require('../controller/Storage.js');
const FirebaseSingleton = require('../FirebaseSingleton.js');

const admin = new FirebaseSingleton().getInstance();

function TwillioMessage(message) {
  // console.log('Message content', JSON.stringify(message.body));
  const {From, Body, MessageSid, NumMedia, Latitude, Longitude, Address, Label} = message.body;
  const phoneNumber = From.split('whatsapp:')[1];

  const twiml = new MessagingResponse();

  async function createFile() {
    const { MediaContentType0, MediaUrl0 } = message.body;
    const storage = new Storage(phoneNumber, admin);
    return storage.saveFromURL(MessageSid, MediaUrl0, MediaContentType0);
  }

  return {
    toString() {
      return twiml.toString();
    },
    async getMessageFields() {
      if (NumMedia > 0) {
        const fileName = await createFile();
        return {
          chatId: phoneNumber, 
          twilioId: MessageSid, 
          content: fileName, 
          type: 'DOCUMENT', 
          sender: phoneNumber,
          senderType: 'USER',
          file: fileName,
        };
      } else if (Latitude) {
        let content = '';
        if (Label) {
          content += Label + ' - ';
        }
        if (Address) {
          content += Address;
        }
        return {
          chatId: phoneNumber, 
          twilioId: MessageSid, 
          content: content, 
          type: 'LOCATION', 
          sender: phoneNumber,
          senderType: 'USER',
          latitude: Number(Latitude),
          longitude: Number(Longitude),
        };
      }
      return {
        chatId: phoneNumber, 
        twilioId: MessageSid, 
        content: Body, 
        type: 'TEXT', 
        sender: phoneNumber,
        senderType: 'USER'
      };
    },
  };
}