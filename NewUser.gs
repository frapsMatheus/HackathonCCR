function addConversion(id, sendCuponsMessage) {
  const caminhoneiros = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Senders_URLS');
  const cell = caminhoneiros.getRange(id, 6);
  cell.setValue(cell.getValue() + 1);
  if (sendCuponsMessage) {
    const phone = caminhoneiros.getRange(id, 3).getValue();
    NewCuponsMessage('Uma nova pessoa se cadastrou no ZAP NA ESTRADA usando o seu link. Isso rendeu 2 novos cupons de participação para você!', phone);
  }
}

function getLatLng(location) {
  const values = location.split('\n');
  let latitude = '';
  let longitude = '';
  values.forEach((line) => {
    if (line.includes("Latitude")) {
      latitude = line.split(': ')[1];
      console.log(latitude);
    }
    if (line.includes("Longitude")) {
      longitude = line.split(': ')[1];
      console.log(longitude);
    }
  });
  return `${latitude},${longitude}`; 
}

function addCaminhoneiro(parameters) {
  Logger.log(parameters);
  const name = parameters['nome[]'];
  const firstName = name[0];
  const lastName = name[1];
  const whatsapp = parameters['whatsapp[]'];
  const phone = phoneFormat(whatsapp);
  const age = parameters['idade'][0];
  const gender = parameters['typea'][0];
  const locationData = parameters['latlong_by_gps'][0];
  const coordinate = getLatLng(locationData);
  
  if (parameters['sender_id']) {
    addConversion(parameters['sender_id'][0], true);
  }
  
  const caminhoneiros = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Caminhoneiros');
  const id = caminhoneiros.getLastRow() + 1;
  const url_rank = `=10 + 2 * SUMIF(Senders_URLS!C:C,A${id},Senders_URLS!F:F)`;
  const triagem_rank = `=15 * COUNTIF(Triagem!A:A, A${id})`;
  const mega_rank = `=SUM(I${id}:K${id})`;
  
  caminhoneiros.appendRow([phone, Date.now(), firstName, lastName, age, gender, locationData, coordinate]);
  const row = caminhoneiros.getRange(id, 9, 1, 4);
  row.setFormulas([[url_rank, triagem_rank, '=0', mega_rank]]);
}

function registerUser(parameters) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('WPP_Messages');
  const newMessage = NewMessage(sheet, 2);
  const user = createUser(parameters);
  simpleMessage(user.phone, 'Agora você possui *10 cupons* para o próximo sorteio! Quer mais cupons e maximizar suas chances de ganhar? É só *encaminhar a mensagem abaixo* para seus amigos caminhoeiros, você ganha 2 cupons para cada amigo que se cadastrar.');
  const userId = newMessage.addRow(user);
  newMessage.sendMessage(user, userId);
}

function phoneFormat(phoneFields) {
  let phone = `55${phoneFields[0]}`;
  if (phoneFields[1].length > 8) {
    phone += phoneFields[1].substr(1);
  } else {
    phone += phoneFields[1];
  }
  return phone;
}

function createUser(parameters) {
  const name = parameters['nome[]'];
  const firstName = name[0];
  const lastName = name[1];
  const whatsapp = parameters['whatsapp[]'];
  const phone = phoneFormat(whatsapp);
  return {
    name: `${firstName} ${lastName}`,
    phone: phone,
  };
}

function NewUser(params) {
  registerUser(params);
  addCaminhoneiro(params);
}