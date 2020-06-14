function URLShortener(url) {
  var shortenerURL = `https://rel.ink/api/links/`;
    
  var payload = {
    "url": url,
  };

  var options = {
    "method" : "post",
    "payload" : payload
  };
  const response = JSON.parse(UrlFetchApp.fetch(shortenerURL, options));
  return `https://rel.ink/${response.hashid}`;
}
