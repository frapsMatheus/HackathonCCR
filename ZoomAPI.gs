function ZoomAPI(topic, startTime) {
  var userId = 'niteceuma@gmail.com';
  var url = 'https://api.zoom.us/v2/users/' + userId + '/meetings';
  var token = 'ZOOM_TOKEN';
  var type = '2';
  var payload = '{"topic": "' + topic
  + '","type": "' + type
  + '","start_time": "' + startTime
  + '","duration": "' + 30
  + '","timezone": "' + 'America/Sao_Paulo' 
  +'"}';
  var options =
      {
        'method'  : 'POST',
        'followRedirects' : true,
        'muteHttpExceptions': true,
        "headers": {
          "Accept": "application/json, application/xml",
          "Content-Type": "application/json",
          "Authorization": "Bearer " + token
        },
        'payload': payload
      };
  var response = UrlFetchApp.fetch(url, options);
  var json = response.getContentText();
  var data = JSON.parse(json);

  return data.join_url;
}