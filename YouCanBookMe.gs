function YouCanBookMe(ycbmTime) {
  return {
    formatTime() {
      const day = ycbmTime.split('/')[0]
      const month = ycbmTime.split('/')[1]
      const year = `20${ycbmTime.split('/')[2].split(' ')[0]}`;
      const hour = `T${ycbmTime.split(' ')[1]}:00`;
      return `${year}-${month}-${day}${hour}`; 
    },
    convertToSecondsTimestamp() {
      const formattedTime = this.formatTime();
      const dateTime = Date.parse(formattedTime);
      return dateTime;
    } 
  };
}
