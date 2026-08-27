/*
  GOOGLE APPS SCRIPT BACKEND
  1. Go to script.google.com
  2. Create a new project and paste this code.
  3. Change YOUR_EMAIL below.
  4. Deploy > New deployment > Web app
     Execute as: Me
     Who has access: Anyone
  5. Copy the /exec URL into config.js.
*/

const YOUR_EMAIL = "duyanh0981@gmail.com";

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    const subject = "💗 Ivanka chose a date!";
    const body =
      "Ivanka just made a choice on your date website!\\n\\n" +
      "Date type: " + data.type + "\\n" +
      "Date: " + data.date + "\\n" +
      "Time: " + data.time + "\\n" +
      "Submitted at: " + data.submittedAt + "\\n";

    MailApp.sendEmail(YOUR_EMAIL, subject, body);

    return ContentService
      .createTextOutput(JSON.stringify({ok: true}))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ok: false, error: String(err)}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
