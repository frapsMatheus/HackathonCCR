function doPost(e) {
  Logger.log('ENTROU AQUI');
  const formID  = e.parameters.formID[0];
  switch(formID) {
    case '201647829861667':
      Triagem(e.parameters);
      break;
    default:
      NewUser(e.parameters);
      break;
  }
  
  const REDIRECT_URL = 'http://www.grupoccr.com.br/';
  
  return HtmlService.createHtmlOutput(
    "<script>window.top.location.href=\"" + REDIRECT_URL + "\";</script>"
  );
}
