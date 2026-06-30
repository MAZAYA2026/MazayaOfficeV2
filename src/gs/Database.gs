/*********************************************************************
 * Mazaya ERP V2
 * Database Engine
 *********************************************************************/

const Database = (() => {

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  function sheet(name) {
    const sh = ss.getSheetByName(name);

    if (!sh) {
      throw new Error("Sheet not found : " + name);
    }

    return sh;
  }

  function getAll(sheetName) {

    const sh = sheet(sheetName);

    const values = sh.getDataRange().getValues();

    if (values.length <= 1)
      return [];

    const headers = values.shift();

    return values.map(row => {

      let obj = {};

      headers.forEach((h, i) => {

        obj[h] = row[i];

      });

      return obj;

    });

  }

  function insert(sheetName, object) {

    const sh = sheet(sheetName);

    const headers = sh.getRange(1,1,1,sh.getLastColumn()).getValues()[0];

    const row = headers.map(h => object[h] ?? "");

    sh.appendRow(row);

  }

  function find(sheetName,key,value){

    const rows = getAll(sheetName);

    return rows.find(r => r[key] == value) || null;

  }

  function filter(sheetName,key,value){

    return getAll(sheetName)

      .filter(r => r[key] == value);

  }

  function update(sheetName,key,value,newObject){

    const sh = sheet(sheetName);

    const data = sh.getDataRange().getValues();

    const headers = data[0];

    const keyIndex = headers.indexOf(key);

    if(keyIndex==-1)
      throw new Error("Key not found");

    for(let r=1;r<data.length;r++){

      if(data[r][keyIndex]==value){

        headers.forEach((h,c)=>{

          if(newObject.hasOwnProperty(h))

            data[r][c]=newObject[h];

        });

        sh.getRange(r+1,1,1,headers.length)

          .setValues([data[r]]);

        return true;

      }

    }

    return false;

  }

  function nextInvoiceNumber(){

    const lock = LockService.getScriptLock();

    lock.waitLock(30000);

    try{

      const sh = sheet(SHEETS.INVOICES);

      const lastRow = sh.getLastRow();

      if(lastRow<=1)
        return 1001;

      const value = Number(

        sh.getRange(lastRow,1)

        .getValue()

      );

      return value+1;

    }

    finally{

      lock.releaseLock();

    }

  }

  return{

    sheet,

    getAll,

    insert,

    find,

    filter,

    update,

    nextInvoiceNumber

  };

})();
