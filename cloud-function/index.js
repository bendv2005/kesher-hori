const { google } = require('googleapis');

exports.getBlogPosts = async (req, res) => {
  // Set CORS headers for preflight requests
  res.set('Access-Control-Allow-Origin', 'https://kesher-hori.com');
  res.set('Access-Control-Allow-Methods', 'GET');
  res.set('Access-Control-Allow-Headers', 'Content-Type');
  res.set('Access-Control-Max-Age', '3600');

  if (req.method === 'OPTIONS') {
    // Send response to preflight OPTIONS requests
    res.status(204).send('');
    return;
  }

  try {
        // Authenticate using the service account key from the environment variable
    const auth = new google.auth.GoogleAuth({
      credentials: JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON),
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });
    const sheets = google.sheets({ version: 'v4', auth });
    const SHEET_ID = '1iOrIKNymNYSZPX0zVGTQNvxeQgWe3QhVMtSRj8yH1nY';
    const RANGE = 'A2:D';

    const sheets = google.sheets({ version: 'v4', auth: API_KEY });

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: RANGE,
    });

    const rows = response.data.values;
    if (rows && rows.length > 0) {
      const posts = rows.map(row => ({
        id: row[0],
        title: row[1],
        content: row[2],
        createdAt: row[3],
      }));
      res.status(200).json(posts);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).send('Error fetching blog posts.');
  }
};
