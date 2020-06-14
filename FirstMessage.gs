function sendAll() {
  const wpp = Whatsapp('556199552827');
  response_data = wpp.sendSms('Olá Pedro, você já conhece o programa da CCR que sorteia *R$ 10.000,00* por mês? https://form.jotform.com/201644727386057 \nSó não demora que você pode perder o sorteio que já vai acontecer esse final de semana!');   
}

function myFunction() {
 sendAll(); 
}