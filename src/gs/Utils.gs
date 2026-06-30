/**********************************************************************
 * Common Utilities
 **********************************************************************/

function getSheet(name){

  return SpreadsheetApp
      .getActiveSpreadsheet()
      .getSheetByName(name);

}


function getDB(){

  return getSheet(CONFIG.SHEETS.INVOICES);

}


function getUsersSheet(){

  return getSheet(CONFIG.SHEETS.USERS);

}


function getServicesSheet(){

  return getSheet(CONFIG.SHEETS.SERVICES);

}


function now(){

  return new Date();

}


function showMessage(title,msg){

  SpreadsheetApp
  .getUi()
  .alert(title,msg,SpreadsheetApp.getUi().ButtonSet.OK);

}
