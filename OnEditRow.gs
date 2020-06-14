function OnEditRow(event) {
  const { source, range } = event;
  const sheet = source.getActiveSheet();
  const sheetName = sheet.getName();
  const row = range.getRow();
  switch (sheetName) {
    case 'WPP_Messages':
      const newMessage = NewMessage(sheet, row);
      newMessage.createMessages();
      break;
    default:
      break;
  }
}