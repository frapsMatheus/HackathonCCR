function sendAll() {
  var sheet = SpreadsheetApp.getActiveSheet();
  var startRow = 2; 
  var numRows = sheet.getLastRow() - 1; 
  var dataRange = sheet.getRange(startRow, 1, numRows, 2) 
  var data = dataRange.getValues();

  for (i in data) {
    var row = data[i];
    Logger.log(row);
    try {
      const wpp = Whatsapp(row[0]);
      Logger.log(row[0]);
      response_data = wpp.sendSms("Qualquer coisa que quisermos mandar!");
      status = "sent";
    } catch(err) {
      Logger.log(err);
      status = "error";
    }
    sheet.getRange(startRow + Number(i), 3).setValue(status);
  }
}

function myFunction() {
 sendAll(); 
}

function onEdit(event) {
  const { source, range } = event;
  const sheet = source.getActiveSheet();
  const sheetName = sheet.getName();
  const row = range.getRow();
  switch (sheetName) {
    case 'WPP_Messages':
      const newMessage = NewMessage(sheet, row);
      newMessage.createMessages();
      break;
    default:
      break;
  }
}