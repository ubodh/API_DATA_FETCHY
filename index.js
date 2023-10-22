const express = require("express");
const { google } = require("googleapis");

const app = express();

app.get('/', async (req, res) => {
  try {
    // Load the service account credentials JSON file
    const auth = new google.auth.GoogleAuth({
      keyFile: "subodhDB.json", // Specify the correct path to your service account credentials file
      scopes: "https://www.googleapis.com/auth/spreadsheets",
    });

    // Create a client instance for authentication
    const client = await auth.getClient();

    // Create an instance of the Google Sheets API
    const googleSheets = google.sheets({ version: 'v4', auth: client });

    // Define the spreadsheetId for the Google Sheet you want to access
    const spreadsheetId = "1-BGDBH07qpgEbH-tF5E3t1Ft2UhToFuQWTF2CFs_aWQ"; // Replace with your actual spreadsheet ID

    // Get data from the spreadsheet
    const getData = await googleSheets.spreadsheets.values.get({
      spreadsheetId,
      range: "sheet1!A:C", // Specify the sheet name and desired range
    });

    // Data to append to the spreadsheet
    const valuesToAppend = [
      ['ravi kumar sharma', 'ravi@gmail.com', "22323232"],
      ['sovita kumar sharma', 'sovit@gmail.com', "1111111111"],
      ['mantu kumar ', 'mantu@gmail.com', "10000111111"],
    ];
     const bigData=await googleSheets.spreadsheets.values.get({
      spreadsheetId,
      range: "sheet1!A:C",

     })

    // Append data to the spreadsheet
    res.send(bigData.data);
    const appendData = await googleSheets.spreadsheets.values.append({
      spreadsheetId,
      range: "sheet1!A:C",
      valueInputOption: "USER_ENTERED", // Use "USER_ENTERED" for formatting as a user would enter data
      resource: {
        values: valuesToAppend,
      },
    });

    res.send(appendData.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching or writing data to Google Sheets');
  }
});

app.listen(3200, () => {
  console.log('Server is running on port 3200');
});
