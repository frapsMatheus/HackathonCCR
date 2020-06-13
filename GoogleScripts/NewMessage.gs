function NewMessage(sheet, row) {
  //const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('WPP_Messages');
  const data = sheet.getSheetValues(row, 1, 1, 2)[0];
  const message = data[0];
  const url = data[1];
  
  function addRow(user) {
    // DONE: Create ID
    const senders_url = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Senders_URLS');
    const id = senders_url.getLastRow() + 1;
    senders_url.appendRow([id, url, user.phone, user.name, 0]);
    return id;
  }
  
  // TODO: Send Message
  function sendMessage(user, id) {
    const url = 'https://script.google.com/macros/s/AKfycbzAUsJXk11lOZrrCJopZIjU9unUMvKv4p_nAAl_lBQ/dev?id=';
    const wpp = Whatsapp(user.phone);
    const content = `${message}\n${url}${id}`;
    Logger.log(user, id, content);
    response_data = wpp.sendSms(content);
  }
  
  function fetchUsers() {
    const rank_table = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Rank_Table');
    const lastRowIndex = rank_table.getLastRow();
    Logger.log(lastRowIndex);
    const data = rank_table.getSheetValues(2, 1, rank_table.getLastRow() - 1, 2);
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
  };
}

function newMessageNew() {
  const n = NewMessage();
  n.createMessages();
}