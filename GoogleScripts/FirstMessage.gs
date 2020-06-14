function sendAll() {
  const wpp = Whatsapp('558171075887');
  response_data = wpp.sendSms('Olá Efrem, você já conhece o programa de pontos da CCR que sorteia R$ 1.000,00 por semana? Não!? Então dá uma olhada aqui https://form.jotform.com/201644727386057 \nSó não demora que você pode perder o sorteio que já vai acontecer esse final de semana!');   
}

function myFunction() {
 sendAll(); 
}