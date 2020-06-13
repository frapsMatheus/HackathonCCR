function addConversion(id) {
  const caminhoneiros = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Senders_URLS');
  const cell = caminhoneiros.getRange(id, 6);
  cell.setValue(cell.getValue() + 1);
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
  return {
    latitude,
    longitude
  }; 
}

function addCaminhoneiro(parameters) {
  Logger.log(parameters);
  const name = parameters['nome[]'];
  const firstName = name[0];
  const lastName = name[1];
  const whatsapp = parameters['whatsapp[]'];
  const phone = `55${whatsapp[0]}${whatsapp[1]}`;
  const age = parameters['idade'][0];
  const gender = parameters['typea'][0];
  const locationData = parameters['latlong_by_gps'][0];
  const { latitude, longitude } = getLatLng(locationData);
  
  addConversion(parameters['sender_id'][0]);
  
  const caminhoneiros = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Caminhoneiros');
  const id = caminhoneiros.getLastRow() + 1;
  const url_rank = `=SUMIF(Senders_URLS!C:C,A${id},Senders_URLS!E:E) + 10 * SUMIF(Senders_URLS!C:C,A${id},Senders_URLS!F:F)`;
  const mega_rank = `=SUM(I${id}:K${id})`;
  
  
  caminhoneiros.appendRow([phone, firstName, lastName, age, gender, locationData, latitude, longitude]);
  const row = caminhoneiros.getRange(id, 9, 1, 4);
  row.setFormulas([[url_rank, '=1', '=1', mega_rank]]);
}

function registerUser(parameters) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('WPP_Messages');
  const newMessage = NewMessage(sheet, 4);
  const user = createUser(parameters);
  
  const userId = newMessage.addRow(user);
  newMessage.sendMessage(user, userId);
}

function createUser(parameters) {
  const name = parameters['nome[]'];
  const firstName = name[0];
  const lastName = name[1];
  const whatsapp = parameters['whatsapp[]'];
  const phone = `55${whatsapp[0]}${whatsapp[1]}`;
  return {
    name: `${firstName} ${lastName}`,
    phone: phone,
  };
}

function doPost(e) {
  registerUser(e.parameters);
  addCaminhoneiro(e.parameters);
  const REDIRECT_URL = 'http://www.grupoccr.com.br/';
  
  return HtmlService.createHtmlOutput(
    "<script>window.top.location.href=\"" + REDIRECT_URL + "\";</script>"
  );
}
