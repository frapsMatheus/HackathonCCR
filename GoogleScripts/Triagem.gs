function TriagemView(phone) {
  let t = HtmlService.createTemplateFromFile('triagem');
  const line = findRow('Triagem', phone, 1, 1)[0];
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Triagem");   
  const numColumns = sheet.getLastColumn();
  const row = sheet.getRange(line, 1, 1, numColumns).getValues()[0];
 
  const qrCODE = QRCodeAPI(row[22]);
  
  Logger.log(row);
  t.qrCodeURL = qrCODE;
  t.phone = row[0];
  t.humor = row[1];
  t.altura = row[2];
  t.pesoaproximado = row[3];
  t.fazatividade = row[4];
  t.estagravida = row[5];
  t.voceja = row[6];
  t.algumparente = row[7];
  t.vocefez = row[8];
  t.qualcirurgia = row[9];
  t.sofredecoluna = row[10];
  t.fazacompanhamento = row[11];
  t.outroproblema = row[12];
  t.qualoutroproblema = row[13];
  t.tomamedicamento	= row[14];
  t.quaismedicamentos = row[15];
  t.problemasdentarios = row[16];
  t.alimentacao = row[17];
  t.contatodeemergencia = row[18];
  t.nomedeemergencia = row[19];
  t.quantahorassono = row[20];
  
  return t.evaluate();
}

function Triagem(params) {
  Logger.log(params);
  //DONE: Adicionar conversão
  if (params['sender_id']) {
    const urlID = params['sender_id'][0];
    Logger.log(urlID);
    addConversion(urlID);
  }
  let phone = '';
  if (params['phone[]']) {
    phone = `55${params['phone[]'][0]}${params['phone[]'][1]}`;
  }
  const humor = JSON.parse(params.humor[0]).widget_metadata.value[0].name;	
  const altura = params.altura[0];	
  const pesoaproximado = params.pesoaproximado[0];	
  const fazatividade = params.fazatividade[0];
  const estagravida = params.estagravida[0];	
  let voceja = '';
  if (params['voceja[]']) {
    voceja = params['voceja[]'].toString();
  }
  let algumparente = '';
  if (params['algumparente[]']) {
    algumparente = params['algumparente[]'].toString();
  }
  const vocefez = params.vocefez[0];
  const qualcirurgia = params.qualcirurgia[0];
  const sofredecoluna = params.sofredecoluna[0];
  const fazacompanhamento = params.fazacompanhamento[0];
  const outroproblema = params.outroproblema[0];
  const qualoutroproblema = params.qualoutroproblema[0];
  const tomamedicamento	= params.tomamedicamento[0];
  const quaismedicamentos = params.quaismedicamentos[0];
  let problemasdentarios = '';
  if (params['problemasdentarios[]']) {
    problemasdentarios = params['problemasdentarios[]'].toString();
  }
  const alimentacao = params.alimentacao[0];
  let contatodeemergencia = '';
  if (params['contatodeemergencia[]']) {
    contatodeemergencia = `55${params['contatodeemergencia[]'][0]}${params['contatodeemergencia[]'][1]}`;
  }
  let nomedeemergencia = '';
  if (params['nomedeemergencia[]']) {
    nomedeemergencia = `${params['nomedeemergencia[]'][0]} ${params['nomedeemergencia[]'][1]}`;
  }
  const quantahorassono = params.quantahorassono[0];
  
  const qrCodeURL = `https://script.google.com/macros/s/AKfycbyP005C8wR_i1x08VLJ-AP_hMcdxupZ7IBaocJhFgnaDuW8OTs/exec?phone=${phone}&type=triagem`;
  const shortenedURL = URLShortener(qrCodeURL);
  
  
  const triagem = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Triagem');
  triagem.appendRow([phone, humor, altura, pesoaproximado, fazatividade, estagravida, voceja, algumparente,
                     vocefez, qualcirurgia, sofredecoluna, fazacompanhamento, outroproblema, qualoutroproblema, tomamedicamento,
                    quaismedicamentos, problemasdentarios, alimentacao, contatodeemergencia, nomedeemergencia, quantahorassono, Date.now(), shortenedURL]);
  
  //DONE: Mandar WPP com QRCOde
  const triagemMessage = `MENSGAGEM DE TRIAGEM \n\n Para verificar seus dados acesse: ${shortenedURL}`;
  NewCuponsMessage(triagemMessage, phone);
  
  return phone;
}
