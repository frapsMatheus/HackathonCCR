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


function formatTime(ycbmTime) {
  const day = ycbmTime.split('/')[0]
  const month = ycbmTime.split('/')[1]
  const year = `20${ycbmTime.split('/')[2].split(' ')[0]}`;
  const hour = `T${ycbmTime.split(' ')[1]}:00`;
  return `${year}-${month}-${day}${hour}`; 
} 

function doGet(e) {
  let REDIRECT_URL = 'http://www.grupoccr.com.br/';
  const { parameter } = e;
  Logger.log(e);
  if(parameter.type) {
      switch(parameter.type) {
        case 'ycbm':
          const { phone, start, end } = parameter;
          const zoomLink = ZoomAPI(`Agendamento covid - ${phone}`, formatTime(start)); 
          const message = `A sua consulta foi marcada! Horário: ${start} - ${end}\nAcesse na data agendada o link ${zoomLink} para sua cosulta.`;
          NewCuponsMessage(message, phone);
          return HtmlService.createHtmlOutput(
            "<script>window.top.location.href=\"" + REDIRECT_URL + "\";</script>"
          );
        case 'triagem':
          return TriagemView(parameter.phone);
        default:
          const { id } = parameter;
          REDIRECT_URL = getParamsFromSheets(id);
          return HtmlService.createHtmlOutput(
            "<script>window.top.location.href=\"" + REDIRECT_URL + "\";</script>"
          );
      }
  } else {
    const { id } = parameter;
    REDIRECT_URL = getParamsFromSheets(id);
    return HtmlService.createHtmlOutput(
      "<script>window.top.location.href=\"" + REDIRECT_URL + "\";</script>"
    );
  }
}
