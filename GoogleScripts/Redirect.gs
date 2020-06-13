function addClickToRow(id, sheet, numberOfClicks) {
  Logger.log(Session.getTemporaryActiveUserKey());
  const clickColumn = sheet.getRange(id, 5);
  clickColumn.setValue(numberOfClicks + 1);
}

function getParamsFromSheets(id) {
  
  //TODO: Get from Sheets params
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("SENDERS_URLS");   
  var numColumns = sheet.getLastColumn();
  var dataRange = sheet.getRange(id, 1, 1, numColumns);
  var data = dataRange.getValues();
  var row = data[0];
  
  addClickToRow(id, sheet, row[4]);
  
  try {
    const url = row[1];
    const rankSender = row[2];
    const driverName = row[3];
    
    return `${url}?sender_id=${id}&driver_name=${driverName}`;      
    
  } catch(err) {
    Logger.log(err);
  }
  
}

function doGet(e) {
  
  //DONE: Read url
  const { parameter } = e;
  const { id } = parameter;
  const REDIRECT_URL = getParamsFromSheets(id);
  
  return HtmlService.createHtmlOutput(
    "<script>window.top.location.href=\"" + REDIRECT_URL + "\";</script>"
  );
  
}
