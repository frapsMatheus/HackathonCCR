function doPost(e) {
  Logger.log('ENTROU AQUI');
  const formID  = e.parameters.formID[0];
  switch(formID) {
    case '201647829861667':
      //DONE: Redirect para página para agendar um vídeo de telemedecina
      const phone = Triagem(e.parameters);
      const triagem_redirect = `https://hackathon-ccr.youcanbook.me/?PHONE=${phone}`;
      return HtmlService.createHtmlOutput(
        "<script>window.top.location.href=\"" + triagem_redirect + "\";</script>"
      );
    default:
      NewUser(e.parameters);
      const newUserRedirect = 'http://www.grupoccr.com.br/';
      return HtmlService.createHtmlOutput(
        "<script>window.top.location.href=\"" + newUserRedirect + "\";</script>"
      );
  }
  
  
}
