function NewMessage(sheet, row) {
  const data = sheet.getSheetValues(row, 1, 1, 2)[0];
  const message = data[0];
  const url = data[1];
  
  function addRow(user) {
    // DONE: Create ID
    const senders_url = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Senders_URLS');
    const id = senders_url.getLastRow() + 1;
    senders_url.appendRow([id, url, user.phone, user.name, 0, 0]);
    return id;
  }
  
  // DONE: Send Message
  function sendMessage(user, id) {
    const url = `https://script.google.com/macros/s/AKfycbyP005C8wR_i1x08VLJ-AP_hMcdxupZ7IBaocJhFgnaDuW8OTs/exec?id=${id}`;
    const wpp = Whatsapp(user.phone);
    const content = `${message}\n${URLShortener(url)}`;
    Logger.log(user, id, content);
    response_data = wpp.sendSms(content);
  }
  
  function fetchUsers() {
    const caminhoneiros = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Caminhoneiros');
    const lastRowIndex = caminhoneiros.getLastRow();
    Logger.log(lastRowIndex);
    const data = caminhoneiros.getSheetValues(2, 1, caminhoneiros.getLastRow() - 1, 2);
    const users = data.map((dataRow) => {
       return {phone: dataRow[0], name: dataRow[1]}
    });
    Logger.log(users);
    return users;
  }
  
  return {
    createMessages() {
      const users = fetchUsers();
      users.forEach((user) => {
        Logger.log(user);
        const id = addRow(user);
        sendMessage(user, id);
      });
    },
    addRow,
    sendMessage,
  };
}

function simpleMessage(phone, content) {
  const wpp = Whatsapp(phone);
  response_data = wpp.sendSms(content);
}