function ZoomAPI(topic, startTime) {
  var userId = 'niteceuma@gmail.com';
  var url = 'https://api.zoom.us/v2/users/' + userId + '/meetings';
  var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6InZaQ3ZERFotVHRxVDhHblI1STlhWEEiLCJleHAiOjE2MTY4MTQwMDAsImlhdCI6MTU4NTMxMTU2MX0.pxP388lpO-VM3hDyMMg6R0ag2zkdlebZZ3eZiY7PlQQ';
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