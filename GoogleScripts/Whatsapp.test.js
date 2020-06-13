const Whatsapp = require('./Whatsapp.js')('debug');

describe('Test Whatsapp', () => {
  test('Send text message', async (done) => {
    try {
      const wpp = new Whatsapp('+556199552827');
      const response = await wpp.sendMessage('Teste de mensagem');
      expect(response).toBeDefined();
      done();
    } catch (error) {
      done(error);
    }
  }, 10000)
  test.only('Send File Message', async (done) => {
    const wpp = new Whatsapp('+556199552827');
    const file = 'https://firebasestorage.googleapis.com/v0/b/whatsappcolmeiaapp.appspot.com/o/chats%2F%2B556199552827%2F_DSC1114.jpg?alt=media&token=0897ab2e-93d3-4aa2-ad4b-f07cd4cc01cd'
    const response = await wpp.sendMessage('Teste de mensagem', file);
    expect(response).toBeDefined();
    done();
  })
});
