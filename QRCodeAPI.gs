function QRCodeAPI(url) {
  return `http://api.qrserver.com/v1/create-qr-code/?data=${url}&type=triagem&size=100x100`;
}
