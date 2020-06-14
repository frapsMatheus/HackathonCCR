function getCaminhoneirosWithouTriagem() {
  const caminhoneiros = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Caminhoneiros');
  const rows = caminhoneiros.getRange(2, 1, caminhoneiros.getLastRow() - 1, caminhoneiros.getLastColumn()).getValues();
  let rowsWithoutTriagem = [];
  for (let i = 0; i < rows.length; i += 1) {
    const row = rows[i];
    if (row[12] == '') {
      rowsWithoutTriagem.push(row);
      //DONE Update collumn with SENT
      const collumn = caminhoneiros.getRange(i + 2, 13);
      collumn.setValue('SENT');
    }
  }
  return rowsWithoutTriagem;
}

function TriagemJob() {
  //DONE GET caminhoneiros que não receberam form de triagem ainda
  const rows = getCaminhoneirosWithouTriagem();
  rows.forEach((row) => {
    //DONE Send with whatsapp form
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('WPP_Messages');
    const newMessage = NewMessage(sheet, 3);
    const user = {
      name: row[2],
      phone: row[0],
    };
    const userId = newMessage.addRow(user);
    newMessage.sendMessage(user, userId);
  });
}
