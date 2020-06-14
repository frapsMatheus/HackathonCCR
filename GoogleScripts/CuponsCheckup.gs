function findRow(sheetName, idToSearch, columnFromId, columnToReturn){
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  var lastRow = sheet.getLastRow();
  var lastColumn = sheet.getLastColumn(); 
  var range = sheet.getRange(1,1,lastRow,lastColumn); 
  for(var i = 2; i <= lastRow; i++){
    if(range.getCell(i, columnFromId).getValue() == idToSearch){ 
      return [i,range.getCell(i, columnToReturn).getValue()];
    }
  }
}

function NewCuponsMessage(message, phone) {
  const rank = findRow('Caminhoneiros', phone, 1, 12)[1];
  const wpp = Whatsapp(phone);
  response_data = wpp.sendSms(`${message}\n\n Você possui ${rank} cupons para o próximo sorteio!`);
}
