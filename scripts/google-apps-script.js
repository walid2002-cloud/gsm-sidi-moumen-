var SHEET_ID = "1MzAueHjmF0DvY0scJdb-GSmOkybPjsHlqdUWIqnVTSc";
var STAFF_WHATSAPP = "+212786713408";

function doGet() {
  return ContentService.createTextOutput("GSM webhook OK");
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    var payload = JSON.parse(e.postData.contents);
    var ss = SpreadsheetApp.openById(payload.spreadsheetId || SHEET_ID);
    var sheet = ss.getSheets()[0];
    var values = payload.values || [];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(
        payload.columns || [
          "Date",
          "Nom",
          "Prénom",
          "Parent",
          "Téléphone",
          "WhatsApp",
          "Niveau",
          "Matière",
          "Message",
          "Source",
          "Statut",
        ]
      );
    }
    sheet.appendRow(values);
    notifyStaff(payload);
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(
      ContentService.MimeType.JSON
    );
  } finally {
    lock.releaseLock();
  }
}

function notifyStaff(payload) {
  var text = payload.whatsappMessage;
  if (!text && payload.lead) {
    var lead = payload.lead;
    text =
      "Nouvelle inscription — GSM Sidi Moumen\n\nÉlève : " +
      (lead.prenom || "") +
      " " +
      (lead.nom || "") +
      "\nParent : " +
      (lead.parent || "") +
      "\nNiveau : " +
      (lead.niveau || "") +
      "\nMatières : " +
      (lead.matiere || "") +
      "\nTéléphone : " +
      (lead.telephone || "") +
      "\nWhatsApp : " +
      (lead.whatsapp || "") +
      "\nMessage : " +
      (lead.message || "—") +
      "\nDate : " +
      (lead.date || "");
  }
  if (!text) return;

  try {
    MailApp.sendEmail({
      to: Session.getEffectiveUser().getEmail(),
      subject: "GSM — nouvelle inscription",
      body: text,
    });
  } catch (err) {}

  var key = PropertiesService.getScriptProperties().getProperty("CALLMEBOT_APIKEY");
  if (!key) return;
  var url =
    "https://api.callmebot.com/whatsapp.php?phone=" +
    encodeURIComponent(STAFF_WHATSAPP) +
    "&text=" +
    encodeURIComponent(text) +
    "&apikey=" +
    encodeURIComponent(key);
  UrlFetchApp.fetch(url, { muteHttpExceptions: true, followRedirects: true });
}
