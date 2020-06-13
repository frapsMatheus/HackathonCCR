function addPointsToRank(rank_sender) {
  //TODO: Add points to megarank for user
  //TODO: add only if unick click
  Logger.log(Session.getTemporaryActiveUserKey());
}

function addClickToRow(id, sheet, lastColumn, numberOfClicks) {
	//TODO: Add clicks to analytics
  //TODO: add only if unick click
  Logger.log(Session.getTemporaryActiveUserKey());
  sheet.getRange(id, lastColumn).setValue(numberOfClicks + 1);
  
}

function getParamsFromSheets(id) {
  
  //TODO: Get from Sheets params
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("SENDERS_URLS");   
  var numColumns = sheet.getLastColumn();
  var dataRange = sheet.getRange(id, 1, 1, numColumns);
  var data = dataRange.getValues();
  var row = data[0];
  
  addClickToRow(id, sheet, numColumns, row[4]);
  
  try {
    const url = row[1];
    const rankSender = row[2];
    const name = row[3];
    
    return `${url}?id=${id}%name=${name}`;      
    
  } catch(err) {
    Logger.log(err);
  }
  
}

function doGet(e) {
  
  //DONE: Read url
  const { parameter } = e;
  const { id } = parameter;
  
  return HtmlService.createHtmlOutput(getParamsFromSheets(id));
}
